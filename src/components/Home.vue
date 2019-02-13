<template>
  <main id="def_component" class="def_root">
    <header class="def_hdr">
      <div class="def_gradient h-100 d-flex flex-column">
        <nav class="navbar navbar-light navbar-expand-lg justify-content-between">
          <a class="navbar-brand" href="#">Metlease</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" v-if="this.$ubool">
              <li class="nav-item">
                <a class="nav-link" href="#">Hello, {{ this.$user.username }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="" v-on:click="killSessionContainer()">Sign-out</a>
              </li>
            </ul>
            <ul class="navbar-nav" v-else>
              <li class="nav-item">
                <a class="nav-link" href="/signin">Sign-in</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="def_hero container-fluid d-flex justify-content-center flex-column">
          <div class="def_title">
            <h1 class="text-center">{{default_title}}</h1>
          </div>
          <div class="def_form">
            <form class="form-inline">
              <div class="form-group">
                <input type="text" autocomplete="off" class="form-control" id="default_input_q" v-bind:placeholder="'What\'re you looking for? '+input.input_placeholder+'?'">
                <button type="submit" class="btn btn-primary"><img src="../../src/assets/image/magnifying_glass.svg" alt="Search" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
    <div class="def_interesting_template">
      <div class="container-fluid def_interesting">
        <div class="def_sub">
          <h2>Exciting Buildings:</h2>
          <div class="row">
            <div class="col-md-6">
              <blue_card subtitle="Newstead" title="Laguna" source="https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=-27.38006149%2C153.0387005" alternative_text="test" :rating=5 type="Building"></blue_card>
            </div>
            <div class="col-md-6">
              <blue_card subtitle="South Brisbane" title="Brisbane Casino Tower" source="https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=-27.38006149%2C153.0387005" alternative_text="test" :rating=5 type="Building"></blue_card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <blue_card subtitle="West End" title="West Village" source="https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=-27.38006149%2C153.0387005" alternative_text="test" :rating=5 type="Building"></blue_card>
            </div>
            <div class="col-md-6">
              <blue_card subtitle="Brisbane CBD" title="Skytower" source="https://open.mapquestapi.com/staticmap/v4/getmap?key=oVKF5UwJv3UCuEII3CC2j3LiD0XTwdFF&size=1024%2C216&zoom=15&center=-27.38006149%2C153.0387005" alternative_text="test" :rating=4 type="Building"></blue_card>
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
import blue_card from './blue.card.vue';

export default {
  name: 'Home',
  data () {
    return {
      default_title: 'Your new home awaits.',
      input: {
        input_placeholder: 'Agency'
      }
    }
  },
  components: {
    blue_card
  },
  methods: {
    loop: function () {
      let vm = this;
      var loop_i = 0;
      let input_placeholder = ['Agent', 'Apartment', 'Building', 'Contractor', 'Developer', 'Management', 'Agency'];
      setInterval(function () {
        if (loop_i < input_placeholder.length) {
          vm.$set(vm.input, 'input_placeholder', input_placeholder[loop_i]);
          loop_i++;
        } else {
          loop_i = 0;
          vm.$set(vm.input, 'input_placeholder', input_placeholder[loop_i]);
          loop_i++;
        }
      }, 2000);
    },
    killSessionContainer: function () {
      let vm = this
      vm.killSession()
    }
  },
  created: function () {
    let vm = this;
    vm.loop();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../src/assets/css/style';
  .def_root {
    .def_hdr {
      height: 66%;
      .def_gradient {
        .gradient_red();
        .navbar {
          .navbar-brand {
            .brand();
            color: @white;
          }
          .navbar-collapse {
            justify-content: flex-end;
            .navbar-nav {
              .nav-item {
                .nav-link {
                  color: @white;
                  .brand_less_text_transform();
                }
                .nav-link:hover {
                  text-decoration: underline;
                }
              }
              .nav-item:not(:last-child) {
                .nav-link {
                  margin-right: 1em;
                }
              }
            }
          }
        }
      }
      .def_hero {
        flex-grow: 1;
        margin-bottom: @nav_height;
        .def_title {
          h1 {
            .brand_less_text_transform();
            color: @white;
          }
        }
        .def_form {
          margin-top: 2.5rem;
          .form-inline {
            .form-group {
              margin-left: auto;
              margin-right: auto;
              width: 50%;
              background-color: @white;
              .box_shadow_default();
              border-radius: 500px;
              #default_input_q {
                flex-grow: 1;
                border-bottom-width: 1px;
                border-bottom-style: solid;
                border-bottom-color: @white;
                border-radius: 0;
                background-color: @white;
                border-color: @white;
                padding: 1.5rem;
                color: @black;
                border-radius: 500px;
              }
              .btn {
                border-bottom-width: 1px;
                border-bottom-style: solid;
                border-bottom-color: @white;
                border-radius: 0;
                background-color: @white;
                border-color: @white;
                line-height: 0;
                width: 50px;
                height: 50px;
                border-radius: 500px;
                img {
                  height: 1rem;
                }
              }
            }
          }
        }
      }
    }
    .def_translate_effect {
      height: @half_translate_effect_dimensions;
    }
    .def_interesting {
      margin-top: 2rem;
    }
    .def_interesting {
      @media(min-width: @xl) {
        width: 66%;
      }
      @media(max-width: @xl) {
        width: 100%;
      }
      .def_sub {
        .row:not(:last-child) {
          margin-bottom: 30px;
        }
        h2 {
          color: @black;
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 1rem;
          .brand_less_text_transform;
        }
      }
    }
  }
</style>
