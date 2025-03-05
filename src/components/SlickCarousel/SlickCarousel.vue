<template>
  <div>
    <div class="carousel-container">
      <slick ref="slick" :options="slickOptions">
        <div v-for="(image, index) in images" :key="index">
          <a :href="`${image}`" class="image-popup">
            <img :src="`${image}`" :alt="`Image ${index + 1}`">
          </a>
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Slick from 'vue-slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'magnific-popup'
export default {
  components: {
    Slick
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: [],
      slickOptions: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        arrows: true,
        appendArrows: null
      }
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(product) {
        this.images = [product.itemPic]
      }
    }
  },
  mounted() {
    // 初始化 Magnific Popup
    $('.image-popup').magnificPopup({
      type: 'image', // 弹窗类型为图片
      gallery: {
        enabled: true // 启用画廊模式
      }
    })
  }
}

require('magnific-popup/dist/magnific-popup.css')
</script>

<style scoped>
.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.arrows-container {
  text-align: center; /* 箭头容器居中 */
  margin-bottom: 10px; /* 与轮播容器的间距 */
}

img {
  width: 100%;
  height: auto;
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

/* 自定义 Slick 箭头样式 */
.slick-prev,
.slick-next {
  font-size: 24px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.slick-prev:hover,
.slick-next:hover {
  background-color: rgba(255, 255, 255, 1);
}
</style>
