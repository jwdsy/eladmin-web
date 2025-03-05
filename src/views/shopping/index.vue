<template>
  <body>

    <!-- Header -->
    <header class="header-v4">
      <!-- Header desktop -->
      <div class="container-menu-desktop">

        <div class="wrap-menu-desktop how-shadow1">
          <nav class="limiter-menu-desktop container">

            <!-- Logo desktop -->
            <a href="#" class="logo">
              <img :src="logo" alt="IMG-LOGO" style="padding: 20px 10px 20px 0px;">
            </a>

            <!-- Icon header -->
            <div class="wrap-icon-header flex-w flex-r-m">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" :data-notify="`${pickProducts.length}`" @click="showCart">
                <i class="zmdi zmdi-shopping-cart" />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Header Mobile -->
      <div class="wrap-header-mobile">
        <!-- Logo moblie -->
        <div class="logo-mobile">
          <a href="/shopping/index"><img :src="logo" alt="IMG-LOGO"></a>
        </div>

        <!-- Icon header -->
        <div class="wrap-icon-header flex-w flex-r-m m-r-15">
          <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" :data-notify="`${pickProducts.length}`" @click="showCart">
            <i class="zmdi zmdi-shopping-cart" />
          </div>
        </div>

      </div>

    </header>

    <!-- Cart -->
    <div class="wrap-header-cart js-panel-cart">
      <div class="s-full js-hide-cart" @click="hideCart" />

      <div class="header-cart flex-col-l p-l-65 p-r-25">
        <div class="header-cart-title flex-w flex-sb-m p-b-8">
          <span class="mtext-103 cl2">
            Your Cart
          </span>

          <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart" @click="hideCart">
            <i class="zmdi zmdi-close" />
          </div>
        </div>

        <div class="header-cart-content flex-w js-pscroll">
          <ul class="header-cart-wrapitem w-full">
            <li v-for="(product, index) in pickProducts" :key="index" class="header-cart-item flex-w flex-t m-b-12">
              <div class="header-cart-item-img">
                <img :src="`${product.itemPic}`" alt="IMG">
              </div>

              <div class="header-cart-item-txt p-t-8">
                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                  {{ product.itemNo }}
                </a>

                <span class="header-cart-item-info">
                  L:{{ product.itemLength }} * W:{{ product.itemWidth }} * H:{{ product.itemHeight }}
                </span>
              </div>
            </li>
          </ul>

          <div class="w-full">
            <div class="header-cart-buttons flex-w w-full">
              <div class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10 pointer" @click="submitCart">
                Submit
              </div>
              <div class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10 pointer" @click="cleanCart">
                Clean
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product -->
    <div class="bg0 m-t-23 p-b-140">
      <div class="container">
        <IsotopeGrid />
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg3 p-t-75 p-b-32">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Categories
            </h4>

            <ul>
              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Women
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Men
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Shoes
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Watches
                </a>
              </li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Help
            </h4>

            <ul>
              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Track Order
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Returns
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  Shipping
                </a>
              </li>

              <li class="p-b-10">
                <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              GET IN TOUCH
            </h4>

            <p class="stext-107 cl7 size-201">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>

            <div class="p-t-27">
              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-facebook" />
              </a>

              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-instagram" />
              </a>

              <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                <i class="fa fa-pinterest-p" />
              </a>
            </div>
          </div>

          <div class="col-sm-6 col-lg-3 p-b-50">
            <h4 class="stext-301 cl0 p-b-30">
              Newsletter
            </h4>

            <form>
              <div class="wrap-input1 w-full p-b-4">
                <input class="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="email@example.com">
                <div class="focus-input1 trans-04" />
              </div>

              <div class="p-t-18">
                <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </footer>

    <!-- Back to top -->
    <div id="myBtn" class="btn-back-to-top">
      <span class="symbol-btn-back-to-top">
        <i class="zmdi zmdi-chevron-up" />
      </span>
    </div>

  </body>
</template>

<script>

import $ from 'jquery'
import 'select2'
import 'animsition'
import 'magnific-popup'
import 'slick-carousel'
import logo from '@/assets/images/icons/logo.png'
import heart01 from '@/assets/images/icons/icon-heart-01.png'
import heart02 from '@/assets/images/icons/icon-heart-02.png'
import close from '@/assets/images/icons/icon-close.png'
import PerfectScrollbar from 'perfect-scrollbar'
import shoppingApi from '@/api/shopping'
import IsotopeGrid from '@/components/IsotopeGrid/IsotopeGrid.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    IsotopeGrid
  },
  data() {
    return {
      logo: logo,
      heart01: heart01,
      heart02: heart02,
      close: close,
      labels: [],
      pickProducts: []
    }
  },
  // JS逻辑
  mounted() {
    this.queryPickProduct()

    this.backToTop()
  },
  methods: {
    /* [ 返回顶部 ]
    ===========================================================*/
    backToTop() {
      var windowH = $(window).height() / 2

      $(window).on('scroll', function() {
        if ($(this).scrollTop() > windowH) {
          $('#myBtn').css('display', 'flex')
        } else {
          $('#myBtn').css('display', 'none')
        }
      })

      $('#myBtn').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 300)
      })
    },

    /* ==================================================================
      [ Cart ]*/
    hideCart() {
      $('.js-panel-cart').removeClass('show-header-cart')
    },
    showCart() {
      this.queryPickProduct()

      $('.js-panel-cart').addClass('show-header-cart')

      $('.js-pscroll').each(function() {
        $(this).css('position', 'relative')
        $(this).css('overflow', 'hidden')
        var ps = new PerfectScrollbar(this, {
          wheelSpeed: 1,
          scrollingThreshold: 1000,
          wheelPropagation: false
        })

        $(window).on('resize', function() {
          ps.update()
        })
      })
    },
    queryPickProduct() {
      shoppingApi.queryPicProduct().then(res => {
        this.pickProducts = res.itemList
      })
    },
    submitCart() {
      $('.js-panel-cart').removeClass('show-header-cart')
      shoppingApi.submitCart().then(res => {
        Swal.fire({
          text: 'The shopping cart has been submitted !',
          icon: 'success',
          timer: 300000, // 动态设置关闭时间
          timerProgressBar: true, // 显示进度条
          showConfirmButton: false // 隐藏确认按钮
        })
      })
    },
    cleanCart() {
      $('.js-panel-cart').removeClass('show-header-cart')
      shoppingApi.cleanCart().then(res => {
        Swal.fire({
          text: 'The shopping cart has been emptied !',
          icon: 'success',
          timer: 3000, // 动态设置关闭时间
          timerProgressBar: true, // 显示进度条
          showConfirmButton: false // 隐藏确认按钮
        })
      })
    }
  }
}

require('bootstrap/dist/css/bootstrap.min.css')
require('font-awesome/css/font-awesome.min.css')
require('material-design-iconic-font/dist/css/material-design-iconic-font.min.css')
require('linearicons/dist/web-font/style.css')
require('animate.css/animate.css')
require('hamburgers/dist/hamburgers.min.css')
require('animsition/dist/css/animsition.min.css')
require('select2/dist/css/select2.min.css')
require('@/assets/styles/base/slick.scss')
require('magnific-popup/dist/magnific-popup.css')
require('perfect-scrollbar/css/perfect-scrollbar.css')
require('@/assets/styles/base/util.css')
require('@/assets/styles/base/main.css')
</script>
