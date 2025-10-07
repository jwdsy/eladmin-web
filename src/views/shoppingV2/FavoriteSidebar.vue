<template>
  <!-- 喜欢商品列表侧边栏 -->
  <div>
    <!-- 遮罩层 -->
    <div v-if="visible" class="favorite-overlay" @click="handleClose" />

    <!-- 侧边栏 -->
    <div :class="['favorite-sidebar', { 'favorite-sidebar-open': visible }]">
      <!-- 头部 -->
      <div class="favorite-header">
        <h3>Favorite Products</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>

      <!-- 内容区域 -->
      <div class="favorite-body">
        <!-- 加载状态 -->
        <div v-if="loading" class="favorite-loading">
          <div class="loading-spinner" />
          <p>加载中...</p>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!products || products.length === 0" class="favorite-empty">
          <div class="empty-icon">♡</div>
          <p>No favorite products yet</p>
        </div>

        <!-- 商品列表 -->
        <div v-else class="favorite-list">
          <div
            v-for="product in products"
            :key="product.id"
            class="favorite-item"
          >
            <img :src="product.image" :alt="product.title" class="product-image">
            <div class="product-info">
              <h4 class="product-title">{{ product.title }}</h4>
              <p class="product-no">NO.{{ product.itemNo }}</p>
              <div v-if="product.itemLength || product.itemWidth || product.itemHeight" class="product-dimensions">
                <span v-if="product.itemLength">L: {{ product.itemLength }}</span>
                <span v-if="product.itemWidth">W: {{ product.itemWidth }}</span>
                <span v-if="product.itemHeight">H: {{ product.itemHeight }}</span>
              </div>
              <!-- 备注输入框 -->
              <div class="product-remark">
                <div class="remark-input-container" :class="{ 'editing': product.isRemarkEditing }">
                  <input
                    :value="getRemarkValue(product)"
                    type="text"
                    placeholder="Enter remark..."
                    class="remark-input"
                    maxlength="100"
                    @input="handleRemarkInput(product, $event)"
                    @blur="handleRemarkBlur(product)"
                    @focus="handleRemarkFocus(product)"
                  >
                  <span class="character-counter">{{ getCharacterCount(product) }}/100</span>
                </div>
              </div>
            </div>
            <button class="delete-btn" title="Delete" @click="handleDeleteItem(product)">×</button>
          </div>

          <!-- 加载更多提示 -->
          <div v-if="loading" class="load-more-loading">
            <div class="loading-spinner-small" />
            <span>Loading more...</span>
          </div>
          <div v-else-if="!hasMore && products.length > 0" class="load-more-end">
            <span>All products loaded</span>
          </div>
        </div>
      </div>

      <!-- 底部操作区 -->
      <div v-if="!loading && products && products.length > 0" class="favorite-footer">
        <button class="submit-btn" @click="handleSubmit">SUBMIT</button>
        <button class="clean-btn" @click="handleClear">CLEAN</button>
      </div>
    </div>
  </div>
</template>

<script>
import { customerPickItem } from '@/api/shoppingV2'

export default {
  name: 'FavoriteSidebar',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        // 阻止页面滚动
        document.body.style.overflow = 'hidden'
        // 添加滚动监听
        this.$nextTick(() => {
          this.addScrollListener()
        })
      } else {
        // 恢复页面滚动
        document.body.style.overflow = 'auto'
        // 移除滚动监听
        this.removeScrollListener()
      }
    }
  },
  beforeDestroy() {
    // 组件销毁时恢复页面滚动
    document.body.style.overflow = 'auto'
    // 移除滚动监听
    this.removeScrollListener()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      console.log('FavoriteSidebar handleSubmit 方法被调用')
      this.$emit('submit')

      // 直接调用父组件方法
      if (this.$parent && this.$parent.submitFavoriteList) {
        console.log('尝试直接调用父组件的 submitFavoriteList 方法')
        this.$parent.submitFavoriteList()
      }
    },
    handleClear() {
      console.log('FavoriteSidebar handleClear 方法被调用')
      console.log('父组件实例:', this.$parent)
      console.log('父组件的 clearFavoriteList 方法:', this.$parent.clearFavoriteList)
      this.$emit('clear')
      console.log('已发送 clear 事件到父组件')

      // 直接调用父组件方法进行测试
      if (this.$parent && this.$parent.clearFavoriteList) {
        console.log('尝试直接调用父组件的 clearFavoriteList 方法')
        this.$parent.clearFavoriteList()
      }
    },
    // 添加滚动监听
    addScrollListener() {
      const favoriteBody = this.$el.querySelector('.favorite-body')
      if (favoriteBody) {
        favoriteBody.addEventListener('scroll', this.handleScroll)
      }
    },
    // 移除滚动监听
    removeScrollListener() {
      const favoriteBody = this.$el.querySelector('.favorite-body')
      if (favoriteBody) {
        favoriteBody.removeEventListener('scroll', this.handleScroll)
      }
    },
    // 处理滚动事件
    handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target
      // 当滚动到距离底部50px时触发加载更多
      if (scrollHeight - scrollTop - clientHeight < 50 && this.hasMore && !this.loading) {
        this.$emit('load-more')
      }
    },
    // 处理单个商品删除
    async handleDeleteItem(product) {
      try {
        // 使用父组件的确认对话框方法
        if (this.$parent && this.$parent.showCustomConfirm) {
          const confirmed = await this.$parent.showCustomConfirm('Are you sure you want to delete this product?', 'Delete Confirmation')
          if (!confirmed) {
            return
          }
        } else {
          // 如果父组件没有确认对话框方法，使用浏览器原生确认
          if (!confirm('Are you sure you want to delete this product?')) {
            return
          }
        }

        // 调用API删除商品（设置pickFlag为0）
        await customerPickItem({
          itemId: product.id,
          pickFlag: 0
        })

        // 通知父组件刷新列表
        this.$emit('item-deleted', product.id)

        // 显示成功消息
        this.$message.success('Product removed from favorites list')
      } catch (error) {
        console.error('删除商品失败:', error)
        this.$message.error('Delete failed, please try again')
      }
    },

    // 获取备注显示值
    getRemarkValue(product) {
      // 如果有临时备注则显示临时备注，否则显示已保存的备注
      return product.tempRemark !== undefined ? product.tempRemark : (product.pickRemark || '')
    },

    // 获取字符计数
    getCharacterCount(product) {
      const value = this.getRemarkValue(product)
      return value ? value.length : 0
    },

    // 处理备注输入
    handleRemarkInput(product, event) {
      this.$set(product, 'tempRemark', event.target.value)
    },

    // 处理备注输入框获得焦点
    handleRemarkFocus(product) {
      // 初始化临时备注字段，如果没有则使用现有的备注
      if (product.tempRemark === undefined) {
        this.$set(product, 'tempRemark', product.pickRemark || '')
      }
      // 设置编辑状态
      this.$set(product, 'isRemarkEditing', true)
    },

    // 处理备注输入框失去焦点
    async handleRemarkBlur(product) {
      // 结束编辑状态
      this.$set(product, 'isRemarkEditing', false)
      try {
        // 如果临时备注与原备注相同，则不需要保存
        if (product.tempRemark === product.pickRemark) {
          return
        }

        console.log(`保存商品 ${product.itemNo} 的备注:`, product.tempRemark)

        // 调用API保存备注
        await customerPickItem({
          itemId: product.id,
          pickFlag: 1, // 保持喜欢状态
          itemRemark: product.tempRemark || ''
        })

        // 更新商品的备注信息
        this.$set(product, 'pickRemark', product.tempRemark)

        // 通知父组件备注已更新，用于同步主商品列表
        console.log('发出remark-updated事件:', {
          itemId: product.id,
          pickRemark: product.tempRemark
        })
        this.$emit('remark-updated', {
          itemId: product.id,
          pickRemark: product.tempRemark
        })

        // 显示成功消息
        if (product.tempRemark && product.tempRemark.trim()) {
          this.$message.success('Remark saved')
        }
      } catch (error) {
        console.error('保存备注失败:', error)
        this.$message.error('Failed to save remark, please try again')
        // 恢复原来的备注
        this.$set(product, 'tempRemark', product.pickRemark || '')
      }
    }
  }
}
</script>

<style scoped>
.favorite-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
}

.favorite-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 2000;
  display: flex;
  flex-direction: column;
}

.favorite-sidebar-open {
  right: 0;
}

.favorite-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.favorite-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.favorite-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.favorite-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.favorite-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 15px;
  color: #ddd;
}

.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.favorite-item {
  display: flex;
  gap: 12px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.3s ease;
  position: relative;
}

.favorite-item:hover {
  background: #f0f0f0;
  border-color: #ddd;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #999;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.delete-btn:hover {
  color: #ff4757;
  background: rgba(255, 71, 87, 0.1);
  font-size: 24px;
  transform: scale(1.2);
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #eee;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-title {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  min-height: 39.2px; /* 固定两行高度 (14px * 1.4 * 2) */
  max-height: 39.2px; /* 两行最大高度 (14px * 1.4 * 2) */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-word;
}

.product-no {
  margin: 0;
  font-size: 12px;
  color: #666;
  font-family: monospace;
}

.product-dimensions {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.product-dimensions span {
  font-size: 11px;
  padding: 2px 6px;
  background: #e9ecef;
  border-radius: 3px;
  color: #495057;
  font-family: monospace;
}

/* 备注输入框样式 */
.product-remark {
  margin-top: 8px;
}

.remark-input-container {
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

/* 编辑状态样式 - 稍微白一点 */
.remark-input-container.editing .remark-input {
  background-color: #ffffff;
  border-color: #dcdfe6;
}

.remark-input {
  flex: 1;
  padding: 6px 8px;
  padding-right: 60px; /* 为字符计数器留出空间 */
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  background-color: #f8f9fa; /* 默认稍微灰一点 */
  transition: background-color 0.2s ease, border-color 0.2s ease;
  box-sizing: border-box;
}

.character-counter {
  position: absolute;
  right: 8px;
  font-size: 10px;
  color: #999;
  pointer-events: none;
  background: #fff;
  padding: 0 2px;
}

.remark-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.remark-input::placeholder {
  color: #999;
  font-style: italic;
}

.favorite-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  background: #f8f9fa;
}

.submit-btn,
.clean-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background: #007bff;
  color: white;
}

.submit-btn:hover {
  background: #0056b3;
}

.clean-btn {
  background: #6c757d;
  color: white;
}

.clean-btn:hover {
  background: #545b62;
}

/* 加载更多提示样式 */
.load-more-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: #666;
  font-size: 14px;
}

.loading-spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.load-more-end {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .favorite-sidebar {
    width: 100vw;
    right: -100vw;
  }

  .favorite-sidebar-open {
    right: 0;
  }
}
</style>
