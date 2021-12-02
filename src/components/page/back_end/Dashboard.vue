<template>
  <div>
    <Alertnote />
    <div class="container-fluid pt-7">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Alertnote from '../../kit/Alert_note.vue'

export default {
  name: 'BackEndDashboard',
  data () {
    return {
      paginations: {}
    }
  },
  components: {
    Sidebar,
    Alertnote
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)custToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    this.$http.defaults.headers.common.Authorization = `${token}`
    this.getproducts()
  },
  methods: {
    getproducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.$http.get(api).then((response) => {
        vm.paginations = response.data.pagination
      })
    }
  }
}
</script>

<style scoped>
body {
  font-size: 0.875rem;
}
navbar {
  z-index: 0;
}
</style>
