<template>
  <div class="bill" :style="style"></div>
</template>

<script>
export default {
  name: 'Billboard',
  props: {
    image: {
      type: String,
      required: true
    },
    repeat: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    style: function () {
      var vm = this
      return {
        height: `33vh`,
        backgroundImage: `url(${vm.image})`,
        backgroundRepeat: `repeat`,
        backgroundSize: vm.repeat ? 'contain' : 'cover',
        backgroundPosition: 'center center'
      }
    }
  }
}
</script>

<style scoped>

</style>
