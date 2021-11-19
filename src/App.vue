<template>
  <div class="d-flex flex-column" id="app">
    <Navbar :isLogin="memberin" />
    <Back2top />
    <router-view class="position-relative flex-grow-1 flex-shrink-0" v-if="isRouterAlive" />
  </div>
</template>

<script>
import Back2top from './components/kit/Goto_top.vue';
import Navbar from './components/page/Navbar.vue';

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
      memberin: false,
    };
  },
  watch: {
    $route() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      vm.$http.post(api).then((response) => {
        vm.memberin = response.data.success;
      });
    },
  },
  /* created() {
    this.islogin();
  }, */
  methods: {
    reload() {
      const vm = this;
      vm.isRouterAlive = false;
      vm.$nextTick(() => {
        vm.isRouterAlive = true;
      });
    },
    /* islogin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      vm.$http.post(api).then((response) => {
        console.log(response.data.success);
        vm.memberin = response.data.success;
      });
    }, */
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
