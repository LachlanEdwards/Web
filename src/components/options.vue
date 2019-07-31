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
  @white: #FFFFFF;
  @black: #333;
  @translate_effect_dimensions: calc(299.19px + 1rem);
  @half_translate_effect_dimensions: calc((299.19px + 1rem) / 2);
  @negative_half_translate_effect_dimensions: calc(((299.19px + 1rem) / 2) * -1);
  @black: #323232;
  @grey: #8B94A3;
  @blue: #3185FC;
  @red: rgba(239,98,108,1);
  @sm: 576px;
  @md: 768px;
  @lg: 992px;
  @xl: 1200px;
  @nav_height: 56px;
  @standard: 14px;
  @light_grey: #8e8e8e; //#A9B4C2;
  @bg_grey: #efefef;
  @purple: #7F7EFF;
  .box_shadow_disp {
    -webkit-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.5);
  }
  .select-component {
    cursor: pointer;
    display: inline-block;
    .selected-option {
      cursor: pointer;
      display: inline-block;
      .icon {
        width: 1ex;
        height: 1ex;
        background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OTkgNjY2LjUiPjx0aXRsZT5kcm9wZG93bjwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxLTIiPjxwb2x5Z29uIHBvaW50cz0iMCAwIDUwMCA2NjYuNSA5OTkgMCAwIDAiLz48L2c+PC9nPjwvc3ZnPg==);
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
      }
      .option:hover {
        color: @white;
        background: @blue;
      }
    }
  }
</style>
