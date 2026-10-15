<template>
  <header class="header-v4">
    <div class="container-menu-desktop">
      <div class="wrap-menu-desktop how-shadow1">
        <nav class="limiter-menu-desktop container">
          <a href="#" class="logo">
            <img :src="logo" alt="IMG-LOGO">
          </a>
          <div class="wrap-icon-header flex-w flex-r-m">
            <div
              class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
              :data-notify="cartCount"
              @click="$emit('show-cart')"
            >
              <i class="zmdi zmdi-shopping-cart" />
            </div>
            <div
              class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
              title="Logout"
              @click="$emit('logout')"
            >
              <i class="zmdi zmdi-power" />
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="wrap-header-mobile">
      <div class="logo-mobile">
        <a href="#"><img :src="logo" alt="IMG-LOGO"></a>
      </div>
      <div class="wrap-icon-header flex-w flex-r-m m-r-15">
        <div
          class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
          :data-notify="cartCount"
          @click="$emit('show-cart')"
        >
          <i class="zmdi zmdi-shopping-cart" />
        </div>
        <div
          class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10"
          title="Logout"
          @click="$emit('logout')"
        >
          <i class="zmdi zmdi-power" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CozaHeader',
  props: {
    logo: {
      type: String,
      required: true
    },
    cartCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
