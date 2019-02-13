<template>
  <div class="select-component">
    <div class="selected-option" v-on:click="toggle">{{ selected_option }} <div class="icon"></div></div>
    <div class="options" v-show="show">
      <div v-for="item in items" v-bind:key="item" class="option" v-on:click="$emit('option-select', item, param); toggle(); update(item)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'options',
  props: {
    items: {
      type: Array,
      required: true
    },
    param: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false,
      selected_option: this.items[0]
    }
  },
  methods: {
    toggle: function () {
      var vm = this;
      if (vm.show) {
        vm.show = false;
      } else {
        vm.show = true;
      }
    },
    update: function (val) {
      var vm = this;
      vm.selected_option = val;
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .select-component {
    cursor: pointer;
    display: inline-block;
    .selected-option {
      cursor: pointer;
      display: inline-block;
      .icon {
        width: 1ex;
        height: 1ex;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OTkgNjY2LjUiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojOGI5NGEzO308L3N0eWxlPjwvZGVmcz48dGl0bGU+ZHJvcGRvd248L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCA1MDAgNjY2LjUgOTk5IDAgMCAwIi8+PC9nPjwvZz48L3N2Zz4=);
        background-size: 1ex;
        background-repeat: no-repeat;
        background-position: center center;
        display: inline-block;
        cursor: pointer;
      }
    }
    .options {
      border-radius: 3px;
      background-color: @white;
      display: inline-block;
      position: absolute;
      margin-left: 1em;
      margin-top: -1em;
      border-color: @blue;
      border-width: 1px;
      border-style: solid;
      .box_shadow_disp();
      z-index: 1;
      cursor: pointer;
      .option:first-child {
        margin-top: .5em;
      }
      .option {
        margin-bottom: .5em;
        padding-left: 1em;
        padding-right: 1em;
        cursor: pointer;
        text-transform: capitalize;
      }
      .option:hover {
        color: @white;
        background: @blue;
      }
    }
  }
</style>
