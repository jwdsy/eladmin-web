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
              <img :src="logo" alt="IMG-LOGO">
            </a>

            Menu desktop
            <div class="menu-desktop">
              <ul class="main-menu">
                <li>
                  <a href="index.html">Home</a>
                  <ul class="sub-menu">
                    <li><a href="index.html">Homepage 1</a></li>
                    <li><a href="home-02.html">Homepage 2</a></li>
                    <li><a href="home-03.html">Homepage 3</a></li>
                  </ul>
                </li>
              </ul>
            </div>

            <!-- Icon header -->
            <div class="wrap-icon-header flex-w flex-r-m">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="2">
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
          <a href="index.html"><img :src="logo" alt="IMG-LOGO"></a>
        </div>

        <!-- Icon header -->
        <div class="wrap-icon-header flex-w flex-r-m m-r-15">
          <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="2">
            <i class="zmdi zmdi-shopping-cart" />
          </div>
        </div>

        <!-- Button show menu -->
        <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span class="hamburger-box">
            <span class="hamburger-inner" />
          </span>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div class="menu-mobile">
        <ul class="main-menu-m">
          <li>
            <a href="index.html">Home</a>
            <ul class="sub-menu-m">
              <li><a href="index.html">Homepage 1</a></li>
              <li><a href="home-02.html">Homepage 2</a></li>
              <li><a href="home-03.html">Homepage 3</a></li>
            </ul>
            <span class="arrow-main-menu-m">
              <i class="fa fa-angle-right" aria-hidden="true" />
            </span>
          </li>

        </ul>
      </div>

      <!-- Modal Search -->
      <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div class="container-search-header">
          <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="images/icons/icon-close2.png" alt="CLOSE">
          </button>

          <form class="wrap-search-header flex-w p-l-15">
            <button class="flex-c-m trans-04">
              <i class="zmdi zmdi-search" />
            </button>
            <input class="plh3" type="text" name="search" placeholder="Search...">
          </form>
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
                <img src="images/item-cart-01.jpg" alt="IMG">
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
                <img src="images/item-cart-02.jpg" alt="IMG">
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
                <img src="images/item-cart-03.jpg" alt="IMG">
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
            <div class="header-cart-total w-full p-tb-40">
              Total: $75.00
            </div>

            <div class="header-cart-buttons flex-w w-full">
              <a href="shoping-cart.html" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                View Cart
              </a>

              <a href="shoping-cart.html" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
                Check Out
              </a>
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

              <input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search">
            </div>
          </div>

        </div>

        <div ref="isotopeContainer" class="row isotope-grid">
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
                    <div class="item-slick3" :data-thumb="pd01">
                      <div class="wrap-pic-w pos-relative">
                        <img :src="pd01" alt="IMG-PRODUCT">

                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" :href="pd01">
                          <i class="fa fa-expand" />
                        </a>
                      </div>
                    </div>

                    <div class="item-slick3" :data-thumb="pd02">
                      <div class="wrap-pic-w pos-relative">
                        <img :src="pd02" alt="IMG-PRODUCT">

                        <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" :href="pd02">
                          <i class="fa fa-expand" />
                        </a>
                      </div>
                    </div>

                    <div class="item-slick3" :data-thumb="pd03">
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
                    <div class="size-203 flex-c-m respon6">
                      Size
                    </div>

                    <div class="size-204 respon6-next">
                      <div class="rs1-select2 bor8 bg0">
                        <select class="js-select2" name="time">
                          <option>Choose an option</option>
                          <option>Size S</option>
                          <option>Size M</option>
                          <option>Size L</option>
                          <option>Size XL</option>
                        </select>
                        <div class="dropDownSelect2" />
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-203 flex-c-m respon6">
                      Color
                    </div>

                    <div class="size-204 respon6-next">
                      <div class="rs1-select2 bor8 bg0">
                        <select class="js-select2" name="time">
                          <option>Choose an option</option>
                          <option>Red</option>
                          <option>Blue</option>
                          <option>White</option>
                          <option>Grey</option>
                        </select>
                        <div class="dropDownSelect2" />
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">
                      <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                          <i class="fs-16 zmdi zmdi-minus" />
                        </div>

                        <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1">

                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                          <i class="fs-16 zmdi zmdi-plus" />
                        </div>
                      </div>

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

  <!--===============================================================================================-->
    <!--  <script src="vendor/jquery/jquery-3.2.1.min.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/animsition/js/animsition.min.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/bootstrap/js/popper.js"></script>-->
    <!--  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/select2/select2.min.js"></script>-->
    <!--  <script>-->
    <!--    $(".js-select2").each(function(){-->
    <!--      $(this).select2({-->
    <!--        minimumResultsForSearch: 20,-->
    <!--        dropdownParent: $(this).next('.dropDownSelect2')-->
    <!--      });-->
    <!--    })-->
    <!--  </script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/daterangepicker/moment.min.js"></script>-->
    <!--  <script src="vendor/daterangepicker/daterangepicker.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/slick/slick.min.js"></script>-->
    <!--  <script src="api/shopping/slick-custom.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/parallax100/parallax100.js"></script>-->
    <!--  <script>-->
    <!--    $('.parallax100').parallax100();-->
    <!--  </script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/MagnificPopup/jquery.magnific-popup.min.js"></script>-->
    <!--  <script>-->
    <!--    $('.gallery-lb').each(function() { // the containers for all your galleries-->
    <!--      $(this).magnificPopup({-->
    <!--        delegate: 'a', // the selector for gallery item-->
    <!--        type: 'image',-->
    <!--        gallery: {-->
    <!--          enabled:true-->
    <!--        },-->
    <!--        mainClass: 'mfp-fade'-->
    <!--      });-->
    <!--    });-->
    <!--  </script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/isotope/isotope.pkgd.min.js"></script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/sweetalert/sweetalert.min.js"></script>-->
    <!--  <script>-->
    <!--    $('.js-addwish-b2, .js-addwish-detail').on('click', function(e){-->
    <!--      e.preventDefault();-->
    <!--    });-->

    <!--    $('.js-addwish-b2').each(function(){-->
    <!--      var nameProduct = $(this).parent().parent().find('.js-name-b2').html();-->
    <!--      $(this).on('click', function(){-->
    <!--        swal(nameProduct, "is added to wishlist !", "success");-->

    <!--        $(this).addClass('js-addedwish-b2');-->
    <!--        $(this).off('click');-->
    <!--      });-->
    <!--    });-->

    <!--    $('.js-addwish-detail').each(function(){-->
    <!--      var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();-->

    <!--      $(this).on('click', function(){-->
    <!--        swal(nameProduct, "is added to wishlist !", "success");-->

    <!--        $(this).addClass('js-addedwish-detail');-->
    <!--        $(this).off('click');-->
    <!--      });-->
    <!--    });-->

    <!--    /*-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*/-->

    <!--    $('.js-addcart-detail').each(function(){-->
    <!--      var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();-->
    <!--      $(this).on('click', function(){-->
    <!--        swal(nameProduct, "is added to cart !", "success");-->
    <!--      });-->
    <!--    });-->

    <!--  </script>-->
  <!--===============================================================================================-->
    <!--  <script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>-->
    <!--  <script>-->
    <!--    import PerfectScrollbar from "perfect-scrollbar";-->

    <!--    $('.js-pscroll').each(function(){-->
    <!--      $(this).css('position','relative');-->
    <!--      $(this).css('overflow','hidden');-->
    <!--      var ps = new PerfectScrollbar(this, {-->
    <!--        wheelSpeed: 1,-->
    <!--        scrollingThreshold: 1000,-->
    <!--        wheelPropagation: false,-->
    <!--      });-->

    <!--      $(window).on('resize', function(){-->
    <!--        ps.update();-->
    <!--      })-->
    <!--    });-->
    <!--  </script>-->
  <!--===============================================================================================-->
    <!--  <script src="api/shopping/main.js"></script>-->

  </body>
</template>

<script>

// import '@/api/shopping/main'
// import '@/api/shopping/slick-custom'
import $ from 'jquery'
import 'select2'
import 'animsition'
import 'magnific-popup'
import 'slick-carousel'
import Isotope from 'isotope-layout'
import '@/api/shopping/main'
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
      isotope: null,
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
    // 初始化代码
    /* [ Back to top ]
      ===========================================================*/
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

    /* ==================================================================
      [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop')
    var wrapMenu = $('.wrap-menu-desktop')

    var posWrapHeader
    if ($('.top-bar').length > 0) {
      posWrapHeader = $('.top-bar').height()
    } else {
      posWrapHeader = 0
    }

    if ($(window).scrollTop() > posWrapHeader) {
      $(headerDesktop).addClass('fix-menu-desktop')
      $(wrapMenu).css('top', 0)
    } else {
      $(headerDesktop).removeClass('fix-menu-desktop')
      $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop())
    }

    $(window).on('scroll', function() {
      if ($(this).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop')
        $(wrapMenu).css('top', 0)
      } else {
        $(headerDesktop).removeClass('fix-menu-desktop')
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop())
      }
    })

    /* ==================================================================
      [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function() {
      $(this).toggleClass('is-active')
      $('.menu-mobile').slideToggle()
    })

    var arrowMainMenu = $('.arrow-main-menu-m')

    for (var i = 0; i < arrowMainMenu.length; i++) {
      $(arrowMainMenu[i]).on('click', function() {
        $(this).parent().find('.sub-menu-m').slideToggle()
        $(this).toggleClass('turn-arrow-main-menu-m')
      })
    }

    $(window).resize(function() {
      if ($(window).width() >= 992) {
        if ($('.menu-mobile').css('display') === 'block') {
          $('.menu-mobile').css('display', 'none')
          $('.btn-show-menu-mobile').toggleClass('is-active')
        }

        $('.sub-menu-m').each(function() {
          if ($(this).css('display') === 'block') {
            console.log('hello')
            $(this).css('display', 'none')
            $(arrowMainMenu).removeClass('turn-arrow-main-menu-m')
          }
        })
      }
    })

    /* ==================================================================
      [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function() {
      $('.modal-search-header').addClass('show-modal-search')
      $(this).css('opacity', '0')
    })

    $('.js-hide-modal-search').on('click', function() {
      $('.modal-search-header').removeClass('show-modal-search')
      $('.js-show-modal-search').css('opacity', '1')
    })

    $('.container-search-header').on('click', function(e) {
      e.stopPropagation()
    })

    /* ==================================================================
      [ Isotope ]*/
    var $topeContainer = $('.isotope-grid')
    $(this).isotope = new Isotope(this.$refs.isotopeContainer, {
      // Isotope选项
    })
    var $filter = $('.filter-tope-group')

    // filter items on button click
    $filter.each(function() {
      $filter.on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter')
        $topeContainer.isotope({ filter: filterValue })
      })
    })
    this.initIsotope()
    // init Isotope
    // $(window).on('load', function() {
    //   $topeContainer.each(function() {
    //     $(this).isotope({
    //       itemSelector: '.isotope-item',
    //       layoutMode: 'fitRows',
    //       percentPosition: true,
    //       animationEngine: 'best-available',
    //       masonry: {
    //         columnWidth: '.isotope-item'
    //       }
    //     })
    //   })
    // })

    var isotopeButton = $('.filter-tope-group button')

    $(isotopeButton).each(function() {
      $(this).on('click', function() {
        for (var i = 0; i < isotopeButton.length; i++) {
          $(isotopeButton[i]).removeClass('how-active1')
        }

        $(this).addClass('how-active1')
      })
    })

    /* ==================================================================
      [ Filter / Search product ]*/
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

    /* ==================================================================
      [ select2 ]*/
    $('.js-select2').each(function() {
      $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
      })
    })

    /* ==================================================================
      [ Cart ]*/
    $('.js-show-cart').on('click', function() {
      $('.js-panel-cart').addClass('show-header-cart')
    })

    $('.js-hide-cart').on('click', function() {
      $('.js-panel-cart').removeClass('show-header-cart')
    })

    /* ==================================================================
      [ Cart ]*/
    $('.js-show-sidebar').on('click', function() {
      $('.js-sidebar').addClass('show-sidebar')
    })

    $('.js-hide-sidebar').on('click', function() {
      $('.js-sidebar').removeClass('show-sidebar')
    })

    /* ==================================================================
      [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function() {
      var numProduct = Number($(this).next().val())
      if (numProduct > 0) $(this).next().val(numProduct - 1)
    })

    $('.btn-num-product-up').on('click', function() {
      var numProduct = Number($(this).prev().val())
      $(this).prev().val(numProduct + 1)
    })

    /* ==================================================================
      [ Rating ]*/
    $('.wrap-rating').each(function() {
      var item = $(this).find('.item-rating')
      var rated = -1
      var input = $(this).find('input')
      $(input).val(0)

      $(item).on('mouseenter', function() {
        var index = item.index(this)
        var i = 0
        for (i = 0; i <= index; i++) {
          $(item[i]).removeClass('zmdi-star-outline')
          $(item[i]).addClass('zmdi-star')
        }

        for (var j = i; j < item.length; j++) {
          $(item[j]).addClass('zmdi-star-outline')
          $(item[j]).removeClass('zmdi-star')
        }
      })

      $(item).on('click', function() {
        var index = item.index(this)
        rated = index
        $(input).val(index + 1)
      })

      $(this).on('mouseleave', function() {
        var i = 0
        for (i = 0; i <= rated; i++) {
          $(item[i]).removeClass('zmdi-star-outline')
          $(item[i]).addClass('zmdi-star')
        }

        for (var j = i; j < item.length; j++) {
          $(item[j]).addClass('zmdi-star-outline')
          $(item[j]).removeClass('zmdi-star')
        }
      })
    })

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
        [ Slick1 ]*/
    $('.wrap-slick1').each(function() {
      var wrapSlick1 = $(this)
      var slick1 = $(this).find('.slick1')

      var itemSlick1 = $(slick1).find('.item-slick1')
      var layerSlick1 = $(slick1).find('.layer-slick1')
      var actionSlick1 = []

      $(slick1).on('init', function() {
        var layerCurrentItem = $(itemSlick1[0]).find('.layer-slick1')

        for (var i = 0; i < actionSlick1.length; i++) {
          clearTimeout(actionSlick1[i])
        }

        $(layerSlick1).each(function() {
          $(this).removeClass($(this).data('appear') + ' visible-true')
        })

        for (var j = 0; j < layerCurrentItem.length; j++) {
          actionSlick1[j] = setTimeout(function(index) {
            $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true')
          }, $(layerCurrentItem[j]).data('delay'), j)
        }
      })

      var showDot = false
      if ($(wrapSlick1).find('.wrap-slick1-dots').length > 0) {
        showDot = true
      }

      $(slick1).slick({
        pauseOnFocus: false,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1000,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        appendArrows: $(wrapSlick1),
        prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
        nextArrow: '<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
        dots: showDot,
        appendDots: $(wrapSlick1).find('.wrap-slick1-dots'),
        dotsClass: 'slick1-dots',
        customPaging: function(slick, index) {
          var linkThumb = $(slick.$slides[index]).data('thumb')
          var caption = $(slick.$slides[index]).data('caption')
          return '<img src="' + linkThumb + '">' +
            '<span class="caption-dots-slick1">' + caption + '</span>'
        }
      })

      $(slick1).on('afterChange', function(event, slick, currentSlide) {
        var layerCurrentItem = $(itemSlick1[currentSlide]).find('.layer-slick1')

        for (var i = 0; i < actionSlick1.length; i++) {
          clearTimeout(actionSlick1[i])
        }

        $(layerSlick1).each(function() {
          $(this).removeClass($(this).data('appear') + ' visible-true')
        })

        for (var j = 0; j < layerCurrentItem.length; j++) {
          actionSlick1[j] = setTimeout(function(index) {
            $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true')
          }, $(layerCurrentItem[j]).data('delay'), j)
        }
      })
    })

    /* ==================================================================
          [ Slick2 ]*/
    $('.wrap-slick2').each(function() {
      $(this).find('.slick2').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 6000,
        arrows: true,
        appendArrows: $(this),
        prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      })
    })

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      var nameTab = $(e.target).attr('href')
      $(nameTab).find('.slick2').slick('reinit')
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
          var portrait = $(slick.$slides[index]).data('thumb')
          debugger
          return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>'
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
  },
  beforeDestroy() {
    // 销毁Isotope实例
    if (this.isotope) {
      this.isotope.destroy()
    }
  },
  methods: {
    initIsotope() {
      this.isotope = new Isotope(this.$refs.isotopeContainer, {
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows',
        percentPosition: true,
        animationEngine: 'best-available',
        masonry: {
          columnWidth: '.isotope-item'
        }
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

<!--// <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="fonts/linearicons-v1.0.0/icon-font.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/slick/slick.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/MagnificPopup/magnific-popup.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">==-->
<!--// <link rel="stylesheet" type="text/css" href="css/util.css">-->
<!--// <link rel="stylesheet" type="text/css" href="css/main.css">-->
<style scoped>
</style>
