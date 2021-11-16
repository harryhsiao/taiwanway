<template>
  <div>
    <button
      type="button"
      class=" position-fixed border-0 p-3 topbutton zindex-20 rounded-circle"
      :class="stylechange"
      @click="gotop"
      v-if="windowTop > 790"
    >
      <i class="fas fa-chevron-up"></i>
      <p class="mb-0">回頂部</p>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowTop: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    stylechange() {
      const vm = this;
      if (document.body.scrollTop > 800 || vm.windowTop > 800) {
        return 'opacity-5';
      }
      return 'opacity-0';
    },
  },
  methods: {
    gotop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onScroll() {
      const vm = this;
      vm.windowTop = window.top.scrollY;
    },
  },
};
</script>

<style scoped>
.topbutton {
  bottom: 10px;
  right: 10px;
  outline: none;
  transition: opacity ease-in-out 0.2s, background-color ease-in-out 0.2s;
}

.topbutton:hover {
  background-color: rgb(158, 222, 174);
}
</style>
