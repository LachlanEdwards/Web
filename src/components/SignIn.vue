<template>
  <main id="def-component" class="def-auth">
    <div class="def-so-container container-fluid d-flex justify-content-center align-content-center flex-column">
        <div class="def-so-form-container">
          <div class="def-stack">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-12 offset-2 def-col">
                <div class="l d-flex justify-content-center align-content-center flex-column">
                  <div class="def-title">
                    <h1>Metlease</h1>
                  </div>
                  <div class="def-tagline">
                    <h3>Your new home awaits.</h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 def-col">
                <div class="r">
                  <h4 class="def-form-title">Sign-in</h4>
                  <form class="def-so-form" v-on:submit.prevent>
                    <div class="form-group">
                      <fieldset class="reset-fieldset def-fieldset">
                        <legend class="def-fs-legend">Username</legend>
                        <input ref="username" type="text" class="form-control def-fs-input" id="inputEmail" placeholder="break.p@stark.com" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                      </fieldset>
                    </div>
                    <div class="form-group">
                      <fieldset class="reset-fieldset def-fieldset">
                        <legend class="def-fs-legend">Password</legend>
                        <input ref="password" type="password" class="form-control def-fs-input" id="inputPassword" placeholder="••••••••" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                      </fieldset>
                    </div>
                    <div class="def-cred-err" v-if="error">{{errorText}}</div>
                    <button v-on:click="sso()" class="btn btn-primary def-so-btn" id="sec-so">Secure Sign-On</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </main>
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
  .def-auth {
    font-family: "TT Commons", sans-serif;
    height: 100%;
    .def-so-container {
      height: inherit;
      .def-so-form-container {
        .def-stack {
          margin-top: 1.5rem;
          .def-col:not(:last-child) {
            border-right: 1px solid @black;
          }
          .def-col {
            .l {
              height: 100%;
              .def-title {
                h1 {
                  display: inline-block;
                  padding: .5em 1em;
                  .ml();
                  .ml-style-linear-gradient();
                  color: @white;
                }
              }
              .def-tagline {
                h3 {
                  .ml();
                  text-transform: unset;
                }
              }
            }
            .r {
              .def-form-title {
                .ml();
                text-transform: unset;
              }
              .def-so-form {
                .def-fieldset {
                  :focus {
                    border-color: @theme;
                  }
                  .def-fs-legend {
                    text-transform: uppercase;
                    font-size: 12px;
                    padding: 0 1em;
                  }
                  .def-fs-input {
                    border: initial;
                    padding: 0;
                    margin: 0;
                    box-shadow: none;
                    outline: none;
                  }
                }
                .def-cred-err {
                  color: red;
                  margin-bottom: 1em;
                  text-transform: uppercase;
                  font-weight: bold;
                  font-size: 12px;
                }
                .def-so-btn {
                  .ml-style-linear-gradient();
                  border: initial;
                  border-radius: initial;
                  width: 100%;
                  padding: 1rem 1rem;
                  text-transform: uppercase;
                  font-size: 12px;
                  font-weight: bold;
                }
                .def-so-btn:hover {
                  -webkit-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
                  -moz-box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
                  box-shadow: 0px 0px 1em 0px rgba(0,0,0,0.15);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
