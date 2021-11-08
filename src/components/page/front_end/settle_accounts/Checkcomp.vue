<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alertcard />
    <div class="container mb-5">
      <div class="row">
        <div class="col-12 px-0 mb-5">
          <div class="accordion" id="bill">
            <div class="card">
              <div
                class="card-header d-flex justify-content-between align-items-center"
                id="headingOne"
              >
                <div v-if="!order.is_paid">
                  <h2 class="text-danger">
                    <i class="far fa-times-circle"></i>
                    未付款
                  </h2>
                </div>
                <div v-else>
                  <h2 class="text-success">
                    <i class="far fa-check-circle"></i>
                    已付款
                  </h2>
                </div>
                <button
                  class="btn btn-link text-earthy"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style="font-size: 2em;"
                >
                  訂單明細 <i class="fas fa-caret-down"></i>
                </button>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#bill"
              >
                <div class="card-body">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row">訂購人</th>
                        <td v-if="order.user">{{ order.user.name }}</td>
                      </tr>
                      <tr>
                        <th scope="row">付款價格</th>
                        <td v-if="order.total < 3000">{{ total_price + 60 }}</td>
                        <td v-else>{{ total_price }}</td>
                      </tr>
                      <tr>
                        <th scope="row">收貨地址</th>
                        <td v-if="order.user">{{ order.user.address }}</td>
                      </tr>
                      <tr>
                        <th scope="row">付款方式</th>
                        <td>貨到付款</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 border mb-5 p-4">
          <article>
            <h3 class="my-4">付款須知</h3>
            <p>
              本網站為練習之用,不具商業功能,故要完成付款功能,請點擊下方 "模擬付款" 按鈕來模擬
            </p>
            <p>
              本站金流與歐付寶allpay(第三方支付)合作，
              目前提供ATM付款、webATM付款、信用卡線上刷卡、到店付款等方式。
            </p>
          </article>
          <div class="text-right">
            <button type="button" class="btn btn-secondary" @click="$router.push('/cart')">
              回到購物頁
            </button>
            <button
              type="button"
              class="btn btn-maincolor ml-3"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              v-if="order.is_paid === false"
              @click="letPay"
            >
              模擬付款
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alertcard from '../../../kit/Alert_card.vue';

export default {
  name: 'CheckComplete',
  data() {
    return {
      order: {
        user: {},
      },
      totalPricePack: [],
      orderId: '',
      isLoading: false,
      total_price: 0,
      Discount: 100,
    };
  },
  components: {
    Alertcard,
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(api).then((resp) => {
        vm.order = resp.data.order;
        vm.total_price = Math.ceil(resp.data.order.total);
        vm.isLoading = false;
      });
    },
    letPay() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(api).then((resp) => {
        if (resp.data.success) {
          vm.getorder();
        }
        vm.isLoading = false;
        vm.$infomodal.$emit('message:push', '付款成功', 'success');
      });
    },
    totalPricecal() {
      const vm = this;
      vm.order.forEach((item) => {
        vm.total_price = item.total;
      });
    },
    ShippingFee() {
      const vm = this;
      if (vm.total_price < 3000) {
        vm.shipping = 60;
      } else {
        vm.shipping = 0;
      }
    },
  },
  created() {
    this.orderId = this.$route.params.order_id;
    this.getorder();
  },
};
</script>
