<template>
  <div class="shopping-container">
    <!-- 头部筛选区域 -->
    <div class="header-section">
      <!-- 右上角导航链接 -->
      <div class="top-navigation">
        <router-link
          to="/shopping/collection"
          class="nav-link"
          :class="{ active: $route.path === '/shopping/collection' }"
        >
          Collections
        </router-link>
        <router-link
          to="/shopping/products"
          class="nav-link"
          :class="{ active: $route.path === '/shopping/products' }"
        >
          Products
        </router-link>
      </div>

      <!-- 左侧筛选栏 -->
      <div class="filter-sidebar">
        <div class="filter-section">
          <div class="filter-title">Product Category</div>
          <div class="filter-options">
            <div
              class="filter-option filter-option-all"
              :class="{ active: filters.firstLabelId === null }"
              @click="applyFilter('firstLabelId', null)"
            >
              All
            </div>
            <div
              class="filter-option"
              :class="{ active: filters.firstLabelId === 2 }"
              @click="applyFilter('firstLabelId', 2)"
            >
              GLASS VASE
            </div>
            <div
              class="filter-option"
              :class="{ active: filters.firstLabelId === 3 }"
              @click="applyFilter('firstLabelId', 3)"
            >
              GLASS CANDLE HOLDER
            </div>
            <div
              class="filter-option"
              :class="{ active: filters.firstLabelId === 4 }"
              @click="applyFilter('firstLabelId', 4)"
            >
              LED LIGHT
            </div>
            <div
              class="filter-option"
              :class="{ active: filters.firstLabelId === 5 }"
              @click="applyFilter('firstLabelId', 5)"
            >
              TABLEWARE
            </div>
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-title">Year</div>
          <div class="filter-options">
            <div
              class="filter-option filter-option-all"
              :class="{ active: filters.year === null }"
              @click="applyFilter('year', null)"
            >
              All
            </div>
            <div class="filter-options-row">
              <div
                class="filter-option"
                :class="{ active: filters.year === 2025 }"
                @click="applyFilter('year', 2025)"
              >
                2025
              </div>
              <div
                class="filter-option"
                :class="{ active: filters.year === 2026 }"
                @click="applyFilter('year', 2026)"
              >
                2026
              </div>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <div class="filter-title">Season</div>
          <div class="filter-options">
            <div
              class="filter-option filter-option-all"
              :class="{ active: filters.season === null }"
              @click="applyFilter('season', null)"
            >
              All
            </div>
            <div class="filter-options-row">
              <div
                class="filter-option"
                :class="{ active: filters.season === 1 }"
                @click="applyFilter('season', 1)"
              >
                Spring
              </div>
              <div
                class="filter-option"
                :class="{ active: filters.season === 3 }"
                @click="applyFilter('season', 3)"
              >
                Autumn
              </div>
            </div>
          </div>
        </div>

        <button class="clear-filters-btn" @click="clearFilters">
          Clear Filters
        </button>
      </div>

      <!-- 右侧推荐轮播 -->
      <div class="banner-section">
        <div class="banner-container">
          <div class="banner-wrapper" :style="{ transform: `translateX(-${currentBannerIndex * 20}%)` }">
            <div
              v-for="(page, pageIndex) in bannerPages"
              :key="pageIndex"
              class="banner-page"
            >
              <div
                v-for="(item, itemIndex) in page"
                :key="item.itemId || itemIndex"
                class="banner-item"
              >
                <img
                  :src="item.itemPic || item.itemCompressPic || 'https://picsum.photos/300/300?random=' + (item.itemId || itemIndex + 1000)"
                  :alt="`商品${item.itemId || itemIndex}`"
                  @error="handleImageError($event, item)"
                >
              </div>
            </div>
          </div>
          <div class="banner-indicators">
            <div
              v-for="(page, index) in bannerPages"
              :key="index"
              class="indicator"
              :class="{ active: currentBannerIndex === index }"
              @click="currentBannerIndex = index"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 排序栏 -->
    <div class="sort-bar">
      <div class="sort-options">
        <span class="sort-label">Sort:</span>
        <button
          class="sort-btn"
          :class="{ active: !filters.lengthSort && !filters.heightSort }"
          @click="clearFilters"
        >
          Default
        </button>
        <button
          class="sort-btn"
          :class="{ active: filters.lengthSort === 'asc' }"
          @click="applyLengthSort('asc')"
        >
          Length↑
        </button>
        <button
          class="sort-btn"
          :class="{ active: filters.lengthSort === 'desc' }"
          @click="applyLengthSort('desc')"
        >
          Length↓
        </button>
        <button
          class="sort-btn"
          :class="{ active: filters.heightSort === 'asc' }"
          @click="applyHeightSort('asc')"
        >
          Height↑
        </button>
        <button
          class="sort-btn"
          :class="{ active: filters.heightSort === 'desc' }"
          @click="applyHeightSort('desc')"
        >
          Height↓
        </button>
      </div>
      <div class="result-count">
        Showing {{ products.length }} products
      </div>
    </div>

    <!-- 商品网格 -->
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image" @click="viewProductImage(product)">
          <img :src="product.image" :alt="product.title">
        </div>
        <div class="product-info">
          <div class="product-title">{{ product.title }}</div>
          <div class="product-itemno-row">
            <span class="product-itemno">NO.{{ product.itemNo }}</span>
            <span class="pick-heart" :class="{ 'picked': product.pickFlag === 1 }" @click="togglePickItem(product)">❤️</span>
          </div>
          <div v-if="product.itemLength || product.itemWidth || product.itemHeight" class="product-dimensions">
            <span v-if="product.itemLength">L: {{ product.itemLength }}</span>
            <span v-if="product.itemWidth">W: {{ product.itemWidth }}</span>
            <span v-if="product.itemHeight">H: {{ product.itemHeight }}</span>
          </div>
          <!-- 备注编辑功能（仅对已喜欢的商品显示） -->
          <div v-if="product.pickFlag === 1" class="product-remark-input">
            <div class="remark-input-container" :class="{ 'editing': product.isRemarkEditing }">
              <input
                type="text"
                class="remark-input"
                :value="getRemarkValue(product)"
                :placeholder="product.pickRemark ? 'Edit remark...' : 'Add remark...'"
                maxlength="100"
                @input="handleRemarkInput(product, $event)"
                @blur="handleRemarkBlur(product)"
                @focus="handleRemarkFocus(product)"
              >
              <span class="character-counter">{{ getCharacterCount(product) }}/100</span>
            </div>
          </div>
          <!-- 显示个性化备注（未喜欢的商品只读显示） -->
          <div v-else-if="product.pickRemark" class="product-remark-display">
            <span class="remark-label">Remark:</span>
            <span class="remark-text">{{ product.pickRemark }}</span>
          </div>

        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner" />
      <span>Loading...</span>
    </div>

    <!-- 商品详情模态框组件 -->
    <ProductDetailModal
      :visible="showImageModal"
      :product="selectedProduct"
      @close="closeImageModal"
    />

    <!-- 回顶部按钮 -->
    <div v-if="showBackToTop" class="back-to-top" @click="scrollToTop">
      <div class="back-to-top-icon">
        <i class="el-icon-top" />
      </div>
      <div class="back-to-top-text">Back to Top</div>
    </div>

    <!-- 悬浮的喜欢按钮 -->
    <div class="floating-favorite-btn" @click="toggleFavoriteList">
      <div class="favorite-icon">❤️</div>
    </div>

    <!-- 喜欢商品列表侧边栏组件 -->
    <FavoriteSidebar
      :visible="showFavoriteList"
      :products="favoriteProducts"
      :loading="loadingFavorites"
      :has-more="favoriteHasMore"
      @close="closeFavoriteList"
      @submit="submitFavoriteList"
      @clear="clearFavoriteList"
      @load-more="loadMoreFavoriteProducts"
      @item-deleted="handleItemDeleted"
      @remark-updated="handleRemarkUpdated"
    />

    <!-- 自定义确认对话框 -->
    <div v-if="showConfirmDialog" class="custom-confirm-overlay" @click="handleOverlayClick">
      <div class="custom-confirm-dialog" @click.stop>
        <div class="confirm-header">
          <h3>{{ confirmDialog.title }}</h3>
        </div>
        <div class="confirm-content">
          <p>{{ confirmDialog.message }}</p>
        </div>
        <div class="confirm-actions">
          <button class="confirm-btn cancel-btn" @click="handleConfirmCancel">
            {{ confirmDialog.cancelText }}
          </button>
          <button class="confirm-btn confirm-btn-primary" @click="handleConfirmOk">
            {{ confirmDialog.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDisplayItemList, getItemShowList, customerPickItem, cancelAllPickItems, customerSubmitItem } from '@/api/shoppingV2'
import ProductDetailModal from './ProductDetailModal.vue'
import FavoriteSidebar from './FavoriteSidebar.vue'

export default {
  name: 'ShoppingV2',
  components: {
    ProductDetailModal,
    FavoriteSidebar
  },
  data() {
    return {
      // 筛选条件
      filters: {
        firstLabelId: null,
        year: 2025,
        season: 3,
        brand: '',
        lengthSort: null, // null, 'asc', 'desc'
        heightSort: null // null, 'asc', 'desc'
      },
      // 商品数据
      products: [],
      currentPage: 1,
      pageSize: 20,
      loading: false,
      hasMore: true, // 是否还有更多数据
      scrollContainer: null,
      // 推荐商品轮播
      bannerProducts: [],
      bannerPages: [], // 分页后的轮播图数据，每页3张图片
      currentBannerIndex: 0,
      bannerTimer: null,
      // 图片查看模态框
      showImageModal: false,
      selectedProduct: null,
      // 回顶部按钮控制
      showBackToTop: false,
      // 喜欢商品列表相关
      showFavoriteList: false,
      favoriteProducts: [],
      loadingFavorites: false,
      currentFavoritePage: 1,
      favoritePageSize: 10,
      favoriteHasMore: true,
      // 自定义确认对话框
      showConfirmDialog: false,
      confirmDialog: {
        title: 'Confirmation',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      },
      confirmResolve: null,
      confirmReject: null
    }
  },
  watch: {
  },
  mounted() {
    console.log('组件mounted开始')

    // 检查是否是首次进入，如果是则重定向到集合页
    if (this.$route.path === '/shoppingV2/index') {
      this.$router.replace('/shopping/collection')
      return
    }

    // 隐藏系统布局元素
    this.hideSystemLayout()

    this.loadProducts()
    this.loadBannerProducts()
    this.startBannerAutoPlay()

    // 测试 clearFavoriteList 方法是否存在
    console.log('clearFavoriteList 方法类型:', typeof this.clearFavoriteList)
    console.log('clearFavoriteList 方法:', this.clearFavoriteList)

    // 延迟添加滚动监听，确保DOM已经更新和布局调整完成
    this.$nextTick(() => {
      console.log('$nextTick执行')
      // 增加延迟时间确保布局完全调整完成
      setTimeout(() => {
        console.log('准备添加滚动监听')
        this.addScrollListener()
      }, 500)
    })
  },
  beforeDestroy() {
    // 恢复系统布局元素
    this.showSystemLayout()

    this.removeScrollListener()
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer)
    }
  },
  methods: {
    // 加载商品
    async loadProducts() {
      if (this.loading) {
        console.log('正在加载中，跳过重复请求')
        return
      }

      this.loading = true
      console.log(`开始加载第${this.currentPage}页商品，每页${this.pageSize}条`)

      try {
        const requestData = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          // 根据筛选条件设置参数
          firstLabelId: this.filters.firstLabelId, // 商品分类筛选
          secondLabelId: null,
          pickFlag: null, // 是否喜欢筛选
          year: this.filters.year, // 年份筛选
          season: this.filters.season, // 季度筛选
          // 长度排序：2是升序，1是降序
          lengthOrder: this.filters.lengthSort === 'asc' ? 2
            : this.filters.lengthSort === 'desc' ? 1 : null,
          // 高度排序：2是升序，1是降序
          heightOrder: this.filters.heightSort === 'asc' ? 2
            : this.filters.heightSort === 'desc' ? 1 : null
        }

        console.log('API请求参数:', requestData)
        const response = await getDisplayItemList(requestData)
        console.log('API响应:', response)

        if (response && response.itemList) {
          // 调试：检查后端返回的备注数据
          const itemsWithRemarks = response.itemList.filter(item => item.pickRemark)
          if (itemsWithRemarks.length > 0) {
            console.log('后端返回的包含备注的商品:', itemsWithRemarks.map(item => ({
              itemNo: item.itemNo,
              pickFlag: item.pickFlag,
              pickRemark: item.pickRemark
            })))
          }

          // 转换数据格式以适配现有模板
          const convertedProducts = response.itemList.map(item => ({
            id: item.itemId,
            title: item.description || `商品 ${item.itemNo}`,
            itemNo: item.itemNo,
            image: item.itemPic || item.itemCompressPic || 'https://picsum.photos/300/300?random=1',
            tags: item.pickFlag === 1 ? 'Liked' : 'Not selected',
            category: '商品',
            pickFlag: item.pickFlag,
            pickRemark: item.pickRemark,
            itemLength: item.itemLength,
            itemWidth: item.itemWidth,
            itemHeight: item.itemHeight
          }))

          console.log(`第${this.currentPage}页加载了${convertedProducts.length}条商品`)

          if (this.currentPage === 1) {
            this.products = convertedProducts
            console.log('重置商品列表，当前商品总数:', this.products.length)
          } else {
            this.products = [...this.products, ...convertedProducts]
            console.log('追加商品到列表，当前商品总数:', this.products.length)
          }

          // 判断是否还有更多数据
          this.hasMore = convertedProducts.length === this.pageSize
          console.log('是否还有更多数据:', this.hasMore)
        } else {
          console.log('API响应中没有商品数据')
          this.hasMore = false
        }
      } catch (error) {
        console.error('加载商品失败:', error)
        // 如果接口调用失败，显示错误信息
        this.$message.error('Failed to load products, please try again later')
      } finally {
        this.loading = false
        console.log(`第${this.currentPage}页加载完成`)
      }
    },

    // 切换商品喜欢状态
    async togglePickItem(product) {
      try {
        // 根据当前pickFlag状态决定传递的值
        const newPickFlag = product.pickFlag === 1 ? 0 : 1

        console.log(`切换商品 ${product.itemNo} 的喜欢状态，当前: ${product.pickFlag}, 新状态: ${newPickFlag}`)
        console.log(`当前商品备注信息:`, {
          pickRemark: product.pickRemark,
          tempRemark: product.tempRemark
        })

        // 立即清空备注相关字段，无论是取消喜欢还是重新喜欢
        this.$set(product, 'pickRemark', '')
        this.$set(product, 'tempRemark', undefined)

        // 先立即更新UI状态，提供即时反馈
        this.$set(product, 'pickFlag', newPickFlag)
        this.$set(product, 'tags', newPickFlag === 1 ? 'Liked' : 'Not selected')

        try {
          // 调用API - 注意使用itemId而不是itemNo
          const response = await customerPickItem({
            itemId: product.id,
            pickFlag: newPickFlag,
            // 无论是取消喜欢还是重新喜欢，都发送空备注，让用户重新输入
            itemRemark: ''
          })

          if (response) {
            console.log(`API调用成功，备注字段已清空:`, {
              pickRemark: product.pickRemark,
              tempRemark: product.tempRemark,
              apiResponse: response
            })

            this.$message.success(newPickFlag === 1 ? 'Added to favorites' : 'Removed from favorites')
            console.log(`商品 ${product.itemNo} 状态更新成功`)
          }
        } catch (apiError) {
          // 如果API调用失败，回滚状态
          console.error('API调用失败，回滚状态:', apiError)
          this.$set(product, 'pickFlag', product.pickFlag === 1 ? 0 : 1)
          this.$set(product, 'tags', product.pickFlag === 1 ? 'Liked' : 'Not selected')
          this.$message.error('Operation failed, please try again later')
        }
      } catch (error) {
        console.error('切换喜欢状态失败:', error)
        this.$message.error('Operation failed, please try again later')
      }
    },

    // 获取备注值
    getRemarkValue(product) {
      return product.tempRemark !== undefined ? product.tempRemark : (product.pickRemark || '')
    },

    // 获取字符计数
    getCharacterCount(product) {
      const remark = this.getRemarkValue(product)
      return remark ? remark.length : 0
    },

    // 处理备注输入
    handleRemarkInput(product, event) {
      const value = event.target.value
      this.$set(product, 'tempRemark', value)
    },

    // 处理备注获得焦点
    handleRemarkFocus(product) {
      // 初始化临时备注值
      if (product.tempRemark === undefined) {
        this.$set(product, 'tempRemark', product.pickRemark || '')
      }
      // 设置编辑状态
      this.$set(product, 'isRemarkEditing', true)
    },

    // 处理备注失去焦点（保存备注）
    async handleRemarkBlur(product) {
      // 结束编辑状态
      this.$set(product, 'isRemarkEditing', false)
      // 如果临时备注值未定义，直接返回
      if (product.tempRemark === undefined) {
        return
      }
      // 检查备注是否有变化
      const originalRemark = product.pickRemark || ''
      const newRemark = product.tempRemark || ''

      if (originalRemark === newRemark) {
        console.log('备注无变化，跳过保存')
        return
      }
      console.log('保存商品备注:', product.id, newRemark)

      try {
        // 调用API保存备注，使用itemRemark字段
        const response = await customerPickItem({
          itemId: product.id,
          pickFlag: 1, // 保持喜欢状态
          itemRemark: newRemark
        })

        if (response) {
          // 找到products数组中对应的商品索引
          const productIndex = this.products.findIndex(p => p.id === product.id)
          if (productIndex !== -1) {
            // 更新products数组中的商品备注信息
            this.$set(this.products[productIndex], 'pickRemark', newRemark)
            this.$set(this.products[productIndex], 'tempRemark', newRemark)
          }

          // 同时更新传入的product对象（保持兼容性）
          this.$set(product, 'pickRemark', newRemark)

          // 同步更新喜欢列表中的备注（如果存在）
          const favoriteProduct = this.favoriteProducts.find(fp => fp.id === product.id)
          if (favoriteProduct) {
            this.$set(favoriteProduct, 'pickRemark', newRemark)
            this.$set(favoriteProduct, 'tempRemark', newRemark)
          }

          // 显示成功消息
          if (newRemark && newRemark.trim()) {
            this.$message.success('Remark saved')
          }
        }
      } catch (error) {
        console.error('保存备注失败:', error)
        this.$message.error('Failed to save remark, please try again later')

        // 恢复原始值
        this.$set(product, 'tempRemark', originalRemark)
      }
    },

    // 图片查看相关方法
    viewProductImage(product) {
      this.selectedProduct = product
      this.showImageModal = true
      // 阻止页面滚动
      document.body.style.overflow = 'hidden'
    },

    closeImageModal() {
      this.showImageModal = false
      this.selectedProduct = null
      // 恢复页面滚动
      document.body.style.overflow = 'auto'
    },

    // 轮播相关
    // 加载轮播图商品数据
    async loadBannerProducts() {
      try {
        console.log('开始加载轮播图商品数据')
        const requestData = {
          pageNo: 1,
          pageSize: 15 // 获取前15条数据
        }

        const response = await getItemShowList(requestData)
        console.log('轮播图API响应:', response)

        if (response && response.itemList && response.itemList.length > 0) {
          this.bannerProducts = response.itemList
          console.log('轮播图数据加载成功，共', this.bannerProducts.length, '条数据')
          console.log('第一条数据示例:', JSON.stringify(this.bannerProducts[0], null, 2))
          this.processBannerData()
        } else {
          console.log('轮播图API响应中没有数据')
          this.bannerProducts = []
        }
      } catch (error) {
        console.error('加载轮播图数据失败:', error)
        this.bannerProducts = []
      }
    },

    // 处理轮播图数据，每页3张图片，总共5页
    processBannerData() {
      const itemsPerPage = 3
      const pages = []

      for (let i = 0; i < this.bannerProducts.length; i += itemsPerPage) {
        const page = this.bannerProducts.slice(i, i + itemsPerPage)
        pages.push(page)
      }

      this.bannerPages = pages
      console.log('轮播图分页处理完成，共', this.bannerPages.length, '页，每页', itemsPerPage, '张图片')
    },

    startBannerAutoPlay() {
      this.bannerTimer = setInterval(() => {
        this.currentBannerIndex = (this.currentBannerIndex + 1) % this.bannerPages.length
      }, 3000)
    },

    // 处理图片加载错误
    handleImageError(event, item) {
      console.log('图片加载失败:', item)
      // 设置默认图片
      event.target.src = `https://picsum.photos/300/300?random=${item.itemId + 1000}`
    },

    // 添加滚动监听
    addScrollListener() {
      console.log('开始添加滚动监听...')

      // 由于页面隐藏了系统布局，主要滚动容器变成了.main-container
      const mainContainer = document.querySelector('.main-container')
      const appMain = document.querySelector('.app-main')

      console.log('容器检查:', {
        mainContainer: !!mainContainer,
        mainContainerOverflow: mainContainer ? mainContainer.style.overflow : 'null',
        appMain: !!appMain,
        appMainOverflow: appMain ? appMain.style.overflow : 'null'
      })

      // 由于页面布局复杂，先尝试使用window作为滚动容器
      // 检查页面是否可以滚动
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const canWindowScroll = documentHeight > windowHeight

      console.log('页面滚动检查:', {
        documentHeight,
        windowHeight,
        canWindowScroll
      })

      if (canWindowScroll) {
        this.scrollContainer = window
        console.log('滚动监听已添加到: window (页面可滚动)')
      } else if (mainContainer && mainContainer.scrollHeight > mainContainer.clientHeight) {
        this.scrollContainer = mainContainer
        console.log('滚动监听已添加到: main-container', mainContainer)
      } else if (appMain && appMain.scrollHeight > appMain.clientHeight) {
        this.scrollContainer = appMain
        console.log('滚动监听已添加到: app-main', appMain)
      } else {
        // 默认使用window
        this.scrollContainer = window
        console.log('滚动监听已添加到: window (默认)')
      }

      this.scrollContainer.addEventListener('scroll', this.handleScroll)
      console.log('滚动监听添加完成，容器:', this.scrollContainer)

      // 测试滚动事件是否能触发
      console.log('测试滚动事件绑定...')

      // 验证事件监听器是否真正绑定
      const testScroll = () => {
        console.log('手动触发滚动测试事件')
        this.handleScroll()
      }

      // 3秒后手动触发一次测试
      setTimeout(testScroll, 3000)

      // 检查容器的实际滚动属性
      if (this.scrollContainer !== window) {
        console.log('容器滚动属性检查:', {
          scrollTop: this.scrollContainer.scrollTop,
          scrollHeight: this.scrollContainer.scrollHeight,
          clientHeight: this.scrollContainer.clientHeight,
          offsetHeight: this.scrollContainer.offsetHeight,
          style: this.scrollContainer.style.cssText,
          computedStyle: window.getComputedStyle(this.scrollContainer).overflow
        })
      }
    },

    // 移除滚动监听
    removeScrollListener() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll)
        this.scrollContainer = null
      }
    },

    // 滚动加载
    handleScroll() {
      console.log('滚动事件触发!')

      // 检查scrollContainer是否存在
      if (!this.scrollContainer) {
        console.warn('scrollContainer为null，跳过滚动处理')
        return
      }

      let scrollTop, scrollHeight, clientHeight

      if (this.scrollContainer === window) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
        scrollHeight = document.documentElement.scrollHeight
        clientHeight = window.innerHeight
      } else {
        scrollTop = this.scrollContainer.scrollTop
        scrollHeight = this.scrollContainer.scrollHeight
        clientHeight = this.scrollContainer.clientHeight
      }

      // 当滚动到距离底部100px时触发加载
      const threshold = 100
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold

      console.log('滚动检测:', {
        scrollTop,
        clientHeight,
        scrollHeight,
        threshold,
        isNearBottom,
        loading: this.loading,
        hasMore: this.hasMore,
        currentPage: this.currentPage,
        containerType: this.scrollContainer === window ? 'window' : (this.scrollContainer.className || 'unknown'),
        containerElement: this.scrollContainer
      })

      // 控制回顶部按钮显示：当页面滚动超过一屏高度且已经加载第二页时显示
      const shouldShowBackToTop = scrollTop > clientHeight && this.currentPage >= 2
      if (this.showBackToTop !== shouldShowBackToTop) {
        this.showBackToTop = shouldShowBackToTop
      }

      if (isNearBottom && !this.loading && this.hasMore) {
        console.log('触发加载下一页:', this.currentPage + 1)
        this.currentPage++
        this.loadProducts()
      } else if (isNearBottom) {
        console.log('接近底部但不加载，原因:', {
          loading: this.loading,
          hasMore: this.hasMore
        })
      }
    },

    // 筛选方法
    applyFilter(type, value) {
      this.filters[type] = value
      this.currentPage = 1
      this.products = [] // 清空当前产品列表
      this.hasMore = true // 重置分页状态
      this.loadProducts()
    },

    // 长度排序方法
    applyLengthSort(direction) {
      // 如果点击的是当前已选中的排序，则取消排序
      if (this.filters.lengthSort === direction) {
        this.filters.lengthSort = null
      } else {
        this.filters.lengthSort = direction
      }
      this.currentPage = 1
      this.products = [] // 清空当前产品列表
      this.hasMore = true // 重置分页状态
      this.loadProducts()
    },

    // 高度排序方法
    applyHeightSort(direction) {
      // 如果点击的是当前已选中的排序，则取消排序
      if (this.filters.heightSort === direction) {
        this.filters.heightSort = null
      } else {
        this.filters.heightSort = direction
      }
      this.currentPage = 1
      this.products = [] // 清空当前产品列表
      this.hasMore = true // 重置分页状态
      this.loadProducts()
    },

    // 清除筛选
    clearFilters() {
      this.filters = {
        firstLabelId: null,
        year: null,
        season: null,
        brand: '',
        lengthSort: null,
        heightSort: null
      }
      this.currentPage = 1
      this.products = [] // 清空当前产品列表
      this.hasMore = true // 重置分页状态
      this.loadProducts()
    },

    // 隐藏系统布局元素
    hideSystemLayout() {
      // 隐藏左侧菜单
      const sidebar = document.querySelector('.sidebar-container')
      if (sidebar) {
        sidebar.style.display = 'none'
      }

      // 隐藏顶部导航栏
      const navbar = document.querySelector('.navbar')
      if (navbar) {
        navbar.style.display = 'none'
      }

      // 隐藏标签栏
      const tagsView = document.querySelector('.tags-view-container')
      if (tagsView) {
        tagsView.style.display = 'none'
      }

      // 调整主容器样式
      const mainContainer = document.querySelector('.main-container')
      if (mainContainer) {
        mainContainer.style.marginLeft = '0'
        mainContainer.style.width = '100vw'
        mainContainer.style.position = 'fixed'
        mainContainer.style.top = '0'
        mainContainer.style.left = '0'
        mainContainer.style.zIndex = '9999'
        mainContainer.style.height = '100vh'
        mainContainer.style.overflow = 'auto'
      }

      // 调整app-main样式
      const appMain = document.querySelector('.app-main')
      if (appMain) {
        appMain.style.minHeight = '100vh'
        appMain.style.paddingTop = '0'
        appMain.style.height = '100%'
        appMain.style.overflow = 'auto'
      }
    },

    // 显示系统布局元素
    showSystemLayout() {
      // 显示左侧菜单
      const sidebar = document.querySelector('.sidebar-container')
      if (sidebar) {
        sidebar.style.display = ''
      }

      // 显示顶部导航栏
      const navbar = document.querySelector('.navbar')
      if (navbar) {
        navbar.style.display = ''
      }

      // 显示标签栏
      const tagsView = document.querySelector('.tags-view-container')
      if (tagsView) {
        tagsView.style.display = ''
      }

      // 恢复主容器样式
      const mainContainer = document.querySelector('.main-container')
      if (mainContainer) {
        mainContainer.style.marginLeft = ''
        mainContainer.style.width = ''
        mainContainer.style.position = ''
        mainContainer.style.top = ''
        mainContainer.style.left = ''
        mainContainer.style.zIndex = ''
        mainContainer.style.height = ''
        mainContainer.style.overflow = ''
      }

      // 恢复app-main样式
      const appMain = document.querySelector('.app-main')
      if (appMain) {
        appMain.style.minHeight = ''
        appMain.style.paddingTop = ''
        appMain.style.height = ''
        appMain.style.overflow = ''
      }
    },

    // 回顶部方法
    scrollToTop() {
      if (this.scrollContainer === window) {
        // 使用window的平滑滚动
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        // 使用容器的平滑滚动
        this.scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },

    // 显示/隐藏喜欢商品列表
    toggleFavoriteList() {
      if (!this.showFavoriteList) {
        this.loadFavoriteProducts()
      }
      this.showFavoriteList = !this.showFavoriteList
    },

    // 获取喜欢的商品列表
    async loadFavoriteProducts(loadMore = false) {
      this.loadingFavorites = true
      try {
        // 如果是加载更多，使用当前页码；否则重置为第一页
        if (!loadMore) {
          this.currentFavoritePage = 1
          this.favoriteHasMore = true
        }

        const params = {
          pickFlag: 1,
          pageNo: this.currentFavoritePage,
          pageSize: this.favoritePageSize
        }
        const response = await getDisplayItemList(params)

        // 转换数据格式以适配 FavoriteSidebar 组件
        if (response && response.itemList) {
          const newProducts = response.itemList.map(item => ({
            id: item.itemId,
            title: item.description || `商品 ${item.itemNo}`,
            itemNo: item.itemNo,
            image: item.itemPic || item.itemCompressPic || 'https://picsum.photos/300/300?random=1',
            pickFlag: item.pickFlag,
            pickRemark: item.pickRemark,
            itemLength: item.itemLength,
            itemWidth: item.itemWidth,
            itemHeight: item.itemHeight
          }))

          if (loadMore) {
            // 加载更多时追加数据
            this.favoriteProducts = [...this.favoriteProducts, ...newProducts]
          } else {
            // 首次加载时替换数据
            this.favoriteProducts = newProducts
          }

          // 检查是否还有更多数据
          this.favoriteHasMore = newProducts.length === this.favoritePageSize

          // 如果成功加载，页码递增
          if (newProducts.length > 0) {
            this.currentFavoritePage++
          }
        } else {
          if (!loadMore) {
            this.favoriteProducts = []
          }
          this.favoriteHasMore = false
        }
      } catch (error) {
        console.error('获取喜欢商品列表失败:', error)
        this.$message.error('Failed to get favorite products list')
        this.favoriteHasMore = false
      } finally {
        this.loadingFavorites = false
      }
    },

    // 加载更多喜欢的商品
    async loadMoreFavoriteProducts() {
      if (!this.favoriteHasMore || this.loadingFavorites) {
        return
      }
      await this.loadFavoriteProducts(true)
    },

    // 关闭喜欢商品列表
    closeFavoriteList() {
      this.showFavoriteList = false
    },

    // 自定义确认对话框方法
    showCustomConfirm(message, title = 'Notification', options = {}) {
      return new Promise((resolve, reject) => {
        this.confirmDialog = {
          title: title,
          message: message,
          confirmText: options.confirmText || 'Confirm',
          cancelText: options.cancelText || 'Cancel'
        }
        this.confirmResolve = resolve
        this.confirmReject = reject
        this.showConfirmDialog = true
      })
    },

    handleConfirmOk() {
      this.showConfirmDialog = false
      if (this.confirmResolve) {
        this.confirmResolve(true)
      }
      this.confirmResolve = null
      this.confirmReject = null
    },

    handleConfirmCancel() {
      this.showConfirmDialog = false
      if (this.confirmReject) {
        this.confirmReject(false)
      }
      this.confirmResolve = null
      this.confirmReject = null
    },

    handleOverlayClick() {
      // 点击遮罩层时取消对话框
      this.handleConfirmCancel()
    },

    // 清空喜欢商品列表
    async clearFavoriteList() {
      console.log('开始清空操作')

      try {
        // 使用自定义确认对话框
        await this.showCustomConfirm(
          'Are you sure you want to clear all favorite products?',
          'Notification',
          {
            confirmText: 'Confirm',
            cancelText: 'Cancel'
          }
        )

        console.log('用户确认了清空操作，开始调用API')

        // 调用清空API
        await cancelAllPickItems({})

        console.log('API调用成功，清空本地数据')

        // 清空本地收藏商品数据
        this.favoriteProducts = []
        this.currentFavoritePage = 1
        this.favoriteHasMore = true
        // 更新商品列表中的pickFlag状态
        this.products.forEach(product => {
          if (product.pickFlag === 1) {
            this.$set(product, 'pickFlag', 0)
            this.$set(product, 'tags', 'Not selected')
            // 清空备注相关字段
            this.$set(product, 'pickRemark', '')
            this.$set(product, 'tempRemark', undefined)
          }
        })
        this.$message.success('All favorite products have been cleared')
      } catch (error) {
        if (error === false) {
          // 用户取消了操作
          console.log('用户取消了清空操作')
          this.$message.info('Operation cancelled')
        } else {
          // API调用失败
          console.error('清空操作失败:', error)
          this.$message.error('Clear failed, please try again later')
        }
      }
    },

    // 处理单个商品删除
    handleItemDeleted(itemId) {
      console.log('处理商品删除，商品ID:', itemId)
      // 从喜欢列表中移除该商品
      this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== itemId)
      // 更新主商品列表中对应商品的pickFlag状态和备注
      const productIndex = this.products.findIndex(product => product.id === itemId)
      if (productIndex !== -1) {
        this.$set(this.products[productIndex], 'pickFlag', 0)
        this.$set(this.products[productIndex], 'tags', 'Not selected')
        // 清空备注相关字段
        this.$set(this.products[productIndex], 'pickRemark', '')
        this.$set(this.products[productIndex], 'tempRemark', undefined)
      }
      console.log('商品删除处理完成，当前喜欢列表长度:', this.favoriteProducts.length)
    },

    // 处理备注更新
    handleRemarkUpdated(data) {
      console.log('收到remark-updated事件，商品ID:', data.itemId, '新备注:', data.pickRemark)
      // 更新主商品列表中对应商品的备注信息
      const productIndex = this.products.findIndex(product => product.id === data.itemId)
      console.log('在主商品列表中查找商品，索引:', productIndex)
      if (productIndex !== -1) {
        const oldRemark = this.products[productIndex].pickRemark
        const tempRemarkValue = data.pickRemark || undefined // 如果备注为空，设置为undefined
        // 使用多种方式确保更新生效
        // 方法1: 直接赋值
        this.products[productIndex].pickRemark = data.pickRemark
        this.products[productIndex].tempRemark = tempRemarkValue
        // 方法2: 使用$set确保响应式
        this.$set(this.products[productIndex], 'pickRemark', data.pickRemark)
        this.$set(this.products[productIndex], 'tempRemark', tempRemarkValue)
        // 方法3: 重新创建整个商品对象以确保响应式更新
        const updatedProduct = {
          ...this.products[productIndex],
          pickRemark: data.pickRemark,
          tempRemark: tempRemarkValue
        }
        this.$set(this.products, productIndex, updatedProduct)
        // 方法4: 强制更新视图
        this.$forceUpdate()
        console.log('主商品列表备注已同步更新，从:', oldRemark, '到:', data.pickRemark)
        console.log('更新后的商品对象:', this.products[productIndex])
      } else {
        console.log('在主商品列表中未找到对应商品，商品ID:', data.itemId)
        // 打印当前商品列表的ID以便调试
        console.log('当前商品列表的ID:', this.products.map(p => p.id))
      }
    },

    // 提交喜欢商品列表
    async submitFavoriteList() {
      if (this.favoriteProducts.length === 0) {
        this.$message.warning('Favorite products list is empty')
        return
      }

      try {
        // 使用自定义确认对话框
        await this.showCustomConfirm(
          'Are you sure you want to submit all favorite products?',
          'Notification',
          {
            confirmText: 'Confirm',
            cancelText: 'Cancel'
          }
        )

        console.log('用户确认了提交操作，开始调用API')

        // 调用提交API
        await customerSubmitItem({})

        console.log('API调用成功')

        this.$message.success('Favorite products list submitted successfully')
        this.closeFavoriteList()
      } catch (error) {
        if (error === false) {
          // 用户取消了操作
          console.log('用户取消了提交操作')
          this.$message.info('Operation cancelled')
        } else {
          // API调用失败
          console.error('提交操作失败:', error)
          this.$message.error('Submit failed, please try again later')
        }
      }
    }
  }
}
</script>

<style scoped>
.shopping-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
  position: relative;
  box-sizing: border-box;
}

/* 头部筛选区域 */
.header-section {
  display: flex;
  gap: 12px;
  margin: 0 auto 8px auto;
  padding: 12px 20px 12px 20px;
  align-items: center; /* 让子元素中心对齐 */
  max-width: calc(6 * 220px + 5 * 20px); /* 与商品网格保持一致 */
  position: relative;
}

/* 右上角导航链接 */
.top-navigation {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px; /* 与商品区域宽度一致 */
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px 0;
  z-index: 1000;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: #ff6900;
  background-color: #fff;
  border-color: #ff6900;
}

.nav-link.active {
  color: #ff6900;
  background-color: #fff;
  border-color: #ff6900;
  font-weight: 600;
}

/* 左侧筛选栏 */
.filter-sidebar {
  width: 280px;
  background: white;
  border-radius: 8px;
  padding: 12px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 12px;
}

.filter-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-options-row {
  display: flex;
  gap: 4px;
}

.filter-option {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 12px;
}

.filter-option:hover {
  background-color: #f0f0f0;
  color: #ff6b35;
}

.filter-option.active {
  background-color: #ff6b35;
  color: white;
}

.filter-option-all {
  font-weight: bold;
}

.clear-filters-btn {
  width: 100%;
  padding: 6px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 12px;
}

.clear-filters-btn:hover {
  background-color: #e0e0e0;
}

/* 右侧推荐轮播 */
.banner-section {
  width: 100%; /* 默认正常宽度 */
  max-width: calc(6 * 220px + 5 * 20px); /* 与商品网格保持一致 */
  height: 200px; /* 减少高度以避免覆盖筛选项 */
  margin: 0 auto; /* 默认居中 */
  padding: 0 2px; /* 减少左右padding，更好利用空间 */
  box-sizing: border-box;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.banner-wrapper {
  display: flex;
  width: 500%; /* 5页 × 100% */
  height: 100%;
  transition: transform 0.5s ease;
  position: relative;
  left: 0;
  top: 0;
}

.banner-page {
  width: 20%; /* 每页占20%宽度 (100% / 5页) */
  height: 100%;
  display: flex;
  flex-direction: row; /* 改为横向排列 */
  align-items: stretch; /* 拉伸填满高度，消除上下留白 */
  justify-content: space-evenly; /* 均匀分布 */
  gap: 4px; /* 适中间距，更好利用空间 */
  padding: 0 4px; /* 只保留左右内边距，移除上下内边距 */
  box-sizing: border-box;
  flex-shrink: 0;
}

/* 大屏幕时调整间距 */
@media (min-width: 1200px) {
  .banner-page {
    gap: 2px; /* 3张图片时使用更紧凑间距 */
    padding: 0 2px; /* 只保留左右内边距，移除上下内边距 */
  }
}

.banner-item {
  width: calc((100% - 8px) / 2); /* 默认每页2张图片，适应新的间距 */
  height: 100%; /* 填满整个高度，消除上下留白 */
  position: relative;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

/* 平板设备：显示2张图片 */
@media (min-width: 769px) and (max-width: 1199px) {
  .banner-item {
    width: calc((100% - 8px) / 2); /* 平板每页2张图片，与默认样式保持一致 */
  }
  .banner-page {
    gap: 4px;
    padding: 0 4px; /* 只保留左右内边距，移除上下内边距 */
  }
}

/* 大屏幕时显示3张图片 */
@media (min-width: 1200px) {
  .banner-item {
    width: calc((100% - 4px) / 3); /* 大屏幕每页3张图片 */
  }
}

/* 超大屏幕时启用扩展布局 */
@media (min-width: 1400px) {
  .banner-section {
    width: auto !important;
    max-width: calc(3 * 364px + 2 * 16px) !important;
    height: 364px !important;
    margin: 0 !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
  }

  .banner-item {
    width: 364px !important;
    height: 364px !important;
  }

  .banner-page {
    gap: 16px !important;
    padding: 0 !important;
  }

  .banner-item img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
}

/* 中等屏幕时恢复正常布局 */
@media (min-width: 1200px) and (max-width: 1399px) {
  .banner-section {
    width: 100%;
    max-width: calc(6 * 220px + 5 * 20px);
    height: 220px; /* 中等屏幕：适中高度避免覆盖 */
    margin: 0 auto;
  }
}

.banner-item img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
}

.banner-indicators {
  position: absolute;
  bottom: 10px;
  right: 20px;
  display: flex;
  gap: 8px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: white;
}

/* 排序栏 */
.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 20px;
  border-radius: 8px;
  margin: 0 auto 16px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: calc(6 * 220px + 5 * 20px); /* 与商品网格保持一致 */
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-label {
  color: #666;
  font-weight: 500;
  font-size: 12px;
}

.sort-btn {
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 12px;
}

.sort-btn:hover {
  border-color: #ff6b35;
  color: #ff6b35;
}

.sort-btn.active {
  background-color: #ff6b35;
  border-color: #ff6b35;
  color: white;
}

.result-count {
  color: #666;
  font-size: 12px;
}

/* 商品网格 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 0 auto 40px auto;
  max-width: calc(6 * 220px + 5 * 20px); /* 6个商品 + 5个间隙 */
  padding: 0 20px; /* 左右内边距 */
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 10px 20px;
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  background-color: #e55a2b;
}

.product-info {
  padding: 16px;
}

.product-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 0px;
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

.product-itemno-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0 8px 0;
}

.product-itemno {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b35;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.pick-heart {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;
  margin-right: 27px;
  filter: grayscale(1);
  opacity: 0.5;
}

.pick-heart:hover {
  transform: scale(1.1);
  filter: grayscale(0.5);
  opacity: 0.8;
}

.pick-heart.picked {
  filter: grayscale(0);
  opacity: 0.95;
}

.product-dimensions {
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.product-dimensions span {
  margin-right: 15px;
}

.product-dimensions span:last-child {
  margin-right: 0;
}

/* 备注显示样式 */
.product-remark-display {
  margin-bottom: 8px;
  font-size: 11px;
  color: #888;
  background-color: #f8f9fa;
  padding: 4px 6px;
  border-radius: 3px;
  border-left: 3px solid #ff6b35;
}

.remark-label {
  font-weight: 500;
  color: #666;
}

.remark-text {
  color: #555;
  word-break: break-word;
}

/* 备注输入框样式 */
.product-remark-input {
  margin-bottom: 8px;
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
  font-size: 11px;
  color: #333;
  background-color: #f8f9fa; /* 默认稍微灰一点 */
  transition: background-color 0.2s ease, border-color 0.2s ease;
  box-sizing: border-box;
}

.remark-input:focus {
  outline: none;
  border-color: #ff6b35;
  box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
}

.remark-input::placeholder {
  color: #999;
  font-style: italic;
}

.character-counter {
  position: absolute;
  right: 8px;
  font-size: 10px;
  color: #999;
  pointer-events: none;
  background: #fff;
  padding: 0 2px;
  transition: opacity 0.3s ease;
}

.product-shop {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.product-tags {
  display: flex;
  gap: 4px;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 2px;
  font-size: 10px;
}

.tag.picked {
  background: #ff6b35;
  color: white;
}

/* 加载状态 */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: #666;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f0f0f0;
  border-top: 2px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    padding: 8px 0;
    margin: 0 12% 8px 12%;
  }

  .filter-sidebar {
    width: 100%;
  }

  .banner-section {
    width: 100%; /* 移动端恢复正常宽度 */
    max-width: none; /* 移除最大宽度限制 */
    height: 150px; /* 移动端：减少高度避免覆盖筛选项 */
    margin: 0 12% 8px 12%; /* 恢复正常边距 */
    padding: 0 4px; /* 减少移动端padding，更好利用空间 */
  }

  /* 移动端轮播每页只显示1张图片 */
  .banner-item {
    width: calc(100% - 4px); /* 移动端每页1张图片，最大化显示 */
  }

  .banner-page {
    gap: 4px;
    padding: 0 4px; /* 只保留左右内边距，移除上下内边距 */
    justify-content: center; /* 居中显示单张图片 */
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
    margin: 0 12% 40px 12%;
  }

  .sort-bar {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    margin: 0 12% 16px 12%;
  }
}

/* 移动端响应式布局 */
@media (max-width: 768px) {
  .products-grid,
  .sort-bar,
  .header-section,
  .banner-section {
    max-width: none; /* 移动端取消最大宽度限制 */
    padding: 0 15px; /* 减少左右内边距 */
  }
}

/* 宽屏幕布局：当能显示6个或更多商品时使用12%边距 */
@media (min-width: 1460px) {
  .header-section {
    max-width: none;
    margin: 0 12% 20px 12%;
    padding: 20px 0;
  }

  .banner-section {
    max-width: none;
    margin: 0 12% 20px 12%;
    padding: 0;
  }

  .sort-bar {
    max-width: none;
    margin: 0 12% 20px 12%;
  }

  .products-grid {
    max-width: none;
    margin: 0 12% 40px 12%;
    padding: 0;
  }
}

/* 回顶部按钮样式 */
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 60px;
  height: 80px;
  background: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-to-top-icon {
  width: 32px;
  height: 32px;
  background: transparent;
  color: #333;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.back-to-top:hover .back-to-top-icon {
  background: #333;
  color: white;
  transform: scale(1.1);
}

.back-to-top-text {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  text-align: center;
  transition: color 0.3s ease;
}

.back-to-top:hover .back-to-top-text {
  color: #333;
}

/* 悬浮喜欢按钮样式 */
.floating-favorite-btn {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.3);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.floating-favorite-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 25px rgba(255, 107, 157, 0.4);
}

.floating-favorite-btn .favorite-icon {
  font-size: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 1;
}

.floating-favorite-btn .count {
  font-size: 10px;
  color: white;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1px 4px;
  min-width: 16px;
  text-align: center;
}

/* 移动端回顶部按钮调整 */
@media (max-width: 768px) {
  .back-to-top {
    right: 20px;
    bottom: 60px;
    width: 50px;
    height: 70px;
  }

  .back-to-top-icon {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .back-to-top-text {
    font-size: 11px;
  }
}

</style>

<style>
/* 全局样式重置，确保页面完全独立 */
body.shopping-page {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

/* 隐藏系统布局组件 */
.shopping-page .app-wrapper {
  display: none !important;
}

.shopping-page .sidebar-container {
  display: none !important;
}

.shopping-page .main-container {
  display: none !important;
}

.shopping-page .navbar {
  display: none !important;
}

/* 自定义确认对话框样式 */
.custom-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-confirm-dialog {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  min-width: 400px;
  max-width: 500px;
  animation: confirmDialogFadeIn 0.3s ease-out;
}

@keyframes confirmDialogFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.confirm-header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}

.confirm-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.confirm-content {
  padding: 20px;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.confirm-content p {
  margin: 0;
}

.confirm-actions {
  padding: 10px 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.confirm-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn-primary {
  background: #409eff;
  color: white;
}

.confirm-btn-primary:hover {
  background: #66b1ff;
}
</style>
