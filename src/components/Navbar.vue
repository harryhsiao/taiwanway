<template>
  <div>
    <nav
      class="navbar navbar-expand-lg w-100 px-md-5"
      :class="[stylechange, { 'bg-maincolor': hambtn }]"
      style="z-index:9999;"
    >
      <router-link to="/" class="navbar-brand bg-transparent shadow-none" :class="logoapper">
        <img width="30" height="50" src="https://upload.cc/i1/2021/03/17/DuLmv7.png" alt="logo" />
      </router-link>
      <button
        @touchstart="hambtn = !hambtn"
        class="navbar-toggler border-0 ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div class="animated-icon" :class="{ open: hambtn }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto navtext">
          <router-link class="nav-item nav-link" to="/">品牌介紹</router-link>
          <router-link class="nav-item nav-link" to="/menu">美味菜單</router-link>
          <router-link class="nav-item nav-link" to="/cart">線上訂購</router-link>
          <router-link class="nav-item nav-link" to="/shop">門市據點</router-link>
          <router-link
            tag="button"
            class="btn btn-secondary badge-pill ml-3"
            to="/login"
            href="#"
            v-if="memberin == false"
          >
            登入
          </router-link>
          <div class="dropdown" v-else>
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-light text-earthy rounded-circle mr-2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
              <router-link class="dropdown-item" to="/dashboard/products" href="#"
                >客戶中心</router-link
              >
              <a class="dropdown-item" href="#" @click.prevent="logout()">登出</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowTop: 0,
      memberin: false,
      hambtn: false,
      logoapper: 'd-none',
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  created() {
    this.islogin();
  },
  computed: {
    stylechange() {
      const vm = this;
      let homePath = vm.$route.path;
      switch (homePath) {
        case '/':
          if (vm.windowTop > 150) {
            vm.logoapper = 'd-inline-block';
            return 'navbar-light bg-maincolor position-fixed top-0 py-lg-2';
          } else if (vm.windowTop > 100) {
            vm.logoapper = 'd-none';
            return 'navbar-light bg-maincolor position-absolute top-miner-100 py-lg-2';
          } else {
            return 'navbar-dark position-absolute py-lg-2';
          }
        default:
          vm.logoapper = 'd-inline-block';
          return 'navbar-light bg-maincolor fixed-top p-2';
      }
    },
    hambtncontrol() {
      const vm = this;
      if (vm.hambtn) {
        return 'bg-transparent';
      } else {
        return 'bg-maincolor';
      }
    },
  },
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.memberin = false;
          vm.$router.push('/');
        }
      });
    },
    onScroll() {
      const vm = this;
      vm.windowTop = window.top.scrollY;
    },
    islogin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      vm.$http.post(api).then((response) => {
        if (!response.data.success) {
          vm.memberin = false;
        } else {
          vm.memberin = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.top-0 {
  top: 0;
  transition: top cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}
.top-miner-100 {
  top: -100px;
  transition: top cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}
</style>
