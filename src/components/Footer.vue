<template>
  <div>
    <footer class="bg-secondcolor">
      <div class="container pt-4">
        <div class="row py-4">
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0 d-md-block d-flex align-items-center image-text-combo">
            <img
              src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
              alt="logo"
              width="50"
              class="mb-3 mx-7 align-items-center"
            />
            <p class="font-italic text-dimegray">
              飄香一甲子，傳承好味道
            </p>
            <ul class="list-inline mt-4 mx-3">
              <li class="list-inline-item">
                <router-link to="https://github.com/harryhsiao/taiwanway" class="text-dimegray mx-2" target="_blank" title="twitter"><i class="fab fa-twitter"></i></router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="https://github.com/harryhsiao/taiwanway" class="text-dimegray mx-2" target="_blank" title="facebook"><i class="fab fa-facebook"></i></router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="https://github.com/harryhsiao/taiwanway" class="text-dimegray mx-2" target="_blank" title="instagram"><i class="fab fa-instagram"></i></router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="https://github.com/harryhsiao/taiwanway" class="text-dimegray mx-2" target="_blank" title="pinterest"><i class="fab fa-pinterest"></i></router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 d-md-block d-none">
            <h6 class="text-uppercase font-weight-bold mb-4">店鋪資訊</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2"><router-link to="/Shop" class="text-dimegray">台南</router-link></li>
              <li class="mb-2"><router-link to="/Shop" class="text-dimegray">雙北</router-link></li>
              <li class="mb-2"><router-link to="/Shop" class="text-dimegray">台中</router-link></li>
              <li class="mb-2"><router-link to="/Shop" class="text-dimegray">高雄</router-link></li>
               <li class="mb-2"><router-link to="/Shop" class="text-dimegray">宜蘭</router-link></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0 d-md-block d-none">
            <h6 class="text-uppercase font-weight-bold mb-4">關於我們</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2"><router-link to="/Login" class="text-dimegray">登入</router-link></li>
              <li class="mb-2"><router-link to="/Menu" class="text-dimegray">菜單</router-link></li>
              <li class="mb-2"><router-link to="/Cart" class="text-dimegray">商品</router-link></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6 mb-lg-0 mb-5">
            <h6 class="text-uppercase font-weight-bold mb-4">訂閱電子報</h6>
            <p class="text-dimegray mb-4">
              不想錯過優惠以及令人期待的新菜色?馬上訂閱我們以獲取最新的相關資訊
            </p>
            <div class="p-1 rounded border">
              <div class="input-group">
                <input
                  type="email"
                  placeholder="輸入 email 訂閱電子報(無實體功能)"
                  aria-describedby="button-addon1"
                  class="form-control border-0 shadow-0"
                />
                <div class="input-group-append">
                  <button id="button-addon1" type="submit" class="btn btn-link text-white bg-dark">
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </footer>
  </div>
</template>
