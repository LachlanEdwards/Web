<template>
  <header class="root-nav">
    <div class="nav">
      <nav class="navbar navbar-light navbar-expand-lg justify-content-between">
        <a class="navbar-brand" href="#">Metlease</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto" v-if="this.$ubool">
            <li class="nav-item">
              <a class="nav-link" href="#">Your Account</a>
            </li>
            <li class="nav-item">
              <a class="nav-link outline" href="" v-on:click="killSessionContainer()">Sign-out</a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-else>
            <li class="nav-item">
              <a class="nav-link" href="/register">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link outline" href="/signin">Sign-in</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable camelcase */
export default {
  name: 'template_head'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../src/assets/css/style';
  @grey: #efefef;
  @darker_grey: #8e8e8e;
  @default: #06d6a0;
  .default-btn {
    text-align: center;
    padding: .5em 1em;
    border: none;
    color: @white;
    font-weight: bold;
    background-color: @default;
  }
  .root-nav {
    .nav {
      .navbar {
        width: 100%;
        .navbar-brand {
          .brand();
        }
        .navbar-nav {
          .nav-item {
            .nav-link {
              .default-btn();
            }
            .nav-link.outline {
              background-color: transparent;
              box-shadow: inset 0px 0px 0px 1px rgba(6,214,160,1);
              color: @default;
              margin: 0 0 0 1em;
            }
          }
        }
      }
    }
  }
</style>
