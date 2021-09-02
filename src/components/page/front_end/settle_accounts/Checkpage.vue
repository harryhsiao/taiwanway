<template>
  <div>
    <Navbar />
    <div id="v-content" class="container mt-9" :style="{ minHeight: Height + 'px' }">
      <h2 class="text-center my-4" v-if="CurrentTitle !== ''">{{ CurrentTitle }}</h2>
      <h2 class="text-center my-4" v-else>購物成功</h2>
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
              'alert-earthy': alertopen == `/checkpage/checkcomp/${orderId}`,
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
      alertopen: '/checkpage/csutinfo',
      orderId: '',
      CurrentTitle: '',
    };
  },
  computed: {
    stylechange() {
      const vm = this;
      let homePath = vm.$route.path;
      //let IDaddress = `/checkpage/checkcomp/${vm.orderId}`;
      vm.alertopen = homePath;
      if(vm.alertopen=='/checkpage/csutinfo'){
        vm.CurrentTitle = '購物訂單';
        return 'order';
      }else if(vm.alertopen=='/checkpage/csutcheckout'){
        vm.CurrentTitle = '最終確認';
        return 'check';
      }else{
        vm.CurrentTitle = '購物訂單';
        return 'success';
      }
      /*switch (homePath) {
        case '/checkpage/csutinfo':
          vm.CurrentTitle = '購物訂單';
          return 'order';
        case '/checkpage/csutcheckout':
          vm.CurrentTitle = '最終確認';
          return 'check';
        case IDaddress:
          vm.CurrentTitle = '';
          return 'success';
        default:
          return 'none';
      }*/
    },
  },
  components: {
    Navbar,
  },
  created() {
    this.orderId = this.$route.params.order_id;
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
