<template>
  <header class="def_template_hdr">
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
      <div class="def_hero container-fluid d-flex justify-content-end flex-column">
        <div class="def_inline">
          <div class="def_left">
            <div class="def_image">
              <div class="def_image_el" v-bind:style="'background-image: url('+source+')'"></div>
            </div>
            <div class="def_string">
              <h6 class="def_subtitle">{{ subtitle }}</h6>
              <h3 class="def_title">{{ title }}</h3>
            </div>
          </div>
          <div class="def_rating">{{ rating }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
export default {
  name: 'template_head',
  props: {
    subtitle: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../src/assets/css/style';
  .box_shadow_disp {
    -webkit-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.25);
  }
  .bg_opac {
    background: rgba(255,255,255,0.5);
  }
  .box_shadow_default {
    box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 0.5em rgba(255,255,255,0.5);
  }
  .box_shadow_default_small {
    box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
  }
  .def_template_hdr {
    height: 33vh;
    min-height: 200px;
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
      width: 66%;
      .def_inline {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2em;
        .def_rating {
          width: 85px;
          height: 85px;
          border-color: @white;
          border-width: 7px;
          border-style: solid;
          border-radius: 100%;
          color: @white;
          font-size: 48px;
          text-align: center;
          font-weight: bold;
        }
        .def_left {
          display: inherit;
          .def_image {
            margin-right: 1em;
            .def_image_el {
              width: 85px;
              height: 85px;
              -webkit-border-radius: 100%;
              -moz-border-radius: 100%;
              border-radius: 100%;
              .box_shadow_default();
              background-position: center center;
              background-size: cover;
            }
          }
          .def_string {
            overflow: hidden;
            .def_subtitle {
              font-size: 24px;
              color: @white;
              opacity: 0.75;
              margin-bottom: 0;
            }
            .def_title {
              font-size: 48px;
              color: @white;
              opacity: 1;
              font-weight: bold;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
