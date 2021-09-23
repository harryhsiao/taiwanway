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
        <div class="modal-body px-5 mx-auto text-center">
          <svg width="200" height="200">
            <circle
              class="circle"
              fill="none"
              stroke="#e80"
              stroke-width="10"
              cx="100"
              cy="100"
              r="90"
              transform="rotate(-90,100,100)"
            />
            <polyline
              class="tick"
              fill="none"
              stroke="#e80"
              stroke-width="24"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="88,214 173,284 304,138"
              transform="scale(0.5)"
            />
          </svg>
          <p class="h2" :class="'text-' + status">
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
      //vm.removeMessageWithTiming();
    },
    /*removeMessage(num) {
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
    },*/
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
  animation: circle ease-in-out 1s;
}
.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 0;
  animation: tick ease-out .8s;
}
@keyframes circle {
  from {
    stroke-dashoffset: 1194;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes tick {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
