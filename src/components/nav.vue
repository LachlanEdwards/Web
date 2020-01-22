<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">metlease</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a v-if="!$store.getters.user" class="nav-link" href="/signin">Sign-In</a>
          <a v-else class="nav-link" href="/user/me">{{ $store.getters.user.username }}'s Account</a>
        </li>
        <li class="nav-item">
          <a v-if="!$store.getters.user" class="nav-link" href="/signup">Register</a>
          <a v-else class="nav-link" v-on:click="kill">Sign-Out</a>
        </li>
        <li class="nav-item">
          <a v-if="$store.getters.user" class="nav-link" href="/new/building">Create a Building</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" aria-label="Search" placeholder="Search">
      </form>
      <button class="btn my-sm-0" type="submit"><i class="material-icons">search</i></button>
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
      vm.$store.commit('user', null);
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
    padding: 0;
    .navbar-brand {
      .ml();
      .metlease();
      color: @white;
      padding: .66em 1em;
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
      border: 1px solid @border-grey;
      background: @border-grey;
      border-radius: 0;
      .form-control {
        border: none;
        background: none;
        outline: none;
      }
    }
    .btn {
      height: 40px;
      background: none;
      color: @white;
      border: 1px solid @theme;
      border-radius: 0;
      background: @theme;
      margin-right: 1rem;
      .flex-center();
      .icon {
        color: @white;
      }
    }
  }
</style>
