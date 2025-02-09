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
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="3">
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
          <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="23">
            <i class="zmdi zmdi-shopping-cart" />
          </div>
        </div>

      </div>

    </header>

    <!-- Cart -->
    <div class="wrap-header-cart js-panel-cart">
      <div class="s-full js-hide-cart" />

      <div class="header-cart flex-col-l p-l-65 p-r-25">
        <div class="header-cart-title flex-w flex-sb-m p-b-8">
          <span class="mtext-103 cl2">
            Your Cart
          </span>

          <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
            <i class="zmdi zmdi-close" />
          </div>
        </div>

        <div class="header-cart-content flex-w js-pscroll">
          <ul class="header-cart-wrapitem w-full">
            <li class="header-cart-item flex-w flex-t m-b-12">
              <div class="header-cart-item-img">
                <img :src="pd01" alt="IMG">
              </div>

              <div class="header-cart-item-txt p-t-8">
                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                  White Shirt Pleat
                </a>

                <span class="header-cart-item-info">
                  1 x $19.00
                </span>
              </div>
            </li>

            <li class="header-cart-item flex-w flex-t m-b-12">
              <div class="header-cart-item-img">
                <img :src="pd02" alt="IMG">
              </div>

              <div class="header-cart-item-txt p-t-8">
                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                  Converse All Star
                </a>

                <span class="header-cart-item-info">
                  1 x $39.00
                </span>
              </div>
            </li>

            <li class="header-cart-item flex-w flex-t m-b-12">
              <div class="header-cart-item-img">
                <img :src="pd03" alt="IMG">
              </div>

              <div class="header-cart-item-txt p-t-8">
                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                  Nixon Porter Leather
                </a>

                <span class="header-cart-item-info">
                  1 x $17.00
                </span>
              </div>
            </li>
          </ul>

          <div class="w-full">
            <div class="header-cart-buttons flex-w w-full">
              <div class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product -->
    <div class="bg0 m-t-23 p-b-140">
      <div class="container">
        <div class="flex-w flex-sb-m p-b-52">
          <div class="flex-w flex-l-m filter-tope-group m-tb-10">
            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
              All Products
            </button>

            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women">
              Women
            </button>

            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".men">
              Men
            </button>

            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".bag">
              Bag
            </button>

            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".shoes">
              Shoes
            </button>

            <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".watches">
              Watches
            </button>
          </div>

          <div class="flex-w flex-c-m m-tb-10">
            <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
              <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
              <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
              Search
            </div>
          </div>

          <!-- Search product -->
          <div class="dis-none panel-search w-full p-t-10 p-b-15">
            <div class="bor8 dis-flex p-l-15">
              <button class="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                <i class="zmdi zmdi-search" />
              </button>

              <input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Please enter the product name">
            </div>
          </div>

        </div>

        <div class="row isotope-grid">
          <div v-for="(image, index) in images" :key="index" class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
            <!-- Block2 -->
            <div class="block2">
              <div class="block2-pic hov-img0">
                <img :src="image" :alt="'IMG-PRODUCT'+index">

                <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                  Quick View
                </a>
              </div>

              <div class="block2-txt flex-w flex-t p-t-14">
                <div class="block2-txt-child1 flex-col-l ">
                  <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    Esprit Ruffle Shirt
                  </a>

                  <span class="stext-105 cl3">
                    $16.64
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <div class="flex-c-m flex-w w-full p-t-45">
          <a href="#" class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
            Load More
          </a>
        </div>
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

    <!-- Modal1 -->
    <div class="wrap-modal1 js-modal1 p-t-60 p-b-20">
      <div class="overlay-modal1 js-hide-modal1" />

      <div class="container">
        <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
          <button class="how-pos3 hov3 trans-04 js-hide-modal1">
            <img :src="close" alt="CLOSE">
          </button>

          <div class="row">
            <div class="col-md-6 col-lg-7 p-b-30">
              <div class="p-l-25 p-r-30 p-lr-0-lg">
                <div class="wrap-slick3 flex-sb flex-w">
                  <div class="wrap-slick3-dots" />
                  <div class="wrap-slick3-arrows flex-sb-m flex-w" />

                  <div class="slick3 gallery-lb">
                    <div class="item-slick3">
                      <div class="wrap-pic-w pos-relative">
                        <img :src="pd01" alt="IMG-PRODUCT">

                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" :href="pd01">
                          <i class="fa fa-expand" />
                        </a>
                      </div>
                    </div>

                    <div class="item-slick3">
                      <div class="wrap-pic-w pos-relative">
                        <img :src="pd02" alt="IMG-PRODUCT">

                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" :href="pd02">
                          <i class="fa fa-expand" />
                        </a>
                      </div>
                    </div>

                    <div class="item-slick3">
                      <div class="wrap-pic-w pos-relative">
                        <img :src="pd03" alt="IMG-PRODUCT">

                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" :href="pd03">
                          <i class="fa fa-expand" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-5 p-b-30">
              <div class="p-r-50 p-t-5 p-lr-0-lg">
                <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                  Lightweight Jacket
                </h4>

                <span class="mtext-106 cl2">
                  $58.79
                </span>

                <p class="stext-102 cl3 p-t-23">
                  Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                </p>

                <!--  -->
                <div class="p-t-33">
                  <div class="flex-w flex-r-m p-b-10">
                    <div class="panel-search w-full p-t-10 p-b-15">
                      <div class="bor8 dis-flex p-l-15">
                        <textarea class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Please describe your requirements for this product" />
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">

                      <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
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

  </body>
</template>

<script>

import $ from 'jquery'
import 'select2'
import 'animsition'
import 'magnific-popup'
import 'slick-carousel'
import Isotope from 'isotope-layout'
import logo from '@/assets/images/icons/logo.png'
import heart01 from '@/assets/images/icons/icon-heart-01.png'
import heart02 from '@/assets/images/icons/icon-heart-02.png'
import pd01 from '@/assets/images/product-detail-01.jpg'
import pd02 from '@/assets/images/product-detail-02.jpg'
import pd03 from '@/assets/images/product-detail-03.jpg'
import close from '@/assets/images/icons/icon-close.png'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  data() {
    return {
      logo: logo,
      heart01: heart01,
      heart02: heart02,
      pd01: pd01,
      pd02: pd02,
      pd03: pd03,
      close: close,
      images: [
        'http://8.130.87.100:8009/images/product-01.jpg', 'http://8.130.87.100:8009/images/product-02.jpg', 'http://8.130.87.100:8009/images/product-03.jpg', 'http://8.130.87.100:8009/images/product-04.jpg',
        'http://8.130.87.100:8009/images/product-05.jpg', 'http://8.130.87.100:8009/images/product-06.jpg', 'http://8.130.87.100:8009/images/product-07.jpg', 'http://8.130.87.100:8009/images/product-08.jpg',
        'http://8.130.87.100:8009/images/product-09.jpg', 'http://8.130.87.100:8009/images/product-10.jpg', 'http://8.130.87.100:8009/images/product-11.jpg', 'http://8.130.87.100:8009/images/product-12.jpg',
        'http://8.130.87.100:8009/images/product-13.jpg', 'http://8.130.87.100:8009/images/product-14.jpg', 'http://8.130.87.100:8009/images/product-15.jpg', 'http://8.130.87.100:8009/images/product-16.jpg'
      ],
      items: [
        // 数据示例
        { id: 1, category: 'red', content: 'Item 1' },
        { id: 2, category: 'blue', content: 'Item 2' }
      ]
    }
  },
  // JS逻辑
  mounted() {
    this.backToTop()

    this.initIsotope()

    this.searchProduct()

    this.showHideCart()

    this.quickView()
  },
  methods: {
    /* [ 初始化Isotope ]
    ===========================================================*/
    async initIsotope() {
      // 1.获取 isotope 导航条
      const navbar = await document.querySelector('.filter-tope-group')

      const isotope = await new Isotope('.isotope-grid', {
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows',
        percentPosition: true,
        animationEngine: 'best-available',
        masonry: {
          columnWidth: '.isotope-item'
        }
      })

      // 3.为导航条注册点击事件
      navbar.addEventListener('click', (e) => {
        const { target } = e
        const filterOption = target.getAttribute('data-filter') // 筛选的类别
        if (filterOption) {
          // 给元素移除 actived 样式
          navbar.querySelectorAll('span')
            .forEach(
              (btn) => btn.classList.remove('actived')
            )
          // 给目标元素加上 actived 样式
          target.classList.add('actived')
          // 筛选
          isotope.arrange({ filter: filterOption })
        }
      })

      const isotopeButton = $('.filter-tope-group button')
      $(isotopeButton).each(function() {
        $(this).on('click', function() {
          for (let i = 0; i < isotopeButton.length; i++) {
            $(isotopeButton[i]).removeClass('how-active1')
          }
          $(this).addClass('how-active1')
        })
      })
    },
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
      [ Filter / Search product ]*/
    searchProduct() {
      $('.js-show-filter').on('click', function() {
        $(this).toggleClass('show-filter')
        $('.panel-filter').slideToggle(400)

        if ($('.js-show-search').hasClass('show-search')) {
          $('.js-show-search').removeClass('show-search')
          $('.panel-search').slideUp(400)
        }
      })

      $('.js-show-search').on('click', function() {
        $(this).toggleClass('show-search')
        $('.panel-search').slideToggle(400)

        if ($('.js-show-filter').hasClass('show-filter')) {
          $('.js-show-filter').removeClass('show-filter')
          $('.panel-filter').slideUp(400)
        }
      })
    },

    /* ==================================================================
      [ Cart ]*/
    showHideCart() {
      $('.js-show-cart').on('click', function() {
        $('.js-panel-cart').addClass('show-header-cart')
      })

      $('.js-hide-cart').on('click', function() {
        $('.js-panel-cart').removeClass('show-header-cart')
      })
    },

    /* ==================================================================
     [ Quick View ]*/
    quickView() {
      /* ==================================================================
      [ Show modal1 ]*/
      $('.js-show-modal1').on('click', function(e) {
        e.preventDefault()
        $('.js-modal1').addClass('show-modal1')
      })

      $('.js-hide-modal1').on('click', function() {
        $('.js-modal1').removeClass('show-modal1')
      })

      /* ==================================================================
            [ Slick3 ]*/
      $('.wrap-slick3').each(function() {
        $(this).find('.slick3').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 6000,

          arrows: true,
          appendArrows: $(this).find('.wrap-slick3-arrows'),
          prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',

          dots: true,
          appendDots: $(this).find('.wrap-slick3-dots'),
          dotsClass: 'slick3-dots',
          customPaging: function(slick, index) {
            const portrait = $(slick.$slides[index]).find('img').attr('src')
            return '<img src=" ' + portrait + ' " alt=""/><div class="slick3-dot-overlay"></div>'
          }
        })
      })

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

      $('.gallery-lb').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
          delegate: 'a', // the selector for gallery item
          type: 'image',
          gallery: {
            enabled: true
          },
          mainClass: 'mfp-fade'
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

<style scoped>
  *::placeholder {
    color: rgb(128, 128, 128);
  }
</style>
