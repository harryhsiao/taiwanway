<template>
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <svg width="400" height="400">
            <circle
              class="circle"
              fill="none"
              stroke="#e80"
              stroke-width="20"
              cx="200"
              cy="200"
              r="190"
              transform="rotate(-90,200,200)"
            />
            <polyline
              class="tick"
              fill="none"
              stroke="#e80"
              stroke-width="24"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="88,214 173,284 304,138"
            />
          </svg>
          <p :class="'text-' + status">
            {{ msg }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      status: '',
    };
  },
  methods: {
    updateMessage(message, status /*, isCanUse*/) {
      const vm = this;
      vm.msg = message;
      vm.status = status;
      //vm.isCanUse = isCanUse;
      vm.removeMessageWithTiming();
    },
    removeMessage(num) {
      const vm = this;
      vm.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$infomodal.$on('messsage:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scoped>
.circle {
  stroke-dasharray: 1194;
  stroke-dashoffset: 0;
}
.trick {
  stroke-dasharray: 350;
  stroke-dashoffset: 0;
}
</style>
