<template>
  <div class="">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertopen: '',
    };
  },
};
</script>
