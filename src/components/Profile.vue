<template>
  <div class="profile">
    <div class="profile-picture">
      <div class="profile-picture-link" :style="{backgoundColor: 'red'}" ></div>
    </div>
    <div class="name">
      <h2>{{ entity.name }}</h2>
    </div>
    <div class="suburb">
      <i class="icon-pin-fill"></i><span> {{ entity.address.suburb }}</span>
    </div>
    <div class="score">
      <i v-for="n in parseInt(entity.mean)" :key="n" class="icon-star-fill star icon-star-theme"></i><i v-for="n in 5 - parseInt(entity.mean)" :key="n" class="icon-star-outline star icon-star-theme"></i>
    </div>
    <div class="residing">
      <button v-if="$user.building.id == entity.id" class="link-user">Move out from {{ entity.name }}</button>
      <button v-else class="link-user">Reside in {{ entity.name }}</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  props: {
    entity: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .profile {
    border: 1px solid @lt-grey;
    padding: 1em;
    border-radius: 3px;
    .profile-picture {
      margin: 0 0 1em 0;
      .profile-picture-link {
        border-radius: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
      }
      .profile-picture-link:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    .name {
      h2 {
        font-weight: bolder;
        margin-bottom: 0;
        .score {
          width: 2rem;
          height: 2rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          .theme();
          font-weight: bold;
          border-radius: 100%;
          color: @white;
          line-height: 0;
        }
      }
    }
    .suburb {
      font-weight: bold;
    }
    .score {
      margin: 0 0 1em 0;
      .star {
        display: inline;
        margin: 0 .1em 0 0;
      }
    }
    .residing {
      .link-user {
        .theme();
        font-weight: bold;
        text-transform: uppercase;
        padding: 1em 2em;
        color: white;
        letter-spacing: 1px;
        font-size: 10px;
        border: 0;
        width: 100%;
        border-radius: 100px;
        cursor: pointer;
      }
    }
  }
</style>
