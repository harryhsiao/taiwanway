/* eslint-disable array-callback-return */
<template>
  <div>
    <Alertnote />
    <div class="jumbotron jumbotron-fluid text-white main-image image-cover mt-6">
      <div class="d-flex justify-content-center image-text-combo text-center align-items-center">
        <img
          class="img-fluid mb-2 hpx-10"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt="logo"
        />
        <h3 class="text-white border-top pt-4">台灣特色料理餐廳</h3>
      </div>
    </div>
    <div class="container">
      <h3 class="text-center mt-5 mb-6">輸入您要找的商品</h3>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control py-4 px-2"
          placeholder="輸入想要搜尋的商品"
          aria-label="輸入想要搜尋的商品"
          aria-describedby="button-addon2"
          v-model="productsearch"
        />
        <div class="input-group-append">
          <span class="input-group-text">搜尋</span>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-5">
        <div class="border-top w-40"></div>
        <p class="h3">或</p>
        <div class="border-top w-40"></div>
      </div>
    </div>
    <div class="bg-white sticky-top w-100" style="top: 4rem; z-index: 100;">
      <div class="container">
        <div class="pt-md-5 pb-md-4 py-3">
          <p class="text-center h3 mb-md-5 mb-3">看看有什麼好咪亞</p>
          <select
            name="fliter_option"
            id="fliter_option"
            class="d-sm-none d-block w-100 mb-4 py-2 px-2"
            @change="changeValue"
          >
            <option v-for="(item, index) in categorys" :key="index">
              {{ item }}
            </option>
          </select>
          <a
            href="#"
            class="
            btn
            btn-outline-dark
            d-sm-inline-block
            d-none
            py-3
            px-5
            mr-3
            badge-pill
            rounded-pill
            h3
            chselection
            fill
            "
            v-for="(item, index) in categorys"
            :key="index"
            :class="{ active: optiontext === item }"
            @click.prevent="changeoption"
          >
            {{ item }}
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-md-4 mb-3"
          :class="{ 'd-none': !isLoading }"
          v-for="index in 10"
          :key="index"
        >
          <div class="cards w-100">
            <div class="limage card-img-top hpx-20"></div>
            <p class="isload p-3 mt-2"></p>
          </div>
        </div>
        <div
          class="col-md-4 mb-3"
          :class="{ 'd-none': isLoading }"
          v-for="item in filtersdata[currentpage]"
          :key="item.id"
        >
          <div class="card rounded thumbnail h-100">
            <router-link :to="{ path: `/product/${item.id}` }">
              <img
                class="card-img position-relative hrem-15"
                :src="item.imageUrl"
                :alt="item.category"
              />
              <div class="card-img-overlay">
                <div class="d-flex align-items-center justify-content-between">
                  <h2
                    class="
                    text-white
                    jumbtitle
                    px-3
                    py-2
                    font-weight-bold"
                  >
                    {{ item.title }}
                  </h2>
                  <p class="badge badge-maincolor text-white py-2 lettersp-3 px-3">
                    {{ item.category }}
                  </p>
                </div>
                <div class="position-absolute" style="right: 5%; bottom: 20%;">
                  <p class="h2 text-white jumbtitle text-right" v-if="item.price">
                    {{ item.price | currency }}
                  </p>
                  <p class="h2 text-danger jumbtitle text-right" v-else>
                    {{ item.origin_price | currency }}
                  </p>
                </div>
              </div>
            </router-link>
            <button
              class="btn btn-outline-secondary rounded-0 py-3 cartbtn zindex-10"
              id="add_cart_btn"
              type="button"
              @click="addcart(item)"
            >
              <i class="fas fa-tag"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="filtersdata.length > 1">
        <div class="pagination pg-num my-6">
          <ul class="d-flex justify-content-between m-0 p-0">
            <li>
              <a href="#" @click.prevent="prev" v-if="currentpage !== 0">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>
            <li>
              <a
                v-for="(page, key) in filtersdata.length"
                :key="key"
                :class="{ is_active: currentpage === page - 1 }"
                @click.prevent="currentpage = page - 1"
                href="#"
              >
                {{ page }}
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="next" v-if="currentpage !== filtersdata.length - 1">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Cartbtn :cartnum="cartlong" />
  </div>
</template>

<script>
import Alertnote from '../../../kit/Alert_note.vue';
import Cartbtn from '../../../kit/Cart_btn.vue';

export default {
  name: 'CartPage',
  data() {
    return {
      custproducts: [],
      incart: JSON.parse(localStorage.getItem('mycart')) || [],
      cartnum: [],
      cartid: [],
      onEnabled: [],
      categorys: ['全部商品'],
      selected: 0,
      currentpage: 0,
      productsearch: '',
      cartlong: '',
      optiontext: '全部商品',
      searchtext: '',
      isLoading: false,
    };
  },
  components: {
    Alertnote,
    Cartbtn,
  },
  created() {
    this.getproducts();
    this.getcart();
    this.cartnums();
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    getcart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(api).then((resp) => {
        vm.cartnum = resp.data.data.carts;
        vm.cartnum.forEach((item) => {
          vm.cartid.push(item.product_id);
        });
        vm.isLoading = false;
      });
    },
    getproducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(api).then((resp) => {
        vm.onEnabled = resp.data.products;
        vm.onEnabled.forEach((item) => {
          if (item.is_enabled === 1) {
            vm.custproducts.push(item);
          }
        });
        vm.getoption(vm.custproducts);
        vm.isLoading = false;
      });
    },
    cartnums() {
      const vm = this;
      vm.cartlong = vm.incart.length;
    },
    addcart(data) {
      const vm = this;
      const cacheCarID = [];
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
          origin_price: parseInt(data.origin_price, 10),
          price: parseInt(data.price, 10),
          title: data.title,
          unit: data.unit,
          product_id: data.id,
          qty: 1,
        };
        vm.incart.push(cartContent);
        localStorage.setItem('mycart', JSON.stringify(vm.incart));
      } else {
        vm.$bus.$emit('message:push', '已經在購物車囉~', 'warning');
      }
      vm.cartlong = vm.incart.length;
    },
    getoption(element) {
      const vm = this;
      element.forEach((el) => {
        if (vm.categorys.indexOf(el.category) === -1 && el.is_enabled === 1) {
          vm.categorys.push(el.category);
        }
      });
    },
    changeoption(e) {
      const vm = this;
      const optioncontent = e.target.text;
      vm.optiontext = optioncontent.split(' ').join('');
    },
    changeValue(e) {
      const vm = this;
      vm.optiontext = e.target.value;
    },
    onScroll() {
      const vm = this;
      vm.windowTop = window.top.scrollY;
    },
    prev() {
      const vm = this;
      if (vm.currentpage === 0) {
        vm.currentpage = 0;
      } else {
        vm.currentpage -= 1;
      }
    },
    next() {
      const vm = this;
      if (vm.currentpage === vm.filtersdata.length - 1) {
        vm.currentpage = vm.filtersdata.length - 1;
      } else {
        vm.currentpage += 1;
      }
    },
  },
  computed: {
    filtersdata() {
      const vm = this;
      let tempData = [];
      const filtersproducts = [];
      const search = vm.custproducts.filter((item) => item.title.includes(vm.productsearch));
      const option = vm.custproducts.filter((item) => vm.optiontext === item.category);
      switch (vm.productsearch) {
        case '':
          if (vm.optiontext === '全部商品' || vm.optiontext === '') {
            tempData = vm.custproducts;
          } else {
            tempData = option;
          }
          break;
        default:
          tempData = search;
          break;
      }

      tempData.forEach((item, index) => {
        if (index % 12 === 0) {
          filtersproducts.push([]);
        }
        const pagenum = parseInt(index / 12, 10);
        filtersproducts[pagenum].push(item);
      });

      return filtersproducts;
    },
  },
};
</script>
