<template>
  <!-- 图片查看模态框 -->
  <div v-if="visible" class="image-modal" @click="handleClose">
    <div class="image-modal-content" @click.stop>
      <div class="image-modal-header">
        <h3>{{ product && product.title }}</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="image-modal-body">
        <img :src="product && product.image" :alt="product && product.title" class="modal-image" @click="openImageModal">
        <div class="product-details">
          <p><strong>Product No:</strong> NO.{{ product && product.itemNo }}</p>
          <div v-if="(product && product.itemLength) || (product && product.itemWidth) || (product && product.itemHeight)" class="dimensions">
            <strong>Dimensions:</strong>
            <span v-if="product && product.itemLength">L: {{ product.itemLength }}</span>
            <span v-if="product && product.itemWidth">W: {{ product.itemWidth }}</span>
            <span v-if="product && product.itemHeight">H: {{ product.itemHeight }}</span>
          </div>
          <!-- 备注显示 -->
          <div v-if="product && product.pickRemark" class="product-remark-display">
            <strong>Remark:</strong>
            <span class="remark-text">{{ product.pickRemark }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片放大模态框 -->
    <div v-if="showImageModal" class="image-zoom-modal" @click="closeImageModal">
      <div class="image-zoom-content" @click.stop>
        <button class="zoom-close-btn" @click="closeImageModal">&times;</button>
        <img :src="product && product.image" :alt="product && product.title" class="zoom-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showImageModal: false
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        // 阻止页面滚动
        document.body.style.overflow = 'hidden'
      } else {
        // 恢复页面滚动
        document.body.style.overflow = 'auto'
      }
    }
  },
  beforeDestroy() {
    // 组件销毁时恢复页面滚动
    document.body.style.overflow = 'auto'
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    // 打开图片放大模态框
    openImageModal() {
      this.showImageModal = true
    },
    // 关闭图片放大模态框
    closeImageModal() {
      this.showImageModal = false
    }
  }
}
</script>

<style scoped>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.image-modal-content {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.image-modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.image-modal-header h3 {
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

.image-modal-body {
  padding: 20px;
  display: flex;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-image {
  max-width: 400px;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.modal-image:hover {
  transform: scale(1.02);
}

.product-details {
  flex: 1;
  min-width: 200px;
}

.product-details p {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #333;
}

.dimensions {
  font-size: 14px;
  color: #333;
}

.dimensions span {
  margin-right: 15px;
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
}

.product-remark-display {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.product-remark-display strong {
  color: #666;
  margin-right: 8px;
}

.remark-text {
  color: #007bff;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  border-left: 3px solid #007bff;
}

/* 图片放大模态框样式 */
.image-zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.image-zoom-content {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  background: transparent;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  animation: scaleIn 0.3s ease;
}

.zoom-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 28px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.zoom-close-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.zoom-image {
  width: auto;
  height: auto;
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .image-modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  .image-modal-body {
    flex-direction: column;
    padding: 15px;
  }

  .modal-image {
    max-width: 100%;
    max-height: 300px;
  }

  .image-zoom-content {
    max-width: 98%;
    max-height: 98%;
  }

  .zoom-image {
    max-width: 95vw;
    max-height: 70vh;
  }

  .zoom-close-btn {
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    font-size: 22px;
  }
}
</style>
