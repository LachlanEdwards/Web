<template>
    <div class="image-modal-component" v-on:click="$emit('exit')">
      <div class="exit" v-on:click="$emit('exit')"><i class="fas fa-times"></i></div>
      <div class="image">
        <img :src="source" :alt="source">
      </div>
    </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'imageModal',
  props: {
    source: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .image-modal-component {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    .exit {
      position: absolute;
      right: 1em;
      top: 1em;
      color: white;
      z-index: 2;
      cursor: pointer;
      font-size: 1em;
    }
    .image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 66%;
        max-height: 66%;
        .box_shadow_disp();
      }
    }
  }
</style>
