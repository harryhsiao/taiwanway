<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alertcard />
    <div class="container mb-5">
      <div class="row">
        <div class="col-12 px-0 mb-5">
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    訂單明細
                  </button>
                  <span class="text-danger" v-if="!order.is_paid">未付款</span>
                  <span class="text-success" v-else>已付款</span>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
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
                        <td v-if="order.total < 3000">{{ order.total + 60 }}</td>
                        <td v-else>{{ order.total }}</td>
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
            <h3 class="text-center my-4">付款須知</h3>
            <p>
              本網站為練習之用,不具商業功能,故要完成付款功能,請點擊下方 "模擬付款" 按鈕來模擬
            </p>
            <p>
              本站金流與歐付寶allpay(第三方支付)合作，
              目前提供ATM付款、webATM付款、信用卡線上刷卡、到店付款等方式。
            </p>
          </article>
          <div class="text-right">
            <button class="btn btn-secondary" @click="$router.push('/cart')">
              回到購物頁
            </button>
            <button
              class="btn btn-primary ml-3"
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
import Alertcard from '@/components/kit/Alertcard';

export default {
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
        vm.$infomodal.$emit('messsage:push', '付款成功', 'success');
      });
    },

    totalPricecal() {
      const vm = this;
      vm.totalPricePack = [];
      vm.order.forEach((item) => {
        if (item.products.total < 3000) {
          vm.total_price = item.products.total + 60;
        } else {
          vm.total_price = item.products.total;
        }
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
