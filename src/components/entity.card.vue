<template>
  <div class="card">
    <img src="../assets/image/test_images/1.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ entity.name }}, {{ entity.address.suburb }}</h5>
      <div class="card-text card-text-score">
        <div class="score" v-if="entity.mean">
          <div v-for="(n, index) in parseInt(entity.mean)" :key="index+1" class="icon-fill">
            <i class="icon-star-fill"></i>
          </div>
          <div v-for="(n, index) in 5 - parseInt(entity.mean)" :key="-index" class="">
            <i class="icon-star-outline"></i>
          </div>
        </div>
      </div>
      <address class="card-text text-capitalize">
        {{ entity.address.number }} {{ entity.address.streetName }} {{entity.address.suffix.toLocaleLowerCase() }}<br>
        {{ entity.address.suburb }}, {{ entity.address.postCode }}<br>
        {{ entity.address.state }}
      </address>
    </div>
    <div class="card-footer">
      <div class="row button-row">
        <div class="col-md-6"><a href="#" class="btn" v-on:click="$router.push({ name: 'Update', params: { id: entity.id }})"><i class="material-icons">create</i></a></div>
        <div class="col-md-6"><a href="#" class="btn"><i class="material-icons">clear</i></a></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'apartment_card',
  props: {
    entity: {
      type: Object,
      required: true
    }
  },
  methods: {
    clicked: function (event) {
      this.$emit('click', this.page, event);
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .card {
    color: @black;
    flex-grow: 1;
    height: 100%;
    .card-footer {
      background: @white;
      padding: 0;
      border-top-color: @border-grey;
      .button-row {
        .col-md-6:not(:first-child) {
          border-left: 1px solid @border-grey;
        }
        .btn {
          padding: 0;
          text-align: center;
          width: 100%;
          i {
            line-height: unset;
          }
        }
      }
    }
  }
</style>
