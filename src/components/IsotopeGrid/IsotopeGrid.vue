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

      <!-- 年份和季节选择器 - 靠右对齐 -->
      <div class="filter-selectors-container">
        <div class="filter-selectors">
          <div class="selector-wrapper">
            <select v-model="selectedYear" class="custom-select" @change="applyFilters">
              <option value="">All Years</option>
              <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>

          <div class="selector-wrapper">
            <select v-model="selectedSeason" class="custom-select" @change="applyFilters">
              <option value="">All Seasons</option>
              <option value="1">Spring</option>
              <option value="3">Autumn</option>
            </select>
          </div>
        </div>
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
                        <textarea v-model="viewProduct.pickRemark" class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Please describe your requirements for this product" />
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
      pageSize: 8,
      labelId: null,
      selectedYear: '',
      selectedSeason: '',
      theEnd: false,
      loadMore: 'Load More',
      itemRemark: ''
    }
  },
  computed: {
    yearOptions() {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let year = currentYear; year >= 2020; year--) {
        years.push(year)
      }
      return years
    }
  },
  mounted() {
    console.log('=== ISOTOPE GRID MOUNTED ===')
    console.log('Props received - selectedYear:', this.selectedYear, 'type:', typeof this.selectedYear)
    console.log('Props received - selectedSeason:', this.selectedSeason, 'type:', typeof this.selectedSeason)
    console.log('=== END ISOTOPE GRID MOUNTED ===')

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
      console.log('=== DEBUG: queryProduct method ===')
      console.log('Raw selectedYear:', this.selectedYear, 'type:', typeof this.selectedYear)
      console.log('Raw selectedSeason:', this.selectedSeason, 'type:', typeof this.selectedSeason)

      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        labelId: this.labelId
      }

      // 只有当选择了年份时才添加year参数
      if (this.selectedYear && this.selectedYear !== '' && this.selectedYear !== null && this.selectedYear !== undefined) {
        params.year = parseInt(this.selectedYear)
        console.log('Added year to params:', params.year)
      } else {
        console.log('Year NOT added. selectedYear:', this.selectedYear)
      }

      // 只有当选择了季节时才添加season参数
      if (this.selectedSeason && this.selectedSeason !== '' && this.selectedSeason !== null && this.selectedSeason !== undefined) {
        params.season = parseInt(this.selectedSeason)
        console.log('Added season to params:', params.season)
      } else {
        console.log('Season NOT added. selectedSeason:', this.selectedSeason)
      }

      console.log('Final params object:', params)
      console.log('=== END DEBUG ===')

      console.log('queryProduct called with params:', params)
      console.log('selectedYear:', this.selectedYear, 'selectedSeason:', this.selectedSeason)

      shoppingApi.queryProduct(params).then(res => {
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

      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        labelId: this.labelId
      }

      // 只有当选择了年份时才添加year参数
      if (this.selectedYear && this.selectedYear !== '' && this.selectedYear !== null && this.selectedYear !== undefined) {
        params.year = parseInt(this.selectedYear)
      }

      // 只有当选择了季节时才添加season参数
      if (this.selectedSeason && this.selectedSeason !== '' && this.selectedSeason !== null && this.selectedSeason !== undefined) {
        params.season = parseInt(this.selectedSeason)
      }

      shoppingApi.queryProduct(params).then(res => {
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

    // 应用筛选条件
    applyFilters() {
      this.pageNo = 1
      this.products = []
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
      shoppingApi.itemPick(this.viewProduct.itemId, this.viewProduct.pickRemark, 1).then(res => {
        this.viewProduct.pickFlag = 1
        $('.js-modal1').removeClass('show-modal1')
        this.$emit('handlePickProduct', { message: this.viewProduct })
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

/* 年份和季节选择器样式 */
.filter-selectors-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 10px;
}

.filter-selectors {
  display: flex;
  gap: 12px;
  align-items: center;
}

.selector-wrapper {
  position: relative;
}

.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 8px 32px 8px 12px;
  font-size: 13px;
  font-weight: 400;
  color: #666666;
  min-width: 110px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.custom-select:hover {
  border-color: #cccccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.custom-select:focus {
  outline: none;
  border-color: #999999;
  box-shadow: 0 0 0 2px rgba(153, 153, 153, 0.1);
}

.custom-select option {
  font-size: 13px;
  padding: 8px 12px;
  color: #333333;
  background: #ffffff;
}

.custom-select option:hover {
  background: #f5f5f5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .filter-selectors-container {
    justify-content: center;
  }

  .filter-selectors {
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 200px;
  }

  .custom-select {
    width: 100%;
    min-width: auto;
  }
}
</style>
