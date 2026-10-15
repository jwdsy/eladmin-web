<template>
  <div class="wrap-header-cart" :class="{ 'show-header-cart': visible }">
    <div class="s-full" @click="$emit('close')" />
    <div class="header-cart flex-col-l p-l-65 p-r-25">
      <div class="header-cart-title flex-w flex-sb-m p-b-8">
        <span class="mtext-103 cl2">Your Cart</span>
        <div
          class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04"
          @click="$emit('close')"
        >
          <i class="zmdi zmdi-close" />
        </div>
      </div>

      <div class="header-cart-content flex-w">
        <ul class="header-cart-wrapitem w-full">
          <li
            v-for="(item, index) in items"
            :key="`${item.itemNo || item.name}-${index}`"
            class="header-cart-item flex-w flex-t m-b-12"
          >
            <div class="header-cart-item-img-fixed" @click="$emit('remove', index)">
              <img :src="item.image" alt="IMG">
              <div class="cart-item-remove-btn">
                <i class="zmdi zmdi-close" />
              </div>
            </div>
            <div class="header-cart-item-txt p-t-8 p-l-15">
              <a
                href="#"
                class="header-cart-item-name m-b-10 hov-cl1 trans-04"
              >{{ item.itemNo || item.name }}</a>
              <span class="header-cart-item-info dis-block m-b-8">
                L:{{ item.itemLength }} × W:{{ item.itemWidth }} × H:{{ item.itemHeight }}
              </span>
              <el-tooltip
                v-if="item.remark"
                :content="item.remark"
                placement="top"
                :disabled="!isRemarkOverflow(item.remark)"
              >
                <span class="header-cart-item-remark dis-block">
                  <i class="zmdi zmdi-comment-outline m-r-5" />{{ item.remark }}
                </span>
              </el-tooltip>
            </div>
          </li>
        </ul>
      </div>

      <div class="w-full">
        <div class="header-cart-total w-full p-tb-40">
          Total: {{ items.length }} item{{ items.length !== 1 ? 's' : '' }}
        </div>
        <div class="header-cart-buttons flex-w w-full">
          <a
            href="#"
            class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8"
            @click.prevent="$emit('submit')"
          >Submit</a>
          <a
            href="#"
            class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04"
            @click.prevent="$emit('clean')"
          >Clean</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCartDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isRemarkOverflow(remark) {
      // 判断备注是否超过一定长度，超过则显示 tooltip
      return remark && remark.length > 30
    }
  }
}
</script>

<style scoped>
.header-cart {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header-cart-title {
  flex-shrink: 0;
}

.header-cart-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.header-cart-footer {
  flex-shrink: 0;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  padding: 0 25px 20px 0;
}

.header-cart-item {
  display: flex;
  align-items: flex-start;
}

.header-cart-item-img-fixed {
  width: 80px !important;
  height: 80px !important;
  min-width: 80px !important;
  min-height: 80px !important;
  max-width: 80px !important;
  max-height: 80px !important;
  flex-shrink: 0 !important;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  display: block;
  position: relative;
  margin-right: 0 !important;
  background-color: #f8f8f8;
}

.header-cart-item-img-fixed img {
  width: 80px !important;
  height: 80px !important;
  object-fit: contain !important;
  transition: all 0.3s;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.header-cart-item-img-fixed:hover img {
  opacity: 0.5;
}

.cart-item-remove-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  z-index: 2;
}

.cart-item-remove-btn i {
  font-size: 18px;
  color: #e74c3c;
}

.header-cart-item-img-fixed:hover .cart-item-remove-btn {
  opacity: 1;
}

.header-cart-item-txt {
  flex: 1;
  min-width: 0;
  width: auto !important;
}

.header-cart-item-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  word-wrap: break-word;
}

.header-cart-item-info {
  font-size: 12px;
  color: #888;
}

.header-cart-item-remark {
  font-size: 12px;
  color: #666;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  display: inline-block;
  cursor: pointer;
}
</style>
