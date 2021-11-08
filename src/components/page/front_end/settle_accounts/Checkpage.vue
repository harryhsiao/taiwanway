<template>
  <div>
    <Navbar />
    <div id="v-content" class="container mt-8" :style="{ minHeight: Height + 'px' }">
      <h2 class="text-center my-4">確認結帳步驟</h2>
      <section class="form-row text-center">
        <div class="col-12 col-sm-4">
          <div
            class="alert rounded-pill py-3"
            role="alert"
            :class="{ 'alert-earthy': alertopen == '/checkpage/custinfo' }"
          >
            1. 確認訂單
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div
            class="alert rounded-pill py-3"
            role="alert"
            :class="{ 'alert-earthy': alertopen == '/checkpage/custcheckout' }"
          >
            2. 送出訂單
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div
            class="alert rounded-pill py-3"
            role="alert"
            :class="{
              'alert-earthy': alertopen == 'complete',
            }"
          >
            3. 完成
          </div>
        </div>
      </section>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '../../../Navbar.vue';

export default {
  name: 'CheckPage',
  components: {
    Navbar,
  },
  data() {
    return {
      Height: 0,
      isLoading: false,
      alertopen: '',
      currentTitle: '',
    };
  },
  watch: {
    $route() {
      this.getcurraddress();
    },
  },
  created() {
    this.getcurraddress();
  },
  methods: {
    getcurraddress() {
      const vm = this;
      const homePath = vm.$route.path;
      vm.alertopen = '';
      if (homePath === '/checkpage/custinfo' || homePath === '/checkpage/custcheckout') {
        vm.alertopen = homePath;
      } else {
        vm.alertopen = 'complete';
      }
    },
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 100;
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 100;
    };
  },
};
</script>
