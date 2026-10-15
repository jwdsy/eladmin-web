<template>
  <footer class="bg3 p-t-75 p-b-32">
    <div class="container">
      <div class="row justify-content-center">
        <div
          v-for="group in groups"
          :key="group.title"
          class="col-sm-6 col-lg-3 p-b-50"
        >
          <h4 class="stext-301 cl0 p-b-30">{{ group.title }}</h4>
          <p v-if="group.text" class="stext-107 cl7 size-201">
            {{ group.text }}
          </p>
          <ul v-else>
            <li v-for="item in group.items" :key="item" class="p-b-10">
              <a href="#" class="stext-107 cl7 hov-cl1 trans-04">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="p-t-40">
        <p class="stext-107 cl6 txt-center">
          Copyright © {{ year }} All rights reserved | Made with
          <i class="fa fa-heart-o" /> by Colorlib
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CozaFooter',
  props: {
    groups: {
      type: Array,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }
}
</script>
