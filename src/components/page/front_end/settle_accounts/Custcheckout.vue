<template>
  <div class="mb-5">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center mt-5 accordion" id="accordionExample">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne" role="tab">
              <div class="row">
                <p class="h2 mb-0 ml-md-3 mx-auto" :class="{ 'text-maincolor': Discount !== 100 }">
                  {{ ((total_price + shipping) * ((100 - Discount) / 100)) | currency }}
                </p>
                <a
                  href="#collapseOne"
                  class="btn btn-link ml-md-auto ml-5 text-earthy"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  查看訂單明細 <i class="fas fa-caret-down"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <table class="table bg-transparent rwd-table">
              <thead>
                <tr>
                  <th class="text-center" width="100">預覽圖</th>
                  <th class="text-center" width="150" colspan="10">商品名稱</th>
                  <th class="text-center" width="100">數量</th>
                  <th class="text-center" width="100">單價</th>
                  <th class="text-center" width="80" colspan="5">小計</th>
                </tr>
              </thead>
              <tbody v-for="item in custcart" :key="item.id">
                <tr>
                  <td class="align-middle text-center" data-th="預覽圖">
                    <img :src="item.product.imageUrl" alt="suit" class="img-thumbnail" />
                  </td>
                  <td class="align-middle text-center" colspan="10" data-th="商品名稱">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle text-center" data-th="數量">{{ item.qty }}</td>
                  <td class="align-middle text-center" v-if="!item.product.price" data-th="單價">
                    {{ item.product.origin_price }}
                  </td>
                  <td class="align-middle text-center" data-th="單價" v-else>
                    {{ item.product.price }}
                  </td>
                  <td
                    class="align-middle text-center"
                    colspan="5"
                    v-if="!item.product.price"
                    data-th="小計"
                  >
                    {{ item.product.origin_price * item.qty }}
                  </td>
                  <td class="align-middle text-center" colspan="5" data-th="小計" v-else>
                    {{ item.product.price * item.qty }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">
              <p v-if="Discount !== 100">
                已使用<span class="text-earthy">{{ Coupontitle }}</span
                >優惠碼
              </p>
              <p
                class="h2 mb-0 ml-md-3 mx-auto"
                :class="{ 'text-maincolor': Discount !== 100 }"
                v-if="Discount !== 100"
              >
                合計
                {{ ((total_price + shipping) * ((100 - Discount) / 100)) | currency }}
              </p>
              <p class="h2 mb-0 ml-md-3 mx-auto" v-else>
                合計
                {{ (total_price + shipping) | currency }}
              </p>
            </div>
          </div>

          <h5 class="mt-5 text-center py-3 mb-2 bg-light">訂購人資訊</h5>
          <table class="table bg-transparents" v-for="(item, index) in custdata" :key="index">
            <tbody>
              <tr>
                <th scope="row">收貨人</th>
                <td>{{ item.user.name }}</td>
              </tr>
              <tr>
                <th scope="row">電子郵件</th>
                <td>{{ item.user.email }}</td>
              </tr>
              <tr>
                <th scope="row">連絡電話</th>
                <td>{{ item.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row">收貨地址</th>
                <td>{{ item.user.city + item.user.address }}</td>
              </tr>
              <tr>
                <th scope="row">給賣家的話</th>
                <td>{{ item.message }}</td>
              </tr>
            </tbody>
          </table>

          <div class="text-right">
            <button class="btn btn-secondary mr-3" @click="$router.go(-1)">
              上一步
            </button>
            <button class="btn btn-maincolor" @click="postinfo()">
              確認結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      custdata: JSON.parse(localStorage.getItem('custinfo')) || [],
      custcart: {},
      Coupontitle: '',
      Discount: 100,
      total_price: 0,
      shipping: 0,
      isLoading: false,
    };
  },
  created() {
    this.getcart();
  },
  methods: {
    postinfo() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.isLoading = true;
      vm.$http.post(api, { data: vm.custdata[0] }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          this.$router.push(`/checkpage/checkcomp/${response.data.orderId}`);
        }
      });
    },

    totalPricecal() {
      const vm = this;
      vm.totalPricePack = [];
      vm.custcart.forEach((item) => {
        if (item.coupon) {
          vm.Discount = item.coupon.percent;
          vm.Coupontitle = item.coupon.title;
        }
        if (item.product.price) {
          vm.totalPricePack.push(item.product.price * item.qty);
        } else {
          vm.totalPricePack.push(item.product.origin_price * item.qty);
        }
      });
      vm.total_price = vm.totalPricePack.reduce((a, b) => a + b, 0);
    },
    ShippingFee() {
      const vm = this;
      if (vm.total_price < 3000) {
        vm.shipping = 60;
      } else {
        vm.shipping = 0;
      }
    },
    getcart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http
        .get(api)
        .then((resp) => {
          vm.custcart = resp.data.data.carts;
        })
        .then(() => {
          vm.totalPricecal();
          vm.ShippingFee();
          vm.isLoading = false;
        });
    },
  },
};
</script>
