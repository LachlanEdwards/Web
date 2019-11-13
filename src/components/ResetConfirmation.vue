<template>
  <div class="parent">
    <main class="main">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12 offset-2 def-col">
          <div class="l">
            <div class="stack">
              <div class="title">
                <h1>Metlease</h1>
              </div>
              <div class="tagline">
                <h3>Your new home awaits.</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 def-col">
          <div class="r">
            <div class="stack">
              <h4 class="title">Reset your password</h4>
              <form class="so-form" v-on:submit.prevent>
                <div class="content">
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Username</label>
                      <input v-model="username" type="text" class="field-set-input" id="inputEmail" placeholder="break.p@stark.com">
                    </div>
                  </div>
                </div>
                <div class="def-cred-err" v-if="error">{{errorText}}</div>
                <button v-on:click="submit()" class="btn action-style" id="sec-so">{{ button.text }}</button>
                <button v-on:click="$router.push('/signin')" class="btn action-style">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
var qs = require('qs')
export default {
  name: 'ResetConfirmation',
  components: {},
  data () {
    return {
      username: null,
      button: {
        text: 'Request Reset'
      }
    }
  },
  methods: {
    submit: function () {
      var vm = this;
      vm.button.text = 'Working...'
      this.$http({
        method: 'POST',
        url: '/user/reset',
        data: qs.stringify({
          username: vm.username
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(response => {
        if (response.data.error) {
          vm.$toasted.show(response.data.message)
          vm.button.text = 'Request Reset'
        } else {
          vm.button.text = response.data.message
        }
      }).catch(error => {
        vm.$toasted.show(error)
      })
    }
  },
  created: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .parent {
    height: inherit;
    font-family: "TT Commons", sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .main {
      .def-col {
        .l, .r {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .stack {
            width: 100%;
          }
        }
        .l {
          height: 100%;
          .title {
            h1 {
              display: inline-block;
              padding: .5em 1em;
              .ml();
              .metlease();
              color: @white;
            }
          }
          .tagline {
            h3 {
              .ml();
              text-transform: unset;
            }
          }
        }
        .r {
          margin: unset;
          .title {
            .ml();
            text-transform: unset;
          }
        }
      }
    }
  }
</style>
