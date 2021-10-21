<template>
  <div>
    <router-link
      tag="button"
      to="/Addcart"
      class="position-fixed CartButton-position CartButton border-0 p-3 rounded-circle d-md-block d-none"
    >
      <i class="fas fa-shopping-cart"></i>
      <p class="mb-0">購物車</p>

      <span
        class="position-absolute badge badge-pill badge-danger CartButton-number"
        v-if="cartnum > 0"
      >
        {{ cartnum }}
      </span>
    </router-link>
    <router-link
      tag="button"
      to="/Addcart"
      class="fixed-bottom border-0 bg-secondary p-3 w-100 d-md-none d-block"
    >
      <p class="mb-0 text-white">
        <i class="fas fa-shopping-cart mr-2"></i>購物車<span class="ml-2">({{ cartnum }})</span>
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'pages',
  props: ['cartnum'],
};
</script>

<style scoped>
.CartButton {
  transition: opacity ease-in-out 0.2s, background-color ease-in-out 0.2s;
}

.CartButton-position {
  bottom: 180px;
  right: 10px;
  z-index: 99999;
}

.CartButton-number {
  right: 10px;
}

.CartButton:hover {
  background-color: rgb(158, 222, 174);
}
</style>
