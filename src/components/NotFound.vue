<template>
  <main id="component" class="error">
    <div class="error-container container-fluid d-flex justify-content-center align-content-center flex-column">
        <div class="error-details">
          <div class="stack">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-12 offset-2 column">
                <div class="l d-flex justify-content-center align-content-center flex-column">
                  <div class="title">
                    <h1>Metlease</h1>
                  </div>
                  <div class="tagline">
                    <h3>Your new home awaits.</h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 column">
                <div class="r">
                  <h1 class="error-code">404: File or directory not found.</h1>
                  <p class="error-desc">The server couldn't locate the file or directory you requested. The file or directory you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
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
  .error {
    font-family: "TT Commons", sans-serif;
    height: 100vh;
    .error-container {
      height: inherit;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .error-details {
        width: 100%;
        .stack {
          margin-top: 1.5rem;
          .column:not(:last-child) {
            //border-right: 1px solid @black;
          }
          .column {
            .l {
              height: 100%;
              .title {
                h1 {
                  display: inline-block;
                  padding: .5em 1em;
                  .ml-style-linear-gradient();
                  .ml();
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
              .error-code {
                font-size: 36px;
                font-weight: bold;
              }
              .error-desc {
                font-weight: 300;
                font-size: 18px;
                margin-bottom: unset;
              }
            }
          }
        }
      }
    }
  }
</style>
