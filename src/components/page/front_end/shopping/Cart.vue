<template>
  <div>
    <Alertcard />
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
      <div class="row">
        <!--商品過濾選項-->
        <div class="col-sm-4">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="輸入想要搜尋的商品"
              aria-label="輸入想要搜尋的商品"
              aria-describedby="button-addon2"
              v-model="productsearch"
            />
            <div class="input-group-append">
              <span class="input-group-text">搜尋</span>
            </div>
          </div>
          <div class="list-group d-none d-sm-block">
            <a
              href="#"
              class="list-group-item list-group-item-action border-0 h3 chselection"
              v-for="(item, index) in categorys"
              :key="index"
              :class="{ active: optiontext === item }"
              @click.prevent="changeoption"
              >{{ item }}</a
            >
          </div>
          <select
            name=""
            id=""
            class="d-sm-none d-block w-100 mb-4 py-2 px-2"
            @change="changeValue"
          >
            <option v-for="(item, index) in categorys" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
        <!--商品過濾選項-->
        <!--商品-->
        <div class="col-sm-8">
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
                class="col-md-6 col-lg-4 mb-3"
                :class="{ 'd-none': isLoading }"
                v-for="item in filtersdata[currentpage]"
                :key="item.id"
              >
                <div class="card thumbnail">
                  <router-link :to="{ path: `/product/${item.id}` }">
                    <img class="card-img-top hpx-15" :src="item.imageUrl" :alt="item.category" />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="{ path: `/product/${item.id}` }">
                      <span class="badge badge-info">
                        {{ item.category }}
                      </span>
                      <h5>{{ item.title }}</h5>
                    </router-link>
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
                    class="btn btn-outline-secondary rounded-0 cartbtn"
                    id="add_cart_btn"
                    type="button"
                    @click="addcart(item)"
                  >
                    <i class="fas fa-tag"></i>
                    加入購物車
                  </button>
                </div>
                <!--商品-->
              </div>
              <!--Alertnote /-->
              <div class="container">
                <div class="row justify-content-center">
                  <div class="pagination pg-num pt-4 pl-4 mb-5">
                    <ul class="m-0 p-0">
                      <a href="#" @click.prevent="prev"
                        ><li><i class="fas fa-chevron-left"></i></li
                      ></a>
                      <a
                        v-for="(page, key) in filtersdata.length"
                        :key="key"
                        :class="{ is_active: currentpage === page - 1 }"
                        @click.prevent="currentpage = page - 1"
                        href="#"
                        ><li>{{ page }}</li></a
                      >
                      <a href="#" @click.prevent="next"
                        ><li><i class="fas fa-chevron-right"></i></li
                      ></a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cartbtn :cartnum="cartlong" />
  </div>
</template>

<script>
//import Alertnote from '@/components/kit/Alertnote';
import Alertcard from '@/components/kit/Alertcard';
import Cartbtn from '@/components/kit/Cartbtn';

export default {
  data() {
    return {
      custproducts: [],
      filtersproducts: [],
      incart: JSON.parse(localStorage.getItem('mycart')) || [],
      cartnum: [],
      cartid: [],
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
    Alertcard,
    //Alertnote,
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
        vm.custproducts = resp.data.products;
        vm.getoption(vm.custproducts);
        setTimeout(() => {
          vm.isLoading = false;
        }, 5000);
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
          origin_price: parseInt(data.origin_price),
          price: parseInt(data.price),
          title: data.title,
          unit: data.unit,
          product_id: data.id,
          qty: 1,
        };
        vm.incart.push(cartContent);
        localStorage.setItem('mycart', JSON.stringify(vm.incart));
      } else {
        //vm.$bus.$emit('messsage:push', '已經在購物車囉~', 'success');
        vm.$infomodal.$emit('messsage:push', '已經在購物車囉~', 'success', 'tick');
      }
      vm.cartlong = vm.incart.length;
    },
    getoption(element) {
      const vm = this;
      element.forEach(function(el) {
        if (vm.categorys.indexOf(el.category) === -1 && el.is_enabled === 1) {
          vm.categorys.push(el.category);
        }
      });
    },
    changeoption(e) {
      const vm = this;
      vm.optiontext = e.target.text;
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
        vm.currentpage--;
      }
    },
    next() {
      const vm = this;
      if (vm.currentpage === vm.filtersproducts.length - 1) {
        vm.currentpage = vm.filtersproducts.length - 1;
      } else {
        vm.currentpage++;
      }
    },
  },
  computed: {
    categoryData() {
      const vm = this;
      let category = '';
      return vm.custproducts.reduce((prev, curr) => {
        if (curr.category !== category) {
          prev.push(curr.category);
        }
        category = curr.category;
        return prev;
      }, []);
    },
    filtersdata() {
      const vm = this;
      let tempData = [];
      vm.currentpage = 0;
      vm.filtersproducts = [];
      tempData = vm.custproducts.filter((item) => {
        if (item.is_enabled === 1) {
          if (vm.productsearch === '') {
            if (vm.optiontext === '全部商品' || vm.optiontext === '') {
              return vm.custproducts;
            } else if (vm.optiontext === item.category) {
              return item;
            }
          } else {
            return item.title.match(vm.productsearch);
          }
        }
      });
      tempData.forEach((item, i) => {
        if (i % 10 == 0) {
          vm.filtersproducts.push([]);
        }
        const pagenum = parseInt(i / 10);
        vm.filtersproducts[pagenum].push(item);
      });

      return vm.filtersproducts;
    },
  },
};
</script>

<style scoped>
.chselection {
  background: linear-gradient(to left, transparent 50%, #9edeae 50%) right;
  background-size: 200%;
  transition: 0.5s ease-out;
  outline: none;
}

.chselection:hover {
  background-position: left;
  color: #edf9ff;
}

.active {
  color: #9edeae;
  outline: 0;
  border: none;
}
</style>
