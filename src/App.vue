<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Helvetica Neue', 'Proxima Nova', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    font-weight: 400;
  }
  .nf {
    z-index: 2147483647;
    font-family: "TT Commons", sans-serif;
  }
  .nf-in {
    font-weight: 400 !important;
  }
</style>
