<template>
  <div>
    <section class="section">
      <div
        class="
                main-image
                hvh-6
                image-text-combo
                bg-attachment
                image-cover
                d-flex
                justify-content-center
                text-center
                align-items-center"
      >
        <img
          class="img-fluid mb-2 hrem-9"
          src="https://upload.cc/i1/2021/03/17/DuLmv7.png"
          alt="logo"
        />
        <p class="text-white border-top pt-4 h3">台灣特色料理餐廳</p>
      </div>
      <div class="text-center pt-5" data-aos="fade-in" data-aos-delay="100" data-aos-offset="50">
        <h2 class="lsp-8 lsp-md-2">
          飄香一甲子<br class="d-md-none" /><span class="d-md-inline d-none">，</span>傳承好味道
        </h2>
        <p class="lsp-3">
          Fragrant fragrance<br class="d-md-none" /><span class="d-md-inline d-none"> , </span>good
          taste inherited
        </p>
      </div>
      <div class="text-center pt-md-8">
        <a href="#" @click.prevent="goto">
          <img src="https://afuri.com/img/index/link04.gif" alt="下滑提示" />
        </a>
      </div>
    </section>
    <section class="section py-md-8 py-4" id="ingred">
      <h2 class="text-center py-4" data-aos="fade-in" data-aos-delay="50" data-aos-offset="200">
        食材<br />Ingredients
      </h2>
      <div class="container">
        <div class="row">
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="50" data-aos-offset="100">
            <div class="img-hover-text position-relative overflow-hidden">
              <img src="https://upload.cc/i1/2021/08/01/ipq25Q.jpg" class="img-fluid" alt="蔬果" />
              <ul
                class="h-100 furittext position-absolute w-100 p-md-4 py-2 text-white"
                style="backdrop-filter: blur(10px)"
              >
                <li class="d-flex align-items-center">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://greenbox.tw/upload/News_3032/201511130859001.jpg"
                    alt="吉園圃"
                  />
                  <p class="pl-3 mb-0">吉園圃認證</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/08/01/aep649.jpg"
                    alt="優良"
                  />
                  <p class="pl-3 mb-0">CAS台灣優良農產品</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/08/01/F3jpCE.jpg"
                    alt="有機"
                  />
                  <p class="pl-3 mb-0">CAS台灣有機農產品</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/08/01/Cf18c9.jpg"
                    alt="產銷履歷"
                  />
                  <p class="pl-3 mb-0">符合產銷履歷</p>
                </li>
              </ul>
            </div>
            <h3 class="mt-3 text-center">嚴選本土蔬果</h3>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="100" data-aos-offset="100">
            <div class="img-hover-text position-relative overflow-hidden">
              <img src="https://upload.cc/i1/2021/08/01/tkUBCb.jpg" class="img-fluid" alt="海產" />
              <ul
                class="h-100 furittext position-absolute w-100 p-4 text-white"
                style="backdrop-filter: blur(10px)"
              >
                <li class="d-flex align-items-center">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/08/01/zdCsxK.jpg"
                    alt="海洋之心"
                  />
                  <p class="pl-3 mb-0">海洋之心金級</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    style="height: 3rem"
                    src="https://upload.cc/i1/2021/07/10/3uPRaL.png"
                    alt="歐盟標章"
                  />
                  <p class="pl-3 mb-0">歐盟永續認證</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://greenbox.tw/upload/News_3032/201511130900441.jpg"
                    alt="產銷履歷"
                  />
                  <p class="pl-3 mb-0">產銷履歷證明</p>
                </li>
              </ul>
            </div>
            <h3 class="mt-3 text-center">新鮮現撈海產</h3>
          </div>
          <div class="col-md-4" data-aos="fade-up" data-aos-delay="150" data-aos-offset="100">
            <div class="img-hover-text position-relative overflow-hidden">
              <img src="https://upload.cc/i1/2021/08/01/QyxrEl.jpg" class="img-fluid" alt="肉品" />
              <ul
                class="h-100 furittext position-absolute w-100 p-md-4 py-2 text-white"
                style="backdrop-filter: blur(10px)"
              >
                <li class="d-flex align-items-center">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/07/10/DfQyGV.png"
                    alt="台灣豬肉"
                  />
                  <p class="pl-3 mb-0">台灣豬認證</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://upload.cc/i1/2021/08/01/aep649.jpg"
                    alt="優良"
                  />
                  <p class="pl-3 mb-0">CAS台灣優良農產品</p>
                </li>
                <li class="d-flex align-items-center mt-3 hrem-2">
                  <img
                    style="width: 2rem"
                    src="https://upload.cc/i1/2021/07/10/PZFJRQ.jpg"
                    alt="合格肉品"
                  />
                  <p class="pl-3 mb-0">合格肉場</p>
                </li>
                <li class="d-flex align-items-center mt-3">
                  <img
                    class="rounded-circle hrem-2"
                    src="https://greenbox.tw/upload/News_3032/201511130900441.jpg"
                    alt="產銷履歷"
                  />
                  <p class="pl-3 mb-0">符合產銷履歷</p>
                </li>
              </ul>
            </div>
            <h3 class="mt-3 text-center">安心國產肉品</h3>
          </div>
          <div class="col-md-6" data-aos="fade-in" data-aos-delay="50" data-aos-offset="305">
            <p class="text-justify p-md-5 py-3 px-5 line-height-3">
              以
              <span class="font-weight-bold text-maincolor" id="tooltip-target-localfood-zhTW">
                <span class="text-danger">*</span>永續飲食</span
              >為目標。我們追求食材在地化,選擇當地食材能夠減少運輸的時間,除了降低對環境的負擔,更能確保食材的新鮮度。
              也希望能透過支持具有在地特色的農產，來替地方農業的發展盡一份微薄的心力。
              食物栽種上也能比較多樣化，保持了農地的生產力。
            </p>
            <b-tooltip target="tooltip-target-localfood-zhTW" triggers="hover">
              符合「健康」、「經濟」、「農業」、「社會文化」、「地域環境」五大項目
            </b-tooltip>
          </div>
          <div class="col-md-6" data-aos="fade-in" data-aos-delay="50" data-aos-offset="305">
            <p class="text-left p-md-5 py-3 px-5 line-height-3">
              We are pursuing localized ingredients and aiming at
              <span class="font-weight-bold text-maincolor" id="tooltip-target-localfood-en">
                <span class="text-danger">*</span>sustainable</span
              >
              diet. Choosing local ingredients can reduce the time of transportation. I also hope to
              contribute to the development of local agriculture by supporting agricultural products
              with local characteristics. Food cultivation can also be more diversified, maintaining
              the productivity of farmland.
            </p>
            <b-tooltip target="tooltip-target-localfood-en" triggers="hover">
              'health', 'economy', 'agriculture', 'social culture' and 'regional environment'
            </b-tooltip>
          </div>
          <div
            class="col-12 text-center mx-auto"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-offset="50"
          >
            <router-link to="/cart" class="btn btn-outline-dark py-3 px-5 badge-pill rounded-pill h3 mt-sm-4">
              了解更多
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-md-8 py-4">
      <h2 class="text-center mb-3" data-aos="fade-in" data-aos-delay="50" data-aos-offset="100">
        菜單<br />MENU
      </h2>
      <div class="container">
        <div
          class="menu-image hvh-4 image-cover mb-3 my-auto"
          data-aos="fade-in"
          data-aos-delay="50"
          data-aos-offset="110"
        ></div>
        <div class="row px-md-5">
          <div class="col-md-6" data-aos="fade-in" data-aos-delay="50" data-aos-offset="305">
            <p class="text-justify p-md-5 py-3 px-5 line-height-3">
              台味以"保留食物的原型"為宗旨。 我們的料理保證絕無人工添加物
              如化學調味料（味素、鰹魚粉等等)、食用著色劑甚至是防腐劑。
              百年以來,我們始終如一的為您端上能安心讓小孩子
              以及注重飲食健康的人能夠快樂享用,既安全又美味的產品。
            </p>
          </div>
          <div class="col-md-6" data-aos="fade-in" data-aos-delay="50" data-aos-offset="305">
            <p class="text-left p-md-5 py-3 px-5 line-height-3">
              We takes "whole food" as its purpose. Our cooking guarantees absolutely no artificial
              additives, Such as chemical seasonings, coloring agents And preservatives. Every day
              we will serve Children and people who care about their bodies can also enjoy it with
              peace of mind Of safe and delicious products.
            </p>
          </div>
          <div
            class="col-12 text-center mx-auto"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-offset="50"
          >
            <router-link to="/menu" class="btn btn-outline-dark py-3 px-5 badge-pill rounded-pill h3 mt-sm-4">
              了解更多
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="py-md-8 py-4 hvh-7">
      <h2 class="text-center mb-3" data-aos="fade-in" data-aos-delay="50" data-aos-offset="50">
        相關店鋪<br />FIND US
      </h2>
      <div class="container">
        <div
          class="shop-image hvh-3 image-cover mb-3"
          data-aos="fade-in"
          data-aos-delay="50"
          data-aos-offset="305"
        ></div>
        <div
          class="col-12 text-center mx-auto"
          data-aos="fade-in"
          data-aos-delay="50"
          data-aos-offset="50"
        >
          <router-link to="/shop" class="btn btn-outline-dark py-3 px-5 badge-pill rounded-pill h3 mt-sm-4">
            了解更多
          </router-link>
        </div>
      </div>
    </section>

    <Footer class="flex-shrink-0" />
  </div>
</template>

<script>
import Footer from './Footer';

export default {
  components: {
    Footer,
  },
  methods: {
    goto() {
      const ingred = document.getElementById('ingred');
      ingred.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
  },
};
</script>
