<template>
  <div>
    <div class="container">
      <div class="card text-center form-signin mt-md-9 mt-5">
        <div class="card-body">
          <form @submit.prevent="login">
            <h3 class="mb-3 font-weight-normal">登入</h3>
            <label for="inputEmail" class="sr-only">電子郵件</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              v-model="user.username"
              required
              autofocus
            />
            <label for="inputPassword" class="sr-only">密碼</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <div class="checkbox mb-3 text-right">
              <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
            </div>
            <button class="btn btn-lg btn-maincolor btn-block" type="submit">
              登入
            </button>
          </form>
          <div class="text-center align-items-center mt-4">
            <img
              class="img-fluid mb-2 hrem-3"
              src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
              alt="logo"
            />
            <h3 class="font-weight-normal">台味</h3>
            <p>後臺管理系統</p>
          </div>
          <p class="mt-5 mb-3 text-muted">&copy; 僅供練習用,無商業服務</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token } = response.data;
          const { expired } = response.data;
          document.cookie = `custToken=${token};expires=${new Date(expired)};`;
          vm.$router.push('/dashboard/products');
        }
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
</style>
