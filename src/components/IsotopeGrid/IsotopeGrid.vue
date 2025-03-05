<template>
  <div>
    <div class="flex-w flex-sb-m p-b-52" style="flex-direction: column;">
      <div class="flex-w flex-l-m filter-tope-group m-tb-10">
        <button :class="`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${labelId === null ? 'how-active1':''}`" @click="filterItems()">
          All Products
        </button>

        <button v-for="(label, index) in labels" :key="index" :class="`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${labelId === label.labelId ? 'how-active1':''}`" @click="filterItems(label.labelId)">
          {{ label.labelName }}
        </button>

      </div>
    </div>

    <!-- 网格容器 -->
    <div ref="grid" class="row">
      <div v-for="(product, index) in products" :key="index" :class="`col-sm-6 col-md-4 col-lg-3 p-b-35 grid-item ${product.itemNo}`">
        <div class="block2">
          <div class="block2-pic hov-img0">
            <img :src="`${product.itemPic}`">
            <button href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" @click="quickView(product)">
              Quick View
            </button>
          </div>

          <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l ">
              <a href="#" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                {{ product.itemNo }}
              </a>

              <span class="stext-105 cl3">
                L:{{ product.itemLength }} * W:{{ product.itemWidth }} * H:{{ product.itemHeight }}
              </span>
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
              <button href="#" class="dis-block pos-relative">
                <img class="icon-heart1 dis-block trans-04" :src="`${product.pickFlag?heart02:heart01}`" alt="ICON">
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- Modal1 -->
    <div class="wrap-modal1 js-modal1 p-t-60 p-b-20">
      <div class="overlay-modal1 js-hide-modal1" @click="hideView()" />

      <div class="container">
        <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
          <button class="how-pos3 hov3 trans-04 js-hide-modal1" @click="hideView()">
            <img :src="close" alt="CLOSE">
          </button>

          <div class="row">
            <div class="col-md-6 col-lg-6 p-b-30">
              <div class="p-l-25 p-r-30 p-lr-0-lg">
                <div class="wrap-slick3 flex-sb flex-w">
                  <div class="wrap-slick3-dots" />
                  <div class="wrap-slick3-arrows flex-sb-m flex-w" />

                  <div class="slick3 gallery-lb">
                    <SlickCarousel :product="viewProduct" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-6 p-b-30">
              <div class="p-r-50 p-t-5 p-lr-0-lg">
                <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                  {{ viewProduct.itemNo }}
                </h4>

                <span class="mtext-106 cl2">
                  L:{{ viewProduct.itemLength }} * W:{{ viewProduct.itemWidth }} * H:{{ viewProduct.itemHeight }}
                </span>

                <p class="stext-102 cl3 p-t-23">
                  {{ viewProduct.description }}
                </p>

                <!--  -->
                <div class="p-t-33">
                  <div class="flex-w flex-r-m p-b-10">
                    <div class="panel-search w-full p-t-10 p-b-15">
                      <div class="bor8 dis-flex p-l-15">
                        <textarea v-model="itemRemark" class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Please describe your requirements for this product" />
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">

                      <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" @click="addToCart">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Load more -->
    <div class="flex-c-m flex-w w-full p-t-45">
      <button href="#" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04" @click="loadMoreProduct">
        {{ loadMore }}
      </button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Isotope from 'isotope-layout'
import heart01 from '@/assets/images/icons/icon-heart-01.png'
import heart02 from '@/assets/images/icons/icon-heart-02.png'
import close from '@/assets/images/icons/icon-close.png'
import SlickCarousel from '@/components/SlickCarousel/SlickCarousel.vue'
import shoppingApi from '@/api/shopping'
import Swal from 'sweetalert2'

export default {
  components: {
    SlickCarousel
  },
  data() {
    return {
      isotope: null, // 存储 Isotope 实例
      heart01: heart01,
      heart02: heart02,
      close: close,
      labels: [],
      products: [],
      viewProduct: {},
      pageNo: 1,
      pageSize: 4,
      labelId: null,
      theEnd: false,
      loadMore: 'Load More',
      itemRemark: ''
    }
  },
  mounted() {
    this.queryLabel()

    this.queryProduct()

    this.initIsotope()
  },
  methods: {
    queryLabel() {
      shoppingApi.queryLabel().then(res => {
        this.labels = res.labelList
      })
    },

    queryProduct() {
      shoppingApi.queryProduct(this.pageNo, this.pageSize, this.labelId).then(res => {
        this.products = res.itemList
        if (res.itemList.length < this.pageSize) {
          this.theEnd = true
          this.loadMore = 'All Loaded'
        }
      })
    },

    loadMoreProduct() {
      if (this.theEnd) {
        return
      }
      this.pageNo = this.pageNo + 1
      shoppingApi.queryProduct(this.pageNo, this.pageSize, this.labelId).then(res => {
        if (res === '') {
          this.theEnd = true
          this.loadMore = 'All Loaded'
        } else if (res.itemList.length < this.pageSize) {
          this.theEnd = true
          this.loadMore = 'All Loaded'
          this.products = [...this.products, ...res.itemList]
          this.isotope.layout()
        } else if (res.itemList.length === this.pageSize) {
          this.products = [...this.products, ...res.itemList]
          this.isotope.layout()
        }
      })
    },

    initIsotope() {
      // 初始化 Isotope
      this.isotope = new Isotope(this.$refs.grid, {
        itemSelector: '.grid-item',
        layoutMode: 'fitRows', // 布局模式：每行固定数量
        percentPosition: true,
        animationEngine: 'best-available',
        masonry: {
          columnWidth: '.grid-item'
        }
      })
    },

    // 过滤项目
    filterItems(labelId) {
      // this.isotope.arrange({ filter: selector })
      this.pageNo = 1
      this.products = []
      this.labelId = labelId
      this.theEnd = false
      this.loadMore = 'Load More'
      this.queryProduct()
    },
    /* ==================================================================
     [ Quick View ]*/
    hideView() {
      $('.js-modal1').removeClass('show-modal1')
    },

    quickView(product) {
      this.viewProduct = product
      $('.js-modal1').addClass('show-modal1')
    },
    addToCart() {
      shoppingApi.itemPick(this.viewProduct.itemId, this.itemRemark, 1).then(res => {
        this.viewProduct.pickFlag = 1
        $('.js-modal1').removeClass('show-modal1')
        Swal.fire({
          text: '[' + this.viewProduct.itemNo + '] is added to cart !',
          icon: 'success',
          timer: 3000, // 动态设置关闭时间
          timerProgressBar: true, // 显示进度条
          showConfirmButton: false // 隐藏确认按钮
        })
      })
    }
  }
}
</script>

<style scoped>
.filter-buttons {
  margin-bottom: 20px;
}

.filter-buttons button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.grid-item {
  width: calc(25% - 10px); /* 每行 4 张图片 */
  box-sizing: border-box;
}

.grid-item img {
  width: 100%;
  height: auto;
  display: block;
}

.row {
  position: relative !important;
  height: auto !important;
}

*::placeholder {
  color: rgb(128, 128, 128) !important;
}
</style>
