<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">metlease</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a v-if="!$user" class="nav-link" href="#">Sign-In</a>
          <a v-else class="nav-link" href="/user/me">{{ $user.first }}'s Account</a>
        </li>
        <li class="nav-item">
          <a v-if="!$user" class="nav-link" href="#">Register</a>
          <a v-else class="nav-link" v-on:click="kill">Sign-Out</a>
        </li>
        <li class="nav-item">
          <a v-if="$user" class="nav-link" href="/new/building">Create a Building</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" aria-label="Search">
        <button class="btn my-sm-0" type="submit"><i class="icon icon-search-outline"></i></button>
      </form>
    </div>
  </nav>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'gl-nav',
  methods: {
    kill: function () {
      let vm = this
      vm.$user = null
      vm.$cookies.remove('JWT')
      this.$router.push({ path: `/` })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/stylesheet';
  .navbar {
    background: @white;
    .navbar-brand {
      .ml();
      .ml-style-linear-gradient();
      color: @white;
      padding: .33em 1em;
    }
    .navbar-nav {
      .nav-item {
        .nav-link {
          color: @default-grey;
        }
        .nav-link:hover {
          color: @grey;
        }
      }
    }
    .form-inline {
      border-radius: 38px;
      border: 1px solid @grey5;
      .form-control {
        border: none;
        background: none;
        border-radius: 38px;
      }
      .btn {
        width: 38px;
        height: 38px;
        border-radius: 100%;
        background: none;
        color: @grey5;
        .flex-center();
        .icon {
          //font-size: .825em;
        }
      }
    }
  }
</style>
