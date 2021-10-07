<template>
  <div class="mb-5">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center mt-5 accordion" id="accordionExample">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne" role="tab">
              <div class="row">
                <p class="h2 mb-0 ml-md-3 mx-auto" v-if="Discount == 100">
                  {{ (total_price + shipping) | currency }}
                </p>
                <p
                  class="h2 mb-0 ml-md-3 mx-auto"
                  :class="{ 'text-maincolor': Discount !== 100 }"
                  v-else
                >
                  {{ (total_price * (Discount / 100) + shipping) | currency }}
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
              <p>總價{{ total_price | currency }}</p>
              <p>
                折扣
                <span :class="{ 'text-danger': Discount !== 100 }" v-if="Discount !== 100"
                  >{{ 100 - Discount }}%OFF</span
                >
                <span :class="{ 'text-danger': Discount !== 100 }" v-else>未使用</span>
              </p>
              <p>運費{{ shipping | currency }}</p>
              <p class="h3" :class="{ 'text-maincolor': Discount !== 100 }" v-if="Discount !== 100">
                合計
                {{ (total_price * (Discount / 100) + shipping) | currency }}
              </p>
              <p class="h3" v-else>
                合計
                {{ (total_price + shipping) | currency }}
              </p>
            </div>
          </div>
          <div class="container hpx-10 mt-3">
            <div class="row">
              <div class="col-md-6">
                <p class="text-danger">輸入 goodfood9999 以獲取 3 折優惠</p>
              </div>
              <div class="col-md-6">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    aria-label="請輸入優惠碼"
                    aria-describedby="button-addon2"
                    v-model="couponcode"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="addcoupon"
                    >
                      送出優惠碼
                    </button>
                  </div>
                </div>
                <Alertinfotext />
              </div>
            </div>
          </div>

          <h5 class="mt-5 text-center py-3 mb-2 bg-light">訂購人資訊</h5>
          <validation-observer v-slot="{ invalid }">
            <form class="needs-validation" @submit.prevent="subOrder">
              <div class="form-row">
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|zhtw_name"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <!-- 輸入框 -->
                    <label for="username">姓名</label>
                    <input
                      type="text"
                      name="姓名"
                      :class="classes"
                      class="form-control"
                      id="username"
                      placeholder="姓名"
                      v-model="form.user.name"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|numeric"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="usertel">電話</label>
                    <input
                      type="text"
                      name="電話"
                      class="form-control"
                      :class="classes"
                      id="usertel"
                      placeholder="電話"
                      v-model="form.user.tel"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <validation-provider
                  class="col-md-4 mb-3"
                  rules="required|email"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="usermail">Email</label>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      :class="classes"
                      id="usermail"
                      placeholder="example@email.com"
                      v-model="form.user.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <div class="form-group col-md-4">
                  <label for="inputState">居住城市</label>
                  <select
                    id="inputState"
                    name="country"
                    class="form-control"
                    v-model="form.user.city"
                  >
                    <option v-for="(item, index) in countorys" :key="index">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <validation-provider
                  class="col-md-8 mb-3"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <label for="useraddress">收貨地址</label>
                    <input
                      type="text"
                      name="地址"
                      class="form-control"
                      :class="classes"
                      id="useraddress"
                      placeholder="輸入您的住址"
                      v-model="form.user.address"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
                <div class="col-md-12 mb-3">
                  <label for="validationTextarea">給賣家的話</label>
                  <textarea
                    class="form-control"
                    id="validationTextarea"
                    placeholder="(非必填)"
                    v-model="form.message"
                    style="resize: none"
                  ></textarea>
                </div>
              </div>
              <button class="btn btn-maincolor float-right" type="submit" :disabled="invalid">
                下一步
              </button>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alertinfotext from '@/components/kit/Alert_info_text';

export default {
  data() {
    return {
      countorys: [
        '台北市',
        '基隆市',
        '新北市',
        '連江縣',
        '宜蘭縣',
        '新竹市',
        '新竹縣',
        '桃園市',
        '苗栗縣',
        '台中市',
        '彰化縣',
        '南投縣',
        '嘉義市',
        '嘉義縣',
        '雲林縣',
        '台南市',
        '高雄市',
        '澎湖縣',
        '金門縣',
        '屏東縣',
        '台東縣',
        '花蓮縣',
      ],
      custcart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          city: '',
          address: '',
        },
        message: '',
      },
      custdata: JSON.parse(localStorage.getItem('custinfo')) || [],
      totalPricePack: [],
      finalPricepack: [],
      couponcode: '',
      isCoupon: false,
      isLoading: false,
      Discount: 100,
      total_price: 0,
      shipping: 0,
    };
  },
  created() {
    this.getcart();
    this.getcustinfo();
  },
  components: {
    Alertinfotext,
  },
  methods: {
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
        });
    },
    getcustinfo() {
      const vm = this;
      vm.custdata.forEach((item) => {
        vm.form.user.name = item.user.name;
        vm.form.user.email = item.user.email;
        vm.form.user.tel = item.user.tel;
        vm.form.user.city = item.user.city;
        vm.form.user.address = item.user.address;
        vm.form.message = item.message;
      });
    },
    addcoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponcode,
      };
      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          //顯示
          vm.$infotext.$emit('messsage:push', '已套用優惠券', 'success', 'yes');
        } else {
          vm.$infotext.$emit('messsage:push', '無效的優惠券', 'danger', 'no');
        }
        vm.getcart();
        vm.couponcode = '';
      });
    },
    totalPricecal() {
      const vm = this;
      vm.totalPricePack = [];
      vm.custcart.forEach((item) => {
        if (item.coupon) {
          vm.isCoupon = true;
          vm.Discount = item.coupon.percent;
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
      vm.isLoading = false;
    },
    subOrder() {
      const vm = this;
      vm.isLoading = true;
      vm.custdata.splice(0, 1);
      vm.custdata.push(vm.form);
      localStorage.setItem('custinfo', JSON.stringify(vm.custdata));
      vm.$router.push('/checkpage/custcheckout');
      vm.isLoading = false;
    },
  },
};
</script>
