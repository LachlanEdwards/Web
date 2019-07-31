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
                  <h1 class="error-code">500: Internal Server Error.</h1>
                  <p class="error-desc">The server encountered an unexpected condition that prevented it from fulfilling the request. This error response is a generic "catch-all" response.</p>
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
export default {
  name: 'Home',
  components: {},
  data () {
    return {}
  },
  methods: {},
  created: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../src/assets/css/stylesheet';
  .error {
    height: 100vh;
    font-family: "TT Commons", sans-serif;
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
