<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alertnote />
    <section class="container mt-8">
      <div class="row">
        <div class="col-md-4 d-block d-md-none">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="h2 mb-3">結帳</h3>

              <ul class="list-group list-group-flush">
                <li
                  class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  border-0
                  px-0
                  pb-0"
                >
                  <h3>金額</h3>
                  <p class="h3">{{ mytotalprice | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                  "
                  v-if="mytotalprice < 3000 && mytotalprice > 0"
                >
                  <h3>運費</h3>
                  <p class="h3">{{ 60 | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                    text-success
                  "
                  v-else
                >
                  <h3>運費</h3>
                  <p class="h3">{{ 0 | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    border-0
                    px-0
                    mb-3
                  "
                >
                  <div>
                    <h3>總價</h3>
                    <p class="mb-0">(含稅)</p>
                  </div>
                  <h2 v-if="mytotalprice < 3000 && mytotalprice > 0">
                    {{ (mytotalprice + 60) | currency }}
                  </h2>
                  <h2 v-else>
                    {{ mytotalprice | currency }}
                  </h2>
                </li>
              </ul>

              <button type="button" class="btn btn-maincolor py-3 btn-block" @click="postcart()">
                結帳去
              </button>
              <router-link to="/Store" class="btn btn-secondary py-2 btn-block">
                繼續購物
              </router-link>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="mb-4">我們接受以下付款方式</h5>
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div
            class="
              d-md-flex
              justify-content-between
              align-items-center
              bg-white
              mb-3
              p-3
              border
              rounded
              "
          >
            <h3 class="p-3 text-center">
              購物車
              <br class="d-inlineblock d-md-none" />
              (共<span class="text-earthy p-3 h2">{{ cartlong }}</span
              >筆購物內容)
            </h3>
            <a class="text-danger" href="#" @click.prevent="killall()" v-show="!isnone">
              <i class="fas fa-minus-circle"></i>
              清空購物車
            </a>
          </div>
          <div class="card mb-4 w-100">
            <div class="card-body">
              <div class="noneProductMessage text-center pb-7" v-show="isnone">
                <p class="mt-9">購物車是空的...</p>
                <router-link tag="button" class="btn btn-outline-secondary p-4" to="/Store">
                  <i class="fas fa-directions fa-2x"></i>
                  <span class="ml-3">來去買點東西吧</span>
                </router-link>
              </div>
              <div class="row mt-3 border-bottom" v-for="item in incart" :key="item.id">
                <div class="col-md-5 col-lg-3">
                  <div class="mb-3 mb-md-0">
                    <img class="img-fluid w-100" :src="item.imageUrl" :alt="item.category" />
                  </div>
                </div>
                <div class="col-md-7 col-lg-9">
                  <div class="row">
                    <div class="col-md-5">
                      <h5>{{ item.title }}</h5>
                      <p class="mb-3 small">
                        {{ item.category }}
                      </p>
                    </div>
                    <div class="col-md-7 p-md-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            @click="minercart(item)"
                            class="
                            btn
                            btn-outline-secondary
                            minus
                            border-right-0
                            border
                            border-secondary
                            rounded-left"
                            :disabled="item.qty < 2"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                        <input
                          class="text-center"
                          min="1"
                          name="quantity"
                          :value="item.qty"
                          type="number"
                        />
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            @click="pluscart(item)"
                            class="
                            btn
                            btn-outline-secondary
                            plus border
                            border-left-0
                            border-secondary
                            rounded-right"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center my-5">
                    <a
                      href="#!"
                      type="button"
                      class="small mr-3 text-danger"
                      @click.prevent="deletedcart(item.id)"
                      ><i class="fas fa-trash-alt mr-1"></i> 刪除商品
                    </a>
                    <p class="mb-0" v-if="!item.price">
                      <span>
                        <strong>價格 {{ item.origin_price | currency }}</strong>
                      </span>
                    </p>
                    <p class="mb-0" v-else>
                      <span>
                        <strong> 價格 {{ item.price | currency }} </strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <p class="text-center pt-3" v-show="!isnone">已經到底囉</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-none d-md-block">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="h2 mb-3">結帳</h3>

              <ul class="list-group list-group-flush">
                <li
                  class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  border-0
                  px-0
                  pb-0"
                >
                  <h3>金額</h3>
                  <p class="h3">{{ mytotalprice | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                  "
                  v-if="mytotalprice < 3000 && mytotalprice > 0"
                >
                  <h3>運費</h3>
                  <p class="h3">{{ 60 | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    px-0
                    text-success
                  "
                  v-else
                >
                  <h3>運費</h3>
                  <p class="h3">{{ 0 | currency }}</p>
                </li>
                <li
                  class="
                    list-group-item
                    d-flex
                    justify-content-between
                    align-items-center
                    border-0
                    px-0
                    mb-3
                  "
                >
                  <div>
                    <h3>總價</h3>
                    <p class="mb-0">(含稅)</p>
                  </div>
                  <h2 v-if="mytotalprice < 3000 && mytotalprice > 0">
                    {{ (mytotalprice + 60) | currency }}
                  </h2>
                  <h2 v-else>
                    {{ mytotalprice | currency }}
                  </h2>
                </li>
              </ul>

              <button type="button" class="btn btn-maincolor py-3 btn-block" @click="postcart()">
                結帳去
              </button>
              <router-link to="/Store" class="btn btn-secondary py-2 btn-block">
                繼續購物
              </router-link>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="mb-4">我們接受以下付款方式</h5>
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                class="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Alertnote from '../../../kit/Alert_note.vue'

export default {
  name: 'AddCart',
  data () {
    return {
      incart: JSON.parse(localStorage.getItem('mycart')) || [],
      isnext: false,
      isLoading: false,
      isnone: true,
      cartlong: 0,
      mytotalprice: 0
    }
  },
  components: {
    Alertnote
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  created () {
    this.pricecal()
    this.incartnum()
  },
  computed: {
    changestyle () {
      const vm = this
      if (vm.isnext) {
        return 'text-info'
      }
      return 'text-secondary'
    }
  },
  methods: {
    pricecal () {
      const vm = this
      const pricepack = []
      vm.incart.forEach((item) => {
        if (item.price) {
          pricepack.push(item.price * item.qty)
        } else {
          pricepack.push(item.origin_price * item.qty)
        }
      })
      if (pricepack.length > 0) {
        vm.mytotalprice = pricepack.reduce((a, b) => a + b, 0)
      } else {
        vm.mytotalprice = 0
      }
    },
    incartnum () {
      const vm = this
      vm.cartlong = vm.incart.length
      if (vm.cartlong === 0) {
        vm.isnone = true
      } else {
        vm.isnone = false
      }
    },
    postcart () {
      const vm = this
      if (vm.incart.length > 0) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const cacheID = []
        vm.isLoading = true
        vm.$http
          .get(api)
          .then((resp) => {
            const cacheData = resp.data.data.carts
            cacheData.forEach((item) => {
              cacheID.push(item.id)
            })
          })
          .then(async () => {
            await Promise.all(
              cacheID.map((item) => vm.$http.delete(`${api}/${item}`).then(() => {}))
            )
          })
          .then(async () => {
            await Promise.all(
              vm.incart.map((item) => {
                const cache = {
                  product_id: item.product_id,
                  qty: item.qty
                }
                return vm.$http
                  .post(api, { data: cache })
                  .then(() => {
                    vm.incart = []
                    localStorage.removeItem('mycart')
                  })
                  .then(() => {
                    vm.isLoading = false
                    vm.$router.push('/checkpage/custinfo').catch(() => {})
                  })
              })
            )
          })
      } else {
        vm.$bus.$emit('message:push', '購物車是空的噢', 'danger')
      }
    },
    pluscart (data) {
      const vm = this
      let cache = {}
      vm.incart.forEach((item, keys) => {
        if (item.product_id === data.id) {
          let { qty } = item
          cache = {
            category: data.category,
            content: data.content,
            description: data.description,
            id: data.id,
            imageUrl: data.imageUrl,
            origin_price: parseInt(data.origin_price, 10),
            price: parseInt(data.price, 10),
            title: data.title,
            unit: data.unit,
            product_id: data.id,
            qty: parseInt((qty += 1), 10)
          }
          vm.incart.splice(keys, 1, cache)
        }
      })
      localStorage.setItem('mycart', JSON.stringify(vm.incart))
      vm.pricecal()
    },
    minercart (data) {
      const vm = this
      let cache = {}
      vm.incart.forEach((item, keys) => {
        if (item.product_id === data.id && data.qty > 1) {
          let { qty } = item
          cache = {
            category: data.category,
            content: data.content,
            description: data.description,
            id: data.id,
            imageUrl: data.imageUrl,
            origin_price: parseInt(data.origin_price, 10),
            price: parseInt(data.price, 10),
            title: data.title,
            unit: data.unit,
            product_id: data.id,
            qty: parseInt((qty -= 1), 10)
          }
          vm.incart.splice(keys, 1, cache)
        }
      })
      localStorage.setItem('mycart', JSON.stringify(vm.incart))
      vm.pricecal()
    },
    deletedcart (id) {
      const vm = this
      vm.incart.forEach((item, keys) => {
        if (item.product_id === id) {
          vm.incart.splice(keys, 1)
        }
      })
      switch (vm.incart.length) {
        case 0:
          localStorage.removeItem('mycart')
          break

        default:
          localStorage.setItem('mycart', JSON.stringify(vm.incart))
          break
      }

      vm.pricecal()
      vm.incartnum()
    },
    killall () {
      const vm = this
      vm.incart = []
      vm.cartlong = 0
      vm.isLoading = false
      localStorage.removeItem('mycart')
      vm.isnone = true
      vm.mytotalprice = 0
    }
  }
}
</script>
