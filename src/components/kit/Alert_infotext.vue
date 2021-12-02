<template>
  <div class="message_text_transition" :class="{ 'opacity-0': fadeout, 'opacity-5': !fadeout }">
    <p id="error" :class="`text-${status}`">
      <i class="fas fa-check-circle" v-if="isCanUse == 'yes'"></i>
      <i class="fas fa-times-circle" v-else-if="isCanUse == 'no'"></i>
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      status: '',
      isCanUse: '',
      fadeout: false
    }
  },
  methods: {
    updateMessage (message, status, isCanUse) {
      const vm = this
      vm.msg = message
      vm.status = status
      vm.isCanUse = isCanUse
      vm.removeMessageWithTiming()
    },
    removeMessageWithTiming () {
      const vm = this
      setTimeout(() => {
        vm.fadeout = true
      }, 3000)
      setTimeout(() => {
        vm.msg = ''
        vm.status = ''
        vm.isCanUse = ''
      }, 5000)
    }
  },
  created () {
    const vm = this
    vm.$infotext.$on('messsage:push', (message, status, isCanUse) => {
      vm.fadeout = false
      vm.updateMessage(message, status, isCanUse)
    })
  }
}
</script>

<style scoped>
.message_text_transition {
  transition: opacity ease-out 2s;
}
</style>
