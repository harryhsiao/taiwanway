<template>
  <div>
    <nav class="col-md-2 bg-light sidebar" :class="{ showSidebar: !tran, hideSidebar: tran }">
      <div class="d-flex justify-content-between align-items-center pt-7">
        <h6 class="h2 px-3 mb-1 text-muted w-80">
          管理員項目
        </h6>
        <div class="w-20">
          <button
            type="button"
            class="text-muted py-4 d-md-none d-block w-100 border-0 "
            @click="onsider"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
      <div class="sidebar-sticky pt-0">
        <ul class="nav flex-column d-md-block d-none">
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/products">
              <i class="fas fa-box-open fa-fw"></i>&nbsp;&nbsp;產品列表
            </router-link>
          </li>
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/orders">
              <i class="fas fa-clipboard-list fa-fw"></i>&nbsp;&nbsp;訂單列表
            </router-link>
          </li>
          <li class="nav-item border py-4">
            <router-link class="nav-link h4" to="/dashboard/coupon">
              <i class="fas fa-ticket-alt fa-fw"></i>&nbsp;&nbsp;優惠券
            </router-link>
          </li>
          <li class="nav-item border py-4">
            <a class="nav-link h4" href="#" @click.prevent="logout()">
              <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;登出
            </a>
          </li>
        </ul>
        <ul class="nav flex-column d-md-none d-block">
          <li class="nav-item border py-4" @click="onsider">
            <router-link class="nav-link h4" to="/dashboard/products">
              <i class="fas fa-box-open fa-fw"></i>&nbsp;&nbsp;產品列表
            </router-link>
          </li>
          <li class="nav-item border py-4" @click="onsider">
            <router-link class="nav-link h4" to="/dashboard/orders">
              <i class="fas fa-clipboard-list fa-fw"></i>&nbsp;&nbsp;訂單列表
            </router-link>
          </li>
          <li class="nav-item border py-4" @click="onsider">
            <router-link class="nav-link h4" to="/dashboard/coupon">
              <i class="fas fa-ticket-alt fa-fw"></i>&nbsp;&nbsp;優惠券
            </router-link>
          </li>
          <li class="nav-item border py-4">
            <a class="nav-link h4" href="#" @click.prevent="logout()">
              <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;登出
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <button
      type="button"
      class="btn btn-light px-0 pl-2 pr-1 scrollbtn-sticky text-muted d-md-none d-block"
      @click="onsider"
      :class="{ showSidebarbtn: tran, hideSidebarbtn: !tran }"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      tran: false,
    };
  },
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/');
        }
      });
    },
    onsider() {
      const vm = this;
      vm.tran = !vm.tran;
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.hideSidebar {
  transform: translate(-100%);
}

.showSidebar {
  transform: translate(0%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.scrollbtn-sticky {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  transition: left cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.hideSidebarbtn {
  left: 100%;
  transition: left cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.showSidebarbtn {
  left: 0;
  transition: left cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
