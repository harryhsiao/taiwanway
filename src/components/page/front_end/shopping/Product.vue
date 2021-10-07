<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="d-flex justify-content-between">
      <router-link to="/addcart" class="text-info">
        <i class="fas fa-shopping-cart fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger" v-if="cartlong > 0">
          {{ cartlong }}
        </span>
      </router-link>
    </nav>
    <header class="py-4 py-lg-5">
      <div class="container mt-7">
        <router-link class="text-secondary h4 mb-5" to="/Cart">
          <i class="fas fa-chevron-left"></i>
          返回上一頁
        </router-link>
        <div class="row my-4">
          <div class="col-lg-5 col-md-6 mb-3 mb-md-0">
            <swiper class="swiper w-100 hvh-3" :options="swiperOptionTop" ref="swiperTop">
              <swiper-slide
                class="image-cover hvh-3"
                :style="`background-image:url(${product.imageUrl})`"
                v-if="product.imageUrl"
              ></swiper-slide>
              <swiper-slide
                class="image-cover hvh-3"
                :style="`background-image:url(${product.image2})`"
                v-if="product.image2"
              ></swiper-slide>
              <swiper-slide
                class="image-cover hvh-3"
                :style="`background-image:url(${product.image3})`"
                v-if="product.image3"
              ></swiper-slide>
              <swiper-slide
                class="image-cover hvh-3"
                :style="`background-image:url(${product.image4})`"
                v-if="product.image4"
              ></swiper-slide>
            </swiper>
            <swiper
              class="row mt-3 swiper h-10 p-0"
              :options="swiperOptionThumbs"
              ref="swiperThumbs"
              v-show="product.image2"
            >
              <swiper-slide
                class="image-cover w-25 h-100"
                :style="`background-image:url(${product.imageUrl})`"
                v-if="product.imageUrl"
              ></swiper-slide>
              <swiper-slide
                class="image-cover w-25 h-100"
                :style="`background-image:url(${product.image2})`"
                v-if="product.image2"
              ></swiper-slide>
              <swiper-slide
                class="image-cover w-25 h-100"
                :style="`background-image:url(${product.image3})`"
                v-if="product.image3"
              ></swiper-slide>
              <swiper-slide
                class="image-cover w-25 h-100"
                :style="`background-image:url(${product.image4})`"
                v-if="product.image4"
              ></swiper-slide>
            </swiper>
          </div>

          <div class="col-lg-7 col-md-6">
            <h3 class="h1 font-weight-bold">{{ product.title }}</h3>
            <p class="h2 mb-3" v-if="product.price">
              原價
              <span class="text-danger font-weight-bold">
                {{ product.price }}
              </span>
              元
            </p>
            <p class="h2 mb-3" v-else>
              優惠價
              <span class="text-danger font-weight-bold">
                {{ product.origin_price }}
              </span>
              元
            </p>
            <div class="border p-md-4 pl-2 pt-2 my-3">
              <p>優惠活動:</p>
              <p class="small">
                <span class="badge badge-danger mr-2">通知</span>
                產品免運<br class="d-md-none d-inlineblock" />
                全館消費滿<span class="mx-md-2 mx-1 text-warning font-weight-bold h5">
                  NT 3000元
                </span>
                享免運優惠
              </p>
              <p class="small">
                <span class="badge badge-warning mr-2">活動</span>
                食慾之秋<br class="d-md-none d-inlineblock" />
                輸入折扣碼
                <span class="mx-md-2 mx-1 text-warning font-weight-bold h5">
                  goodfood999
                </span>
                享三折優惠
              </p>
            </div>

            <div class="accordion" id="info_accordion">
              <div class="card border-top-0 border-right-0 border-bottom border-left-0 mb-3">
                <div
                  class="card-header bg-transparent d-flex align-items-center justify-content-between"
                  data-toggle="collapse"
                  data-target="#product_info_one"
                  aria-expanded="true"
                  aria-controls="product_info_one"
                  id="info_title_one"
                >
                  <p>商品說明</p>
                  <div class="text-dark text-center wpx-2 hpx-2 collapseicon">
                    <span class="bg-dark"></span>
                    <span class="bg-dark"></span>
                  </div>
                </div>

                <div
                  class="product_info collapse"
                  id="product_info_one"
                  aria-labelledby="info_title_one"
                  data-parent="#info_accordion"
                >
                  <div class="card-body">
                    <p v-html="product.description"></p>
                  </div>
                </div>
              </div>

              <div class="card border-top-0 border-right-0 border-bottom border-left-0 mb-3">
                <div
                  class="card-header bg-transparent d-flex align-items-center justify-content-between"
                  data-toggle="collapse"
                  data-target="#product_info_two"
                  aria-expanded="true"
                  aria-controls="product_info_two"
                  id="product_title_two"
                >
                  <p>商品內容</p>
                  <div class="text-dark text-center wpx-2 hpx-2 collapseicon">
                    <span class="bg-dark"></span>
                    <span class="bg-dark"></span>
                  </div>
                </div>

                <div
                  class="product_info collapse"
                  id="product_info_two"
                  aria-labelledby="product_title_two"
                  data-parent="#info_accordion"
                >
                  <div class="card-body">
                    <p v-html="product.content"></p>
                  </div>
                </div>
              </div>

              <div class="card border-top-0 border-right-0 border-bottom border-left-0 mb-3">
                <div
                  class="card-header bg-transparent d-flex align-items-center justify-content-between"
                  data-toggle="collapse"
                  data-target="#product_info_three"
                  aria-expanded="true"
                  aria-controls="product_info_three"
                  id="product_title_three"
                >
                  <p>付款方式</p>
                  <div class="text-dark text-center wpx-2 hpx-2 collapseicon">
                    <span class="bg-dark"></span>
                    <span class="bg-dark"></span>
                  </div>
                </div>
                <div
                  class="product_info collapse"
                  id="product_info_three"
                  aria-labelledby="product_title_three"
                  data-parent="#info_accordion"
                >
                  <div class="card-body">
                    <ul class="list-style-none small">
                      <li class="mb-2">
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/CnJx8z.png"
                          alt="ATM"
                        />
                        ATM轉帳
                      </li>
                      <li class="mb-2">
                        <i class="fas fa-truck fa-2x mr-2"></i>
                        貨到付款
                      </li>
                      <li class="mb-2">
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/YCGznA.jpg"
                          alt="line pay"
                        />
                        LINE Pay
                      </li>
                      <li class="mb-2">
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/tKMkqN.png"
                          alt="711"
                        />
                        7-11取貨付款
                      </li>
                      <li class="mb-2">
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/u4oVq0.jpg"
                          alt="familymart"
                        />
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/W7goSw.jpg"
                          alt="OKmart"
                        />
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://upload.cc/i1/2021/07/12/o5bm0q.jpg"
                          alt="Hilife"
                        />
                        全家,OK,萊爾富取貨付款
                      </li>
                      <li class="mb-2">
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa"
                        />
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                          alt="American Express"
                        />
                        <img
                          class="mr-3"
                          width="25px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard"
                        />
                        信用卡
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="input-group my-4">
              <div class="input-group-prepend">
                <button @click="qty--" class="minus btn btn-maincolor px-3" :disabled="qty < 2">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                class="text-center form-control py-4"
                min="1"
                name="quantity"
                :max="product.num"
                v-model.number="qty"
                type="number"
              />
              <div class="input-group-prepend">
                <button @click="qty++" class="plus btn btn-maincolor px-3">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary py-3 w-100" @click="addcart(product)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container mt-6">
        <h3>問與答</h3>
        <div class="accordion" id="accordionExample">
          <div
            class="card shadow-sm shadow-sm my-3 border-0"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div class="card-header" id="headingOne">
              <p class="m-0 text-left d-flex align-items-center font-weight-normal">
                <span class="numfont text-white bg-secondary p-3 rounded mr-4">Q1</span>
                請問保存期限有多久呢?
              </p>
            </div>

            <div
              id="collapseOne"
              class="product_info"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <p>
                  因為我們採真空包裝，一般來說可保存3個月沒問題，但還是建議在兩個禮拜內吃完，以品嚐到食材最鮮美的狀況
                </p>
              </div>
            </div>
          </div>

          <div
            class="card shadow-sm mb-3 border-0"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="card-header" id="headingTwo">
              <p class="m-0 text-left d-flex align-items-center font-weight-normal">
                <span class="numfont text-white bg-secondary p-3 rounded mr-4">Q2</span>
                我買錯東西了，請問可以退款嗎?
              </p>
            </div>

            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <p>
                  為保食材可以維持最新鮮的狀態， 確認訂單後我們才會開始調理包的製作，
                  除非是在下訂單後24小時內通知修改， 否則是無法退款的噢。
                  <br />
                  <br />
                  至於已經到貨的部分，除非是食品有問題 ，否則也是無法退款的。
                </p>
              </div>
            </div>
          </div>

          <div
            class="card shadow-sm mb-3 border-0"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            <div class="card-header" id="headingThree">
              <p class="m-0 text-left d-flex align-items-center font-weight-normal">
                <span class="numfont text-white bg-secondary p-3 rounded mr-4">Q3</span>
                我的訂單什麼時候會到呢?
              </p>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <p>
                  一般來說超商3天，宅配24小時內送達，若有突發狀況我們會於官網通知各位
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-6">
        <h3>其他相似商品</h3>
        <div class="row border-1 border-top my-4 pl-3 pt-4 overflow-auto">
          <div class="col-2 mr-4" :class="{ 'd-none': !isLoading }" v-for="index in 5" :key="index">
            <div class="cards w-100">
              <div class="limage card-img-top hpx-20"></div>
              <p class="isload p-3 mt-2"></p>
            </div>
          </div>
          <div class="d-flex">
            <div class="card thumbnail wpx-20 mr-4" v-for="item in getsameproduct" :key="item.id">
              <a @click.prevent="getproduct(item.id)">
                <img class="card-img-top hpx-15" :src="item.imageUrl" :alt="item.category" />
              </a>
              <div class="card-body">
                <a @click.prevent="getproduct(item.id)">
                  <span class="badge badge-info">{{ item.category }}</span>
                  <h5>{{ item.title }}</h5>
                </a>
                <div class="d-flex justify-content-between">
                  <p v-if="item.price">
                    {{ item.price | currency }}
                    <span class="price-unit"> /{{ item.unit }} </span>
                  </p>
                  <p v-else>
                    {{ item.origin_price | currency }}
                    <span class="price-unit"> /{{ item.unit }} </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-secondary rounded-0"
                @click="addcart(item)"
              >
                <i class="fas fa-tag"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer class="flex-shrink-0" />
    <Cartbtn :cartnum="cartlong" />
  </div>
</template>

<script>
import $ from 'jquery';
import Footer from '@/components/Footer';
import Cartbtn from '@/components/kit/Cartbtn';

export default {
  components: {
    Footer,
    Cartbtn,
  },
  inject: ['reload'],
  data() {
    return {
      product: {
        content: '',
        description: '',
      },
      swiperOptionTop: {
        loop: false,
        loopedSlides: 5,
        spaceBetween: 10,
        watchOverflow: true,
      },
      swiperOptionThumbs: {
        loop: false,
        loopedSlides: 5,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        watchOverflow: true,
      },
      custproducts: [],
      imagepack: [],
      incart: JSON.parse(localStorage.getItem('mycart')) || [],
      infobar: 'description',
      qablock: 'q1',
      cartlong: 0,
      qty: 1,
      isLoading: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });

    $('#info_accordion').collapse();
    $('.collapse').collapse();
  },
  created() {
    this.getproduct(this.$route.params.productId);
    this.getproducts();
  },
  computed: {
    getsameproduct() {
      const vm = this;
      return vm.custproducts.filter(
        (item) => item.id !== vm.product.id && item.category === vm.product.category
      );
    },
  },
  methods: {
    getproducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((resp) => {
        vm.custproducts = resp.data.products;
      });
    },
    getproduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.isLoading = true;
      vm.cartlong = vm.incart.length;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.product.description = response.data.product.description.replace(/\n/g, '<br/>');
        vm.product.content = response.data.product.content.replace(/\n/g, '<br/>');
        window.scrollTo({ top: 0, Left: 0, behavior: 'smooth' });
        vm.isLoading = false;
      });
    },
    addcart(data) {
      const vm = this;
      const cacheCarID = [];
      vm.isLoading = true;
      vm.incart.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          category: data.category,
          content: data.content,
          description: data.description,
          id: data.id,
          imageUrl: data.imageUrl,
          origin_price: data.origin_price,
          price: data.price,
          title: data.title,
          unit: data.unit,
          product_id: data.id,
          qty: vm.qty,
        };
        vm.incart.push(cartContent);
        localStorage.setItem('mycart', JSON.stringify(vm.incart));
        vm.isLoading = false;
      } else {
        let cache = {};
        vm.incart.forEach((item, keys) => {
          if (item.product_id === data.id) {
            let { qty } = item;
            cache = {
              category: data.category,
              content: data.content,
              description: data.description,
              id: data.id,
              imageUrl: data.imageUrl,
              origin_price: data.origin_price,
              price: data.price,
              title: data.title,
              unit: data.unit,
              product_id: data.id,
              qty: (qty += vm.qty),
            };
            vm.incart.splice(keys, 1, cache);
          }
        });
        localStorage.setItem('mycart', JSON.stringify(vm.incart));
        vm.isLoading = false;
      }
      vm.cartlong = vm.incart.length;
    },
    currentSlide(n) {
      let slides = document.querySelectorAll('.mySlides');
      let dots = document.querySelectorAll('.demo');
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = '0';
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace('activee', '');
      }
      slides[n].style.opacity = '1';
      dots[n].className += ' activee';
    },
  },
};
</script>

<style scoped>
.minheight {
  min-height: 100vh;
}

.actives {
  border-bottom: 3px solid;
  border-color: #9edeae;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.collapseicon {
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.collapseicon span {
  display: block;
  height: 1px;
  width: 100%;
  border-radius: 9px;
  transition: 0.25s ease-in-out;
}

.collapseicon span:nth-child(1) {
  transform: rotate(-90deg);
}

.collapseicon span:nth-child(2) {
  transform: rotate(0deg);
}

.isopen span:nth-child(1) {
  transform: rotate(0deg);
}

.isopen span:nth-child(2) {
  transform: rotate(0deg);
}

div {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 300;
}

.numfont {
  font-family: 'Rubik', sans-serif;
}
</style>
