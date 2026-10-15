<template>
  <div class="shop-page">
    <ShopHeader
      :logo="logo"
      :cart-count="cart.length"
      @show-cart="cartOpen = true"
      @logout="logout"
    />

    <ShopCartDrawer
      :visible="cartOpen"
      :items="cart"
      @close="cartOpen = false"
      @remove="removeCartItem"
      @submit="submitCart"
      @clean="cleanCart"
    />

    <main class="bg0 m-t-23 p-b-140 product-area">
      <div class="container">
        <div class="flex-w flex-sb-m p-b-52">
          <div class="flex-w flex-l-m filter-tope-group m-tb-10">
            <button
              class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              :class="{ 'how-active1': viewMode === 'collection' }"
              type="button"
              @click="switchToCollection"
            >
              COLLECTION
            </button>
            <button
              v-for="category in categories"
              :key="category.value"
              class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
              :class="{ 'how-active1': viewMode === 'category' && activeCategory === category.value }"
              type="button"
              @click="switchToCategory(category.value)"
            >
              {{ category.label }}
            </button>
          </div>

          <div class="flex-w flex-c-m m-tb-10">
            <div
              class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
              :class="{ 'show-filter': filterVisible }"
              @click="toggleFilter"
            >
              <i
                class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"
                :class="{ 'dis-none': filterVisible }"
              />
              <i
                class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"
                :class="{ 'dis-none': !filterVisible }"
              />
              Filter
            </div>
            <div
              class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search"
              :class="{ 'show-search': searchVisible }"
              @click="toggleSearch"
            >
              <i
                class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"
                :class="{ 'dis-none': searchVisible }"
              />
              <i
                class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"
                :class="{ 'dis-none': !searchVisible }"
              />
              Search
            </div>
          </div>

          <div
            class="panel-search w-full p-t-10 p-b-15"
            :class="{ 'dis-none': !searchVisible }"
          >
            <div class="bor8 dis-flex p-l-15 p-r-15">
              <button class="size-113 flex-c-m fs-16 cl2" type="button" @click="handleSearch">
                <i class="zmdi zmdi-search" />
              </button>
              <input
                v-model="keyword"
                class="mtext-107 cl2 size-114 plh2 p-r-15"
                type="text"
                placeholder="Search support itemNo and description fields."
                @keyup.enter="handleSearch"
              >
              <button
                v-if="keyword"
                class="size-113 flex-c-m fs-16 cl2"
                type="button"
                @click="clearSearch"
              >
                <i class="zmdi zmdi-close" />
              </button>
            </div>
          </div>

          <div
            class="panel-filter w-full p-t-10"
            :class="{ 'dis-none': !filterVisible }"
          >
            <div
              class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm"
            >
              <div
                v-for="group in filters"
                :key="group.title"
                class="filter-col1 p-r-15 p-b-27"
              >
                <div class="mtext-102 cl2 p-b-15">{{ group.title }}</div>
                <ul>
                  <li
                    v-for="item in group.items"
                    :key="item.value"
                    class="p-b-6"
                  >
                    <a
                      href="#"
                      class="filter-link stext-106 trans-04"
                      :class="{ 'filter-link-active': isDateFilterActive(group.type, item.value) }"
                      @click.prevent="selectDateFilter(group.type, item.value)"
                    >{{ item.label }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-loading="loading" class="row isotope-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id || product.itemNo"
            class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
          >
            <div class="block2">
              <div class="block2-pic hov-img0">
                <img :src="product.image" :alt="product.name" @error="handleImageError">
                <a
                  href="#"
                  class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04"
                  @click.prevent="quickProduct = product"
                >
                  Quick View
                </a>
              </div>
              <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-l">
                  <a
                    href="#"
                    class="stext-104 cl4 hov-cl1 trans-04 p-b-6"
                    @click.prevent="quickProduct = product"
                  >
                    {{ product.itemNo }}
                  </a>
                  <span v-if="viewMode !== 'collection'" class="stext-104 cl4 hov-cl1 trans-04 p-b-6 product-name-ellipsis">
                    {{ product.name }}
                  </span>
                  <span v-if="viewMode !== 'collection'" class="stext-105 cl3">
                    L:{{ product.itemLength }} * W:{{ product.itemWidth }} * H:{{ product.itemHeight }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && products.length === 0" class="flex-c-m flex-w w-full p-t-45">
          <div class="stext-101 cl5">
            <i class="zmdi zmdi-info-outline m-r-5" />
            {{ keyword ? 'No products found matching your search' : 'No products available' }}
          </div>
        </div>

        <div v-if="loading && products.length > 0" class="flex-c-m flex-w w-full p-t-45">
          <div class="stext-101 cl5">Loading more products...</div>
        </div>
        <div v-if="!hasMore && products.length > 0" class="flex-c-m flex-w w-full p-t-45">
          <div class="stext-101 cl5">No more products</div>
        </div>
      </div>
    </main>

    <ShopFooter :groups="footerGroups" :year="year" />

    <ShopQuickView
      :product="quickProduct"
      :detail-images="detailImages"
      :close-icon="close"
      :view-mode="viewMode"
      @close="quickProduct = null"
      @add-cart="addCart"
    />

    <button
      v-show="backTopVisible"
      type="button"
      class="btn-back-to-top shop-back-top"
      @click="scrollToTop"
    >
      <span
        class="symbol-btn-back-to-top"
      ><i
        class="zmdi zmdi-chevron-up"
      /></span>
    </button>
  </div>
</template>

<script>
import store from '@/store'
import ShopCartDrawer from './components/ShopCartDrawer.vue'
import ShopFooter from './components/ShopFooter.vue'
import ShopHeader from './components/ShopHeader.vue'
import ShopQuickView from './components/ShopQuickView.vue'
import { getItemList, itemPick, queryCartItemList, queryCollectionItemList, submitCart, cleanCart, queryLabelList } from '@/api/shopping'
import logo from '@/assets/images/icons/logo.png'
import close from '@/assets/images/icons/icon-close.png'

export default {
  name: 'ShoppingProduct',
  components: {
    ShopCartDrawer,
    ShopFooter,
    ShopHeader,
    ShopQuickView
  },
  data() {
    const currentYear = new Date().getFullYear()
    const yearItems = [{ label: 'All Years', value: '' }]
    for (let year = currentYear; year >= 2020; year--) {
      yearItems.push({ label: String(year), value: year })
    }
    return {
      logo,
      close,
      detailImages: [],
      cartOpen: false,
      filterVisible: false,
      searchVisible: false,
      keyword: '',
      viewMode: 'category',
      activeCategory: null,
      selectedYear: '',
      selectedSeason: '',
      quickProduct: null,
      backTopVisible: false,
      loading: false,
      currentPage: 0,
      pageSize: 40,
      hasMore: true,
      categories: [],
      filters: [
        {
          title: 'Year',
          type: 'year',
          items: yearItems
        },
        {
          title: 'Season',
          type: 'season',
          items: [
            { label: 'All Seasons', value: '' },
            { label: 'Spring', value: 1 },
            { label: 'Autumn', value: 3 }
          ]
        }
      ],
      cart: [],
      products: [],
      footerGroups: [
        {
          title: 'GET IN TOUCH',
          text:
            'Any questions? Let us know in store at Room 1205, Unit 2, Building 1, Linheli, Tongzhou District, Beijing'
        },
        { title: 'Newsletter', text: 'simplehomedeco@163.com' }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products
    },
    year() {
      return new Date().getFullYear()
    }
  },
  watch: {
    selectedYear() {
      this.resetAndLoadProducts()
    },
    selectedSeason() {
      this.resetAndLoadProducts()
    }
  },
  mounted() {
    document.body.classList.add('shopping-product-active')
    this.loadPageStyles()
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    this.initDefaultFilters()
    this.loadLabels()
    this.loadProducts()
    this.loadCartItems()
  },
  beforeDestroy() {
    this.cleanupPageEffects()
  },
  beforeRouteLeave(to, from, next) {
    this.cleanupPageEffects()
    next()
  },
  methods: {
    initDefaultFilters() {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      // 根据月份计算季节：3-5月春季(1)，6-8月夏季(2)，9-11月秋季(3)，12-2月冬季(4)
      let currentSeason = 1
      if (currentMonth >= 3 && currentMonth <= 5) {
        currentSeason = 1
      } else if (currentMonth >= 6 && currentMonth <= 8) {
        currentSeason = 2
      } else if (currentMonth >= 9 && currentMonth <= 11) {
        currentSeason = 3
      } else {
        currentSeason = 4
      }

      // 检查年份选项是否存在
      const yearExists = this.filters.find(f => f.type === 'year').items.some(item => item.value === currentYear)
      this.selectedYear = yearExists ? currentYear : ''

      // 检查季节选项是否存在
      const seasonExists = this.filters.find(f => f.type === 'season').items.some(item => item.value === currentSeason)
      this.selectedSeason = seasonExists ? currentSeason : ''
    },
    async loadLabels() {
      try {
        const params = { labelLevel: 1 }
        const res = await queryLabelList(params)
        if (res && Array.isArray(res)) {
          this.categories = [
            { label: 'ALL PRODUCTS', value: null },
            ...res.map(label => ({
              label: label.labelName,
              value: label.id
            }))
          ]
          // 默认选中第一个分类（ALL PRODUCTS）
          if (this.categories.length > 0) {
            this.viewMode = 'category'
            this.activeCategory = this.categories[0].value
          }
        }
      } catch (error) {
        console.error('加载标签失败:', error)
        this.$message.error('Failed to load categories')
      }
    },
    async loadCartItems() {
      try {
        const res = await queryCartItemList()
        if (res && Array.isArray(res.content)) {
          this.cart = res.content.map(item => ({
            itemNo: item.itemNo,
            name: item.description || item.itemNo,
            image: item.itemCompressPic || item.itemPic,
            remark: item.pickRemark || '',
            itemLength: item.itemLength,
            itemWidth: item.itemWidth,
            itemHeight: item.itemHeight,
            id: item.itemId
          }))
        }
      } catch (error) {
        console.error('加载购物车失败:', error)
      }
    },
    async loadCollectionProducts() {
      if (this.loading || !this.hasMore) return
      try {
        this.loading = true
        const params = { page: this.currentPage, size: this.pageSize, sort: 'id,desc' }
        params.firstLabelId = -1
        if (this.selectedYear !== '' && this.selectedYear !== null) {
          params.year = this.selectedYear
        }
        if (this.selectedSeason !== '' && this.selectedSeason !== null) {
          params.season = this.selectedSeason
        }
        const res = await queryCollectionItemList(params)
        if (res && Array.isArray(res.content)) {
          const newProducts = res.content.map(item => ({
            id: item.id,
            itemNo: item.itemNo,
            name: item.description || item.itemNo,
            image: item.itemCompressPic || item.itemPic,
            price: item.unitPrice ? `¥${item.unitPrice}` : '¥0.00',
            year: item.year,
            season: item.season,
            firstLabelId: item.firstLabelId,
            secondLabelId: item.secondLabelId,
            itemRemark: item.itemRemark,
            itemLength: item.itemLength,
            itemWidth: item.itemWidth,
            itemHeight: item.itemHeight,
            unitPrice: item.unitPrice
          }))
          this.products = [...this.products, ...newProducts]
          this.currentPage++
          this.hasMore = res.content.length >= this.pageSize
        }
      } catch (error) {
        console.error('加载展览商品失败:', error)
        this.$message.error('Failed to load collection products')
      } finally {
        this.loading = false
      }
    },
    async loadProducts() {
      if (this.loading || !this.hasMore) return
      // 如果是 collection 模式，调用不同的接口
      if (this.viewMode === 'collection') {
        await this.loadCollectionProducts()
        return
      }
      // category 模式，使用原来的逻辑
      try {
        this.loading = true
        const params = { page: this.currentPage, size: this.pageSize, sort: 'id,desc' }
        if (this.activeCategory !== null && this.activeCategory !== '') {
          params.firstLabelId = this.activeCategory
        }
        if (this.selectedYear !== '' && this.selectedYear !== null) {
          params.year = this.selectedYear
        }
        if (this.selectedSeason !== '' && this.selectedSeason !== null) {
          params.season = this.selectedSeason
        }
        // 搜索关键词：支持itemNo和description两个字段的OR模糊搜索
        if (this.keyword && this.keyword.trim() !== '') {
          params.blurry = this.keyword.trim()
        }
        const res = await getItemList(params)
        if (res && res.content && Array.isArray(res.content)) {
          const newProducts = res.content.map(item => ({
            id: item.id,
            itemNo: item.itemNo,
            name: item.description || item.itemNo,
            image: item.itemCompressPic || item.itemPic,
            price: item.unitPrice ? `¥${item.unitPrice}` : '¥0.00',
            year: item.year,
            season: item.season,
            firstLabelId: item.firstLabelId,
            secondLabelId: item.secondLabelId,
            itemRemark: item.itemRemark,
            itemLength: item.itemLength,
            itemWidth: item.itemWidth,
            itemHeight: item.itemHeight,
            unitPrice: item.unitPrice
          }))
          this.products = [...this.products, ...newProducts]
          this.currentPage++
          this.hasMore = res.content.length >= this.pageSize
        }
      } catch (error) {
        console.error('加载商品失败:', error)
        this.$message.error('Failed to load products')
      } finally {
        this.loading = false
      }
    },
    resetAndLoadProducts() {
      this.currentPage = 0
      this.hasMore = true
      this.products = []
      this.loadProducts()
    },
    switchToCollection() {
      this.viewMode = 'collection'
      this.resetAndLoadProducts()
    },
    switchToCategory(categoryValue) {
      this.viewMode = 'category'
      this.activeCategory = categoryValue
      this.resetAndLoadProducts()
    },
    handleSearch() {
      this.resetAndLoadProducts()
    },
    clearSearch() {
      this.keyword = ''
      this.resetAndLoadProducts()
    },
    loadPageStyles() {
      const styles = [
        {
          id: 'bootstrap-css-shopping-product',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        },
        {
          id: 'font-awesome-css-shopping-product',
          href: require('font-awesome/css/font-awesome.min.css')
        },
        {
          id: 'zmdi-css-shopping-product',
          href: require('material-design-iconic-font/dist/css/material-design-iconic-font.min.css')
        },
        {
          id: 'shop-util-css-shopping-product',
          href: require('@/assets/styles/base/util.css')
        },
        {
          id: 'shop-main-css-shopping-product',
          href: require('@/assets/styles/base/main.css')
        }
      ]

      styles.forEach(style => {
        if (document.getElementById(style.id)) return

        const link = document.createElement('link')
        link.id = style.id
        link.rel = 'stylesheet'
        link.href = style.href
        document.head.appendChild(link)
      })
    },
    cleanupPageEffects() {
      [
        'bootstrap-css-shopping-product',
        'font-awesome-css-shopping-product',
        'zmdi-css-shopping-product',
        'shop-util-css-shopping-product',
        'shop-main-css-shopping-product'
      ].forEach(id => {
        const link = document.getElementById(id)
        if (link) link.remove()
      })
      document.body.classList.remove('shopping-product-active')
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      this.backTopVisible = window.pageYOffset > window.innerHeight / 2
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      if (scrollTop + windowHeight >= documentHeight - 100) {
        this.loadProducts()
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    toggleFilter() {
      this.filterVisible = !this.filterVisible
      this.searchVisible = false
    },
    toggleSearch() {
      this.searchVisible = !this.searchVisible
      this.filterVisible = false
    },
    isDateFilterActive(type, value) {
      if (type === 'year') return this.selectedYear === value
      if (type === 'season') return this.selectedSeason === value
      return false
    },
    selectDateFilter(type, value) {
      if (type === 'year') {
        this.selectedYear = value
        return
      }

      if (type === 'season') {
        this.selectedSeason = value
      }
    },
    logout() {
      this.$confirm('Are you sure you want to logout?', 'Logout', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          this.$router.push('/login')
        })
      })
    },
    async removeCartItem(index) {
      const item = this.cart[index]
      try {
        // 调用 itemPick 接口，pickFlag=0 表示取消选择
        await itemPick(item.id, item.remark || '', 0)
        this.cart.splice(index, 1)
        this.$message.success('Item removed from cart')
      } catch (error) {
        console.error('移除购物车商品失败:', error)
        this.$message.error('Failed to remove item from cart')
      }
    },
    async addCart(data) {
      const { product, remark } = data
      // 检查商品是否已在购物车中
      const existingItem = this.cart.find(item => item.id === product.id)
      if (existingItem) {
        this.$message.warning(`${product.itemNo} is already in your cart!`)
        return
      }
      try {
        // 调用 itemPick 接口添加到购物车
        await itemPick(product.id, remark || '', 1)
        // 添加到本地购物车列表
        this.cart.push({
          itemNo: product.itemNo,
          name: product.name || product.itemNo,
          image: product.image,
          remark: remark || '',
          itemLength: product.itemLength,
          itemWidth: product.itemWidth,
          itemHeight: product.itemHeight,
          id: product.id
        })
        this.$message.success(`${product.itemNo} is added to cart !`)
        this.quickProduct = null
      } catch (error) {
        console.error('添加到购物车失败:', error)
        this.$message.error('Failed to add to cart')
      }
    },
    async submitCart() {
      try {
        await submitCart()
        this.cartOpen = false
        this.$message.success('The shopping cart has been submitted!')
      } catch (error) {
        console.error('提交购物车失败:', error)
        this.$message.error('Failed to submit cart')
      }
    },
    async cleanCart() {
      try {
        await cleanCart()
        this.cartOpen = false
        this.$message.success('The shopping cart has been emptied!')
        // 清空本地购物车
        this.cart = []
      } catch (error) {
        console.error('清空购物车失败:', error)
        this.$message.error('Failed to clean cart')
      }
    },
    handleImageError(e) {
      // 图片加载失败时使用默认图片
      e.target.src = require('@/assets/images/huaping.jpg')
    }
  }
}
</script>

<style scoped src="./index.scss" lang="scss"></style>
