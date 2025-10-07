<template>
  <div class="collection-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">Product Collections</h1>
      <p class="page-description">Discover our carefully curated product collections</p>
    </div>

    <!-- 筛选区域 -->
    <div class="header-section">
      <div class="filter-section">
        <div class="filter-row">
          <div class="filter-title">Year</div>
          <div class="filter-options">
            <div
              class="filter-option filter-option-all"
              :class="{ active: filters.year === null }"
              @click="applyFilter('year', null)"
            >
              All
            </div>
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
        <div class="filter-row">
          <div class="filter-title">Season</div>
          <div class="filter-options">
            <div
              class="filter-option filter-option-all"
              :class="{ active: filters.season === null }"
              @click="applyFilter('season', null)"
            >
              All
            </div>
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
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 导航栏 -->
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

      <!-- 集合网格 -->
      <div class="collections-grid">
        <div
          v-for="item in items"
          :key="item.itemId"
          class="collection-card"
        >
          <div class="collection-image">
            <img
              :src="item.itemPic"
              :alt="item.description"
              @error="handleImageError"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner" />
      <p>Loading...</p>
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && items.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>No Collections</h3>
      <p>There are currently no available product collections</p>
    </div>

    <!-- 没有更多数据提示 -->
    <div v-if="!loading && !hasMore && items.length > 0" class="no-more-data">
      <p>All products loaded</p>
    </div>
  </div>
</template>

<script>
import { getItemShowList } from '@/api/shoppingV2'

export default {
  name: 'CollectionPage',
  data() {
    return {
      // 筛选条件
      filters: {
        year: 2025,
        season: 3
      },
      items: [],
      loading: false,
      hasMore: true,
      currentPage: 1,
      pageSize: 20,
      scrollContainer: null,
      userId: 1 // 默认用户ID，实际应用中应从用户状态获取
    }
  },
  mounted() {
    this.loadItems()
    this.addScrollListener()
  },
  beforeDestroy() {
    this.removeScrollListener()
  },
  methods: {
    // 加载商品数据
    async loadItems() {
      if (this.loading || !this.hasMore) {
        return
      }

      this.loading = true

      try {
        const requestData = {
          userId: this.userId,
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          year: this.filters.year, // 年份筛选
          season: this.filters.season // 季度筛选
        }

        console.log('加载商品数据，请求参数:', requestData)

        const response = await getItemShowList(requestData)

        console.log('API响应:', response)

        if (response && response.itemList) {
          const newItems = response.itemList

          if (this.currentPage === 1) {
            this.items = newItems
          } else {
            this.items = [...this.items, ...newItems]
          }

          // 判断是否还有更多数据
          this.hasMore = newItems.length === this.pageSize

          console.log(`第${this.currentPage}页加载完成，新增${newItems.length}个商品，总计${this.items.length}个商品`)
        } else {
          console.warn('API响应格式异常:', response)
          this.hasMore = false
        }
      } catch (error) {
        console.error('加载商品数据失败:', error)
        this.hasMore = false
      } finally {
        this.loading = false
      }
    },

    // 应用筛选条件
    applyFilter(type, value) {
      this.filters[type] = value
      this.currentPage = 1
      this.items = [] // 清空当前商品列表
      this.hasMore = true // 重置分页状态
      this.loadItems()
    },

    // 图片加载失败处理
    handleImageError(event) {
      console.log('图片加载失败')
      // 设置默认图片
      event.target.src = 'https://picsum.photos/300/200?random=' + Math.floor(Math.random() * 1000)
    },

    // 添加滚动监听
    addScrollListener() {
      console.log('开始添加滚动监听...')

      // 由于页面隐藏了系统布局，主要滚动容器变成了.main-container
      const mainContainer = document.querySelector('.main-container')
      const appMain = document.querySelector('.app-main')

      console.log('容器检查:', {
        mainContainer: !!mainContainer,
        appMain: !!appMain
      })

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
        currentPage: this.currentPage
      })

      if (isNearBottom && !this.loading && this.hasMore) {
        console.log('触发加载下一页:', this.currentPage + 1)
        this.currentPage++
        this.loadItems()
      }
    }
  }
}
</script>

<style scoped>
.collection-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
  position: relative;
  box-sizing: border-box;
}

/* 主要内容区域 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 右上角导航链接 */
.top-navigation {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px; /* 与商品区域宽度一致 */
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  z-index: 1000;
  padding: 10px 0;
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

/* 页面标题 */
.page-header {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.page-description {
  font-size: 16px;
  color: #666;
  margin: 0;
  text-align: center;
}

/* 集合网格 */
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.collection-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.collection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.collection-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.collection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-card:hover .collection-image img {
  transform: scale(1.05);
}

.collection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.product-count {
  color: white;
  font-size: 14px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.collection-info {
  padding: 20px;
}

.collection-title {
  font-size: 20px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.collection-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.collection-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collection-category {
  background: #ff6900;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.collection-date {
  font-size: 12px;
  color: #999;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff6900;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 16px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
  font-size: 16px;
}

/* 没有更多数据提示 */
.no-more-data {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
}

.no-more-data p {
  margin: 0;
}

/* 筛选区域样式 */
.header-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 1160px;
  margin: 0 auto 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 0;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
  min-width: 60px;
  flex-shrink: 0;
}

.filter-options {
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10px;
  }

  .page-title h1 {
    font-size: 24px;
  }

  .top-navigation {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px); /* 移动端适配屏幕宽度 */
    justify-content: flex-end;
    padding: 10px 20px;
  }

  .header-section {
    text-align: center;
  }
}
</style>
