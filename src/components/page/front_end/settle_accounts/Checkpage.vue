<template>
  <div>
    <Navbar />
    <loading :active.sync="isLoading"></loading>
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
import Navbar from '@/components/Navbar';

export default {
  data() {
    return {
      Height: 0,
      isLoading: false,
      alertopen: '/checkpage/csutinfo',
      orderId: '',
      currentTitle: '',
    };
  },
  /*computed: {
    stylechange() {
      const vm = this;
      let homePath = vm.$route.path;
      //let IDaddress = `/checkpage/checkcomp/${vm.orderId}`;
      vm.alertopen = homePath;
      vm.currentTitle = '';
      vm.isLoading = true;
      if (vm.alertopen == '/checkpage/csutinfo') {
        vm.isLoading = false;
        return (vm.currentTitle = '購物訂單');
      } else if (vm.alertopen == '/checkpage/csutcheckout') {
        vm.isLoading = false;
        return (vm.currentTitle = '最終確認');
      } else {
        vm.alertopen = 'complete';
        vm.isLoading = false;
        return (vm.currentTitle = '購物成功');
      }
    },
  },*/
  components: {
    Navbar,
  },
  created() {
    this.orderId = this.$route.params.order_id;
    this.getcurraddress();
  },
  methods: {
    getcurraddress() {
      const vm = this;
      let homePath = vm.$route.path;
      vm.alertopen = homePath;
      //vm.$set(vm.alertopen, homePath);
    },
  },
  mounted() {
    //動態設置內容高度 讓footer始終居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100; //監聽瀏覽器窗口變化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 100;
    };
  },
};
</script>
