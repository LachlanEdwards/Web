<template>
  <div class="parent">
    <navbar></navbar>
    <div class="home" :style="{'background-image': `url(${require('../assets/image/building/3.jpg')})`}"></div>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
import Navbar from './nav';
export default {
  name: 'Home',
  data () {
    return {
      default_title: 'Your new home awaits.',
      input: {
        input_placeholder: 'Agency'
      }
    }
  },
  components: {Navbar},
  methods: {
    loop: function () {
      let vm = this;
      var loop_i = 0;
      let input_placeholder = ['Agent', 'Apartment', 'Building', 'Contractor', 'Developer', 'Management', 'Agency'];
      setInterval(function () {
        if (loop_i < input_placeholder.length) {
          vm.$set(vm.input, 'input_placeholder', input_placeholder[loop_i]);
          loop_i++;
        } else {
          loop_i = 0;
          vm.$set(vm.input, 'input_placeholder', input_placeholder[loop_i]);
          loop_i++;
        }
      }, 2000);
    },
    killSessionContainer: function () {
      let vm = this
      vm.killSession()
    }
  },
  created: function () {
    let vm = this;
    vm.loop();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../src/assets/css/stylesheet';
</style>
