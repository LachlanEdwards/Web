<template>
  <div class="composer">
    <div class="container">
      <div class="body">
        <div class="prop">
          <div class="title">Write a rating for this building.</div>
          <div class="value">
            <label class="field-set-legend">If you've had a poor experience, try to resolve it with the building first. Respect that the staff of this building are human beings, do not defame them or publicise their name.</label>
            <div class="filter">
              <div class="rate">
                <div class="pre-text"><i class="icon-star-outline"></i> Rating</div>
                <options :items="['5', '4', '3', '2', '1']" param="score" id="rating" class="custom-dropdown" v-on:option-select="update($event, 'score')"></options>
              </div>
            </div>
          </div>
        </div>
        <div class="prop">
          <div class="value">
            <div class="field">
              <form class="field-set">
                <textarea v-model="body.comment" class="edit field-set-input" id="id"></textarea>
                <div class="button-row">
                  <div class="row">
                    <div class="col-md-6 button-inline blue" v-on:click="submit">Submit</div>
                    <div class="col-md-6 button-inline" v-on:click="close">Cancel</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
import Options from './options';

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
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    update: function (item, param) {
      var vm = this;
      vm.body[param] = item;
      vm.$emit('update');
    },
    close: function () {
      var vm = this;
      vm.$emit('close');
    },
    submit: function () {
      var vm = this;
      var url = 'building/id/' + vm.$route.params.id + '/reviews/new';
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
  .composer {
    margin-bottom: 2em;
    .container {
      padding: 0;
      .field {
        .field-set {
          border: 1px solid @border-grey;
          border-radius: 3px;
          .field-set-input {
            border: unset !important;
            margin-bottom: 0 !important;
          }
          .button-row {
            width: 100%;
            border-top: 1px solid @border-grey;
            .button-inline:not(:last-child) {
              border-right: 1px solid @border-grey;
            }
            .button-inline {
              text-align: center;
              padding: 1em;
              cursor: pointer;
            }
            .button-inline.blue {
              color: @theme;
            }
          }
        }
      }
      .rate {
        display: inline-flex;
        border: 1px solid @border-grey;
        border-radius: 3px;
        .pre-text {
          padding: 1em;
          border-right: 1px solid @border-grey;
          color: @black;
        }
        .custom-dropdown {
          border: unset !important;
          padding: 1em;
        }
      }
    }
  }
</style>
