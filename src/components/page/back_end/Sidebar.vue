<template>
  <div>
    <!--a class="text-muted" href="#" @click.prevent="onsider" style="margin-top:500px; z-index:99999px;">
      <i class="fas fa-chevron-left"></i>
    </a-->
    <nav class="col-md-2 bg-light sidebar" :class="{ showSidebar: !tran, hideSidebar: tran }">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span class="h2">管理員項目</span>
          <a class="text-muted" href="#" @click.prevent="onsider">
            <i class="fas fa-chevron-left"></i>
          </a>
        </h6>
        <ul class="nav flex-column">
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
        <!--ul class="nav flex-column d-md-none d-block">
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
        </ul-->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
  transition: transform ease-in-out 0.5s;
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
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
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
