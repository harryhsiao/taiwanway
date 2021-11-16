<template>
  <div>
    <nav
      class="navbar navbar-expand-lg w-100 px-md-5 zindex-200"
      :class="[stylechange, { 'bg-maincolor': hambtn }]"
    >
      <router-link to="/" class="navbar-brand bg-transparent shadow-none" :class="`d-${logoapper}`">
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
          <router-link class="nav-item nav-link" to="/Store">線上訂購</router-link>
          <router-link class="nav-item nav-link" to="/shop">門市據點</router-link>
          <router-link
            tag="button"
            class="btn btn-secondary badge-pill ml-3"
            to="/login"
            href="#"
            v-if="memberin === false"
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
  name: 'NavBar',
  data() {
    return {
      windowTop: 0,
      memberin: false,
      hambtn: false,
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
      const homePath = vm.$route.path;
      switch (homePath) {
        case '/':
          if (vm.windowTop > 150) {
            return 'navbar-light bg-maincolor position-fixed bar-top py-lg-2';
          }

          if (vm.windowTop > 100) {
            return 'navbar-light bg-maincolor position-absolute bar-top-miner py-lg-2';
          }

          return 'navbar-dark position-absolute py-lg-2';

        default:
          return 'navbar-light bg-maincolor fixed-top p-2';
      }
    },
    logoapper() {
      const vm = this;
      const homePath = vm.$route.path;
      switch (homePath) {
        case '/':
          if (vm.windowTop > 150) {
            return 'inline-block';
          }

          if (vm.windowTop > 100) {
            return 'none';
          }

          return 'none';

        default:
          return 'inline-block';
      }
    },
    hambtncontrol() {
      const vm = this;
      if (vm.hambtn) {
        return 'bg-transparent';
      }
      return 'bg-maincolor';
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
        if (response.data.success) {
          vm.memberin = true;
        } else {
          vm.memberin = false;
        }
      });
    },
  },
};
</script>
