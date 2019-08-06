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
              <h4 class="title">Sign-in</h4>
              <form class="so-form" v-on:submit.prevent>
                <div class="content">
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Username</label>
                      <input ref="username" type="text" class="field-set-input" id="inputEmail" placeholder="break.p@stark.com" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                    </div>
                  </div>
                  <div class="prop">
                    <div class="value">
                      <label class="field-set-legend">Password</label>
                      <input ref="password" type="password" class="field-set-input" id="inputPassword" placeholder="••••••••" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                    </div>
                  </div>
                </div>
                <div class="def-cred-err" v-if="error">{{errorText}}</div>
                <button v-on:click="sso()" class="btn action-style" id="sec-so">Secure Sign-On</button>
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
const axios = require('axios');
const api = 'http://localhost:8081/';
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      username: null,
      password: null,
      error: false,
      wasValidated: true,
      errorText: 'Your username and password combination is incorrect.',
      response: null,
      elfocus: null
    }
  },
  methods: {
    focushl: function (el, state) {
      if (state) {
        el.parentElement.classList.add('focus');
      } else {
        el.parentElement.classList.remove('focus');
      }
    },
    sso: function () {
      var vm = this;
      axios({
        method: 'POST',
        url: api + 'secure/use',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: {
          username: vm.$refs.username.value,
          password: vm.$refs.password.value
        }
      }).then(function (response) {
        vm.response = response.data;
        if (response.headers.authorization) {
          console.log(response.headers.authorization)
          console.log(vm.$cookies.keys())
          vm.$cookies.set('JWT', response.headers.authorization)
          vm.$router.push('/')
        } else {
          vm.error = true;
        }
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
              .ml-style-linear-gradient();
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
