<template>
  <div>
    <div class="jumbotron jumbotron-fluid menu-image image-cover">
      <div class="container menu-title-box text-center">
        <img
          class="img-fluid mx-auto hpx-9 mt-5 mb-3"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt="logo"
        />
        <h2 class="text-center mx-auto jumbtitle">本店菜單<br />Menu</h2>
      </div>
    </div>
    <div class="container">
      <div class="title text-center text-white bg-secondary pt-3 pb-2">
        <h2>主食</h2>
        <p>Main Dish</p>
      </div>
      <div class="row">
        <div
          class="col-md-6 mb-3"
          :class="{ 'd-none': !isLoading }"
          v-for="index in 5"
          :key="index"
        >
          <div class="cards w-100 d-flex mt-3 mr-3 p-3">
            <div class="limage card-img-top hvh-10 w-25"></div>
            <div class="infobox ml-3 w-75">
              <h3 class="isload p-3 mt-2"></h3>
              <h3 class="isload p-3 mt-2"></h3>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-for="item in main_dish" :key="item.id">
          <div class="menucard d-flex mt-3 mr-3 p-3">
            <div class="photobox w-25">
              <img class="w-100 hvh-10" :src="item.imageUrl" :alt="item.title" />
            </div>
            <div class="infobox ml-3 w-75">
              <div class="d-flex justify-content-between align-items-center">
                <h3>{{ item.title }}</h3>
                <h3 v-if="item.price">{{ item.price | currency }}</h3>
                <h3 v-else>{{ item.origin_price | currency }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-md-6">
          <div class="title text-center text-white bg-secondary pt-3 pb-2">
            <h2>點心</h2>
            <p>Dessert</p>
          </div>
          <div class="mb-3" :class="{ 'd-none': !isLoading }" v-for="index in 5" :key="index">
            <div class="cards w-100 d-flex mt-3 mr-3 p-3">
              <div class="limage card-img-top hvh-10 w-25"></div>
              <div class="infobox ml-3 w-75">
                <h3 class="isload p-3 mt-2"></h3>
                <h3 class="isload p-3 mt-2"></h3>
              </div>
            </div>
          </div>
          <div v-for="item in dessert" :key="item.id">
            <div class="menucard d-flex mt-3 mr-3 p-3">
              <div class="photobox w-25">
                <img class="w-100" :src="item.imageUrl" :alt="item.title" />
              </div>
              <div class="infobox ml-3 w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <h3>{{ item.title }}</h3>
                  <h3 v-if="item.price">{{ item.price | currency }}</h3>
                  <h3 v-else>{{ item.origin_price | currency }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="title text-center text-white bg-secondary pt-3 pb-2">
            <h2>開胃小菜</h2>
            <p>On The Side</p>
          </div>
          <div class="mb-3" :class="{ 'd-none': !isLoading }" v-for="index in 5" :key="index">
            <div class="cards w-100 d-flex mt-3 mr-3 p-3">
              <div class="limage card-img-top hvh-10 w-25"></div>
              <div class="infobox ml-3 w-75">
                <h3 class="isload p-3 mt-2"></h3>
                <h3 class="isload p-3 mt-2"></h3>
              </div>
            </div>
          </div>
          <div v-for="item in on_the_side" :key="item.id">
            <div class="menucard d-flex mt-3 mr-3 p-3">
              <div class="photobox w-25">
                <img class="w-100" :src="item.imageUrl" :alt="item.title" />
              </div>
              <div class="infobox ml-3 w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <h3>{{ item.title }}</h3>
                  <h3 v-if="item.price">{{ item.price | currency }}</h3>
                  <h3 v-else>{{ item.origin_price | currency }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="flex-shrink-0" />
  </div>
</template>

<script>
import Footer from '../Footer.vue'

export default {
  name: 'MenuPage',
  components: {
    Footer
  },
  data () {
    return {
      custproducts: [],
      menuproducts: [],
      main_dish: [],
      on_the_side: [],
      dessert: [],
      sort: [],
      status: {
        barValue: 0,
        isLoading: false,
        fileuploading: false
      }
    }
  },
  created () {
    this.getproducts()
  },
  methods: {
    getproducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      setTimeout(() => {
        vm.$http
          .get(api)
          .then((resp) => {
            vm.custproducts = resp.data.products
            vm.isLoading = false
          })
          .then(() => {
            vm.isSwitchOn()
          })
      }, 4000)
    },
    isSwitchOn () {
      const vm = this
      vm.custproducts.forEach((item) => {
        if (item.category === '點心') {
          vm.dessert.push(item)
        } else if (item.category === '調味料') {
          vm.on_the_side.push(item)
        } else {
          vm.main_dish.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>
.loadopacity {
  transition: opacity ease-in-out 0.3s;
}
.menu-content {
  writing-mode: vertical-rl;
  font-size: 2rem;
}
.thumbnail:hover {
  transition: box-shadow ease-in-out 0.3s;
  box-shadow: 0 1rem 1rem rgb(0 0 0 / 8%);
}
.fullpg-bgcover {
  transition: background-color ease-in-out 0.3s;
}
.price-style {
  list-style: none;
}
.price-style li span {
  writing-mode: horizontal-tb;
  color: tomato;
}

.progress-bar {
  width: 0%;
  animation: progres 4s linear;
  animation-fill-mode: forwards;
}

@keyframes progres {
  0% {
    width: 0%;
  }
  25% {
    width: 50%;
  }
  50% {
    width: 75%;
  }
  75% {
    width: 85%;
  }
  100% {
    width: 100%;
  }
}
</style>
