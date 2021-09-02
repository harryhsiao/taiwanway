<template>
  <div>
    <router-link
      tag="button"
      to="/cart"
      class=" position-fixed border-0 p-3 topbutton rounded-circle"
    >
      <i class="fas fa-shopping-cart"></i>
      <p class="mb-0">購物車</p>

      <span class="badge badge-pill badge-danger" v-if="cartnum > 0">
        {{ cartnum }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'pages',
    props: ['cartnum'],
    methods: {
        getpgnums(page, curpage) {
            const vm = this;
            if (page === 'pre') {
                vm.$emit('getpgnum', vm.pgnum.current_page - 1);
            } else if (page === 'next') {
                vm.$emit('getpgnum', vm.pgnum.current_page + 1);
            } else {
                vm.$emit('getpgnum', curpage);
            }
        },
    },
};
</script>

<style scoped>
.topbutton {
  bottom: 180px;
  right: 10px;
  z-index: 999;
  outline: none;
  transition: opacity ease-in-out 0.2s, background-color ease-in-out 0.2s;
}

.topbutton:hover {
  background-color: rgb(57, 231, 217);
}
</style>
