<template>
  <div class="">
    <nav class="d-none d-md-block" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pgnum.has_pre }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getpgnums('pre')">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pgnum.total_pages"
          :key="page"
          :class="{ active: pgnum.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="getpgnums('cur', page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: !pgnum.has_next }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getpgnums('next')">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="input_page d-flex align-items-center my-3 d-block d-md-none">
      <button
        type="button"
        class="btn btn-primary mr-3"
        :disabled = "!pgnum.has_pre"
        @click.prevent="getpg('pre')"
      >
        <i class="fas fa-caret-left"></i>
      </button>
      <input
        :max="pgnum.total_pages"
        :min="1"
        type="number"
        v-model="pageText"
        @change="getpg('cur', pageText)"
        @keyup.enter="getpg('cur', pageText)"
      />
      <p class="px-3 mb-0 h5">/ 共 {{ pgnum.total_pages }} 頁</p>
      <button
        type="button"
        class="btn btn-primary ml-3"
        :disabled = "!pgnum.has_next"
        @click.prevent="getpg('next')"
      >
        <i class="fas fa-caret-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pages',
  props: ['pgnum'],
  data() {
    return {
      pageText: 1,
    };
  },
  methods: {
    getpgnums(page, curpage) {
      const vm = this;
      if (page === 'pre') {
        vm.$emit('getpgnum', vm.pgnum.current_page - 1);
      } else if (page === 'next') {
        vm.$emit('getpgnum', vm.pgnum.current_page + 1);
      } else {
        vm.$emit('getpgnum', curpage);
      }
    },
    getpg(page, curpage) {
      const vm = this;
      if (page === 'pre') {
        vm.pageText = vm.pageText - 1;
        vm.$emit('getpgnum', vm.pageText);
      } else if (page === 'next') {
        vm.pageText = vm.pageText + 1;
        vm.$emit('getpgnum', vm.pageText);
      } else {
        vm.$emit('getpgnum', curpage);
      }
      //vm.$emit('getpgnum', curpage);
    },
  },
};
</script>
