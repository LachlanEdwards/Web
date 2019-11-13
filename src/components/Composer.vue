<template>
  <div class="review-modal-component">
    <div class="container">
      <div class="head">
        <div class="subtitle"><h6>Compose for</h6></div>
        <div class="title"><h2>{{ building }}, {{ suburb }}</h2></div>
      </div>
      <div class="body">
        <div class="rate" v-if="type === 1">
          <div class="pre-text"><i class="icon-star-outline"></i> Rating</div>
          <options :items="['5', '4', '3', '2', '1']" param="score" id="rating" class="custom-dropdown" v-on:option-select="updateRating"></options>
        </div>
        <div class="field">
          <form class="field-set">
            <textarea v-model="body.comment" class="edit field-set-input" id="id"></textarea>
          </form>
        </div>
        <div class="buttons">
          <div class="action" v-on:click="submit">Submit</div>
          <div class="action" v-on:click="close">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
import Options from './options';
const typenum = {
  Blog: 0,
  Review: 1,
  Residents: 2
}

export default {
  name: 'Composer',
  components: {Options},
  data () {
    return {
      body: {
        score: 5,
        comment: ''
      }
    }
  },
  props: {
    type: {
      type: Number,
      required: true
    },
    building: {
      type: String,
      required: true
    },
    suburb: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    update: function (item, param) {
      var vm = this;
      vm.body[param] = item;
    },
    close: function () {
      var vm = this;
      vm.$emit('close');
    },
    submit: function () {
      var vm = this;
      var url;
      switch (vm.type) {
        case typenum.Review:
          url = 'building/id/' + vm.$route.params.id + '/reviews/new';
          break;
        case typenum.Blog:
          break;
        case typenum.Residents:
          break;
      }
      this.$http({
        method: 'POST',
        url: url,
        data: vm.body
      }).then(r => {
        vm.$emit('post', r.status)
        vm.$toasted.show(r.status)
        vm.close();
      }).catch(function (error) {
        vm.$toasted.show(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .review-modal-component {
    z-index: 2147483647;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
    .container {
      border-radius: 3px;
      background-color: @white;
      padding: 0;
      .head {
        padding: 2em;
        .accent();
        color: @white;
        .title {
          h2 {
            font-weight: bold;
          }
        }
        .subtitle {
          h6 {
            font-size: 10px;
            text-transform: uppercase;
            font-weight: bold;
            color: @white;
          }
        }
      }
      .buttons {
        display: inline-flex;
        .action {
          border: none;
          .accent();
          font-weight: bold;
          font-size: 10px;
          text-transform: uppercase;
          color: @white;
          letter-spacing: 1px;
          border-radius: 100px;
          padding: 1em 2em;
          width: 100%;
          text-align: center;
          margin: 0 1em 0 0;
        }
      }
      .body {
        padding: 2em;
        .rate {
          display: inline-flex;
          border: 1px solid @border-grey;
          border-radius: 3px;
          margin: 0 0 1em 0;
          .pre-text {
            padding: 1em;
            border-right: 1px solid @border-grey;
          }
          .custom-dropdown {
            padding: 1em;
          }
        }
        .rate:not(:first-child) {
          margin: 0 0 0 1em;
        }
        .field {
          margin: 0 0 1em 0;
          .field-set {
            .field-set-legend {
              font-weight: bold;
              .field-set-legend-err {
                color: @theme;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 10px;
                letter-spacing: 1px;
              }
            }
            textarea {
              width: 100%;
              height: 20vh;
              resize: none;
              padding: 1em;
            }
            .field-set-input {
              padding: 1em;
              margin: 0;
              box-shadow: none;
              outline: none;
              border: 1px solid @border-grey;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
</style>
