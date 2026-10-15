<template>
  <div class="wrap-modal1 p-t-60 p-b-20" :class="{ 'show-modal1': product }">
    <div class="overlay-modal1" @click="$emit('close')" />
    <div class="container">
      <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
        <button class="how-pos3 hov3 trans-04" @click="$emit('close')">
          <img :src="closeIcon" alt="CLOSE">
        </button>

        <div v-if="product" class="row">
          <div class="col-md-6 col-lg-7 p-b-30">
            <div class="quick-gallery">
              <div class="quick-thumbs">
                <button
                  v-for="(image, index) in productImages"
                  :key="index"
                  type="button"
                  :class="{ active: activeImage === image }"
                  @click="setActiveImage(image)"
                >
                  <img :src="image" alt="IMG-PRODUCT">
                </button>
              </div>
              <div class="quick-main wrap-pic-w">
                <img class="quick-image" :src="activeImage" alt="IMG-PRODUCT">
                <button
                  type="button"
                  class="quick-zoom-btn"
                  @click="previewOpen = true"
                >
                  <i class="fa fa-expand" />
                </button>
                <button
                  v-if="productImages.length > 1"
                  type="button"
                  class="quick-arrow quick-arrow-left"
                  @click="prevImage"
                >
                  <i class="fa fa-angle-left" />
                </button>
                <button
                  v-if="productImages.length > 1"
                  type="button"
                  class="quick-arrow quick-arrow-right"
                  @click="nextImage"
                >
                  <i class="fa fa-angle-right" />
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-5 p-b-30">
            <div class="quick-detail">
              <h4 class="mtext-105 cl2 p-b-14">{{ product.name }}</h4>
              <!--              <span class="mtext-106 cl2">{{ product.price }}</span>-->

              <div v-if="viewMode !== 'collection'" class="p-t-23">
                <div v-if="product.itemNo" class="flex-w p-b-10">
                  <span class="stext-102 cl3 size-203">itemNo：</span>
                  <span class="stext-102 cl6">{{ product.itemNo }}</span>
                </div>

                <div v-if="product.itemLength || product.itemWidth || product.itemHeight" class="flex-w p-b-10">
                  <span class="stext-102 cl3 size-203">itemSize：</span>
                  <span class="stext-102 cl6">
                    L:{{ product.itemLength }}cm × W:{{ product.itemWidth }}cm × H:{{ product.itemHeight }}cm
                  </span>
                </div>

                <div v-if="product.year" class="flex-w p-b-10">
                  <span class="stext-102 cl3 size-203">year：</span>
                  <span class="stext-102 cl6">{{ product.year }}</span>
                </div>

                <div v-if="product.season" class="flex-w p-b-10">
                  <span class="stext-102 cl3 size-203">season：</span>
                  <span class="stext-102 cl6">{{ getSeasonName(product.season) }}</span>
                </div>

                <div class="flex-w p-b-10">
                  <span class="stext-102 cl3 size-203">Purchase Remark：</span>
                  <div class="flex-col-l" style="flex: 1;">
                    <textarea
                      v-model="remark"
                      class="stext-102 cl6 plh3 p-lr-10 p-tb-8"
                      placeholder="Enter your purchase remark..."
                      rows="3"
                      maxlength="200"
                      style="width: 100%; border: 1px solid #e6e6e6; border-radius: 2px; resize: vertical;"
                    />
                    <div class="remark-counter stext-102" :class="{ 'counter-warning': remark.length >= 200 }">
                      {{ remark.length }}/200
                    </div>
                  </div>
                </div>

              </div>

              <div v-if="viewMode !== 'collection'" class="p-t-33">
                <button
                  class="quick-add-btn flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  @click="handleAddToCart"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="fullscreen-preview"
      :class="{ show: previewOpen }"
      @click.self="previewOpen = false"
    >
      <button type="button" class="preview-close" @click="previewOpen = false">
        <i class="zmdi zmdi-close" />
      </button>
      <button
        v-if="productImages.length > 1"
        type="button"
        class="preview-arrow preview-arrow-left"
        @click="prevImage"
      >
        <i class="fa fa-angle-left" />
      </button>
      <img :src="activeImage" alt="IMG-PRODUCT">
      <button
        v-if="productImages.length > 1"
        type="button"
        class="preview-arrow preview-arrow-right"
        @click="nextImage"
      >
        <i class="fa fa-angle-right" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopQuickView',
  props: {
    product: {
      type: Object,
      default: null
    },
    detailImages: {
      type: Array,
      required: true
    },
    closeIcon: {
      type: String,
      required: true
    },
    viewMode: {
      type: String,
      default: 'category'
    }
  },
  data() {
    return {
      activeImage: '',
      previewOpen: false,
      remark: ''
    }
  },
  computed: {
    productImages() {
      if (!this.product) return this.detailImages
      const images = []
      if (this.product.image) {
        images.push(this.product.image)
      }
      if (this.product.itemPic && this.product.itemPic !== this.product.image) {
        images.push(this.product.itemPic)
      }
      if (images.length === 0) {
        return this.detailImages
      }
      return images
    }
  },
  watch: {
    product(value) {
      if (value) {
        this.activeImage = this.productImages[0]
        this.previewOpen = false
        this.remark = ''
      }
    },
    productImages: {
      immediate: true,
      handler(images) {
        if (images && images.length > 0) {
          this.activeImage = images[0]
        }
      }
    }
  },
  methods: {
    getSeasonName(season) {
      const seasonMap = {
        1: 'Spring',
        2: 'Summer',
        3: 'Autumn',
        4: 'Winter'
      }
      return seasonMap[season] || ''
    },
    setActiveImage(image) {
      this.activeImage = image
    },
    prevImage() {
      const index = this.productImages.indexOf(this.activeImage)
      this.activeImage = this.productImages[
        (index - 1 + this.productImages.length) % this.productImages.length
      ]
    },
    nextImage() {
      const index = this.productImages.indexOf(this.activeImage)
      this.activeImage = this.productImages[
        (index + 1) % this.productImages.length
      ]
    },
    handleAddToCart() {
      this.$emit('add-cart', {
        product: this.product,
        remark: this.remark
      })
    }
  }
}
</script>

<style scoped>
.remark-counter {
  text-align: right;
  color: #999;
  font-size: 12px;
  margin-top: 4px;
  padding-right: 4px;
}

.counter-warning {
  color: #e74c3c;
  font-weight: 500;
}
</style>
