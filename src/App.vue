<template>
  <div class="d-flex flex-column" id="app">
    <Navbar />
    <Back2top />
    <router-view class="position-relative flex-grow-1 flex-shrink-0" v-if="isRouterAlive" />
  </div>
</template>

<script>
import Back2top from './components/kit/Goto_top.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Back2top,
  },
  provide() {
    return {
      reload: this.reload(),
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      const vm = this;
      vm.isRouterAlive = false;
      vm.$nextTick(() => {
        vm.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
