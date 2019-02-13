<template>
  <main id="def_component" class="def_auth">
    <div class="def_so_container container-fluid d-flex justify-content-center align-content-center flex-column">
        <div class="def_so_form_container">
          <div class="def_stack">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-12 offset-2 def_col">
                <div class="l d-flex justify-content-center align-content-center flex-column">
                  <div class="def_title">
                    <h1>Metlease</h1>
                  </div>
                  <div class="def_tagline">
                    <h3>Your new home awaits.</h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 def_col">
                <div class="r">
                  <h4 class="def_form_title">Sign-in</h4>
                  <form class="def_so_form" v-on:submit.prevent>
                    <div class="form-group">
                      <fieldset class="kill_bs_fieldset def_fieldset">
                        <legend class="def_fs_legend">Username</legend>
                        <input ref="username" type="text" class="form-control def_fs_input" id="inputEmail" placeholder="break.p@stark.com" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                      </fieldset>
                    </div>
                    <div class="form-group">
                      <fieldset class="kill_bs_fieldset def_fieldset">
                        <legend class="def_fs_legend">Password</legend>
                        <input ref="password" type="password" class="form-control def_fs_input" id="inputPassword" placeholder="••••••••" @focus="focushl($event.target, true)" @blur="focushl($event.target, false)">
                      </fieldset>
                    </div>
                    <div class="def_cred_err" v-if="error">{{errorText}}</div>
                    <button v-on:click="sso()" class="btn btn-primary def_so_btn" id="sec_so">Secure Sign-On</button>
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
  @import '../../src/assets/css/style';
  .def_auth {
    height: 100%;
    .def_so_container {
      height: inherit;
      .def_so_form_container {
        .def_stack {
          margin-top: 1.5rem;
          .def_col:not(:last-child) {
            border-right: 1px solid @black;
          }
          .def_col {
            .l {
              height: 100%;
              .def_title {
                h1 {
                  display: inline-block;
                  padding: .5em 1em;
                  .gradient_red();
                  .brand();
                  color: @white;
                }
              }
              .def_tagline {
                h3 {
                  .brand_less_text_transform();
                }
              }
            }
            .r {
              .def_form_title {
                .brand_less_text_transform();
              }
              .def_so_form {
                .def_fieldset {
                  :focus {
                    border-color: @blue;
                  }
                  .def_fs_legend {
                    text-transform: uppercase;
                    font-size: 12px;
                    padding: 0 1em;
                  }
                  .def_fs_input {
                    border: initial;
                    padding: 0;
                    margin: 0;
                    box-shadow: none;
                    outline: none;
                  }
                }
                .def_cred_err {
                  color: red;
                  margin-bottom: 1em;
                  text-transform: uppercase;
                  font-weight: bold;
                  font-size: 12px;
                }
                .def_so_btn {
                  .gradient_red();
                  border: initial;
                  border-radius: initial;
                  width: 100%;
                  padding: 1rem 1rem;
                  text-transform: uppercase;
                  font-size: 12px;
                  font-weight: bold;
                }
                .def_so_btn:hover {
                  .box_shadow_disp();
                }
              }
            }
          }
        }
      }
    }
  }
</style>
