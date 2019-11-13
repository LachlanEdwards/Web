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
              <h4 class="title">Reset Password</h4>
              <form class="so-form" v-on:submit.prevent>
                <div class="content">
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Username <span class="field-validation" v-if="errors.first('username')">{{ errors.first('username') }}</span></label>
                      <input ref="username" type="text" class="field-set-input" id="inputUsername" name="username" placeholder="break.p@stark.com" v-validate="'required|min:2|max:999'">
                    </div>
                  </div>
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Password <span class="field-validation" v-if="errors.first('password')">{{ errors.first('password') }}</span></label>
                      <input ref="password" type="password" class="field-set-input" id="inputPassword" name="password" placeholder="••••••••" v-validate="'required|min:2|max:999'">
                    </div>
                  </div>
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Confirm Password <span class="field-validation" v-if="errors.first('confirm password')">{{ errors.first('confirm password') }}</span></label>
                      <input ref="password" type="password" class="field-set-input" id="inputConfirmPassword" name="confirm password" placeholder="••••••••" v-validate="'required|confirmed:password'" data-vv-as="password">
                    </div>
                  </div>
                </div>
                <button v-on:click="validate()" class="btn action-style" id="sec-so">Reset Password</button>
                <button v-on:click="$router.push('/signin')" class="btn action-style">Sign-In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var qs = require('qs')
/* eslint-disable semi */
/* eslint-disable camelcase */
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      username: null,
      password: null,
      confirmPassword: null
    }
  },
  methods: {
    validate: function () {
      var vm = this;
      if (this.errors.items.length <= 0) {
        vm.submit();
      } else {
        vm.$toasted.show('You have one or more invalid fields.')
      }
    },
    submit: function () {
      var vm = this;
      this.$http({
        method: 'POST',
        url: 'user/reset/new',
        data: qs.stringify({
          username: vm.$refs.username.value,
          token: vm.$route.query.token,
          password: vm.$refs.password.value
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(function (response) {
        if (response.data.error) {
          vm.$toasted.show(response.data.message)
        } else {
          vm.response = response.data
          vm.$router.push({path: `/signin`})
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
<style lang="less">
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
