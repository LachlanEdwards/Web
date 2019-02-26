<template>
  <div class="user-rating">
    <div class="title-card">
      <div class="image">
        <img alt="" :src="image">
      </div>
      <div class="meta">
        <div class="user">{{ user }}</div>
        <div class="date">{{ date }}</div>
        <div class="score">
          <div class="prop aggregate">
            <div class="title">Aggregate</div>
            <div class="value">{{ aggregate }}</div>
          </div>
          <div class="prop">
            <div class="title">Management</div>
            <div class="value">{{ management }}</div>
          </div>
          <div class="prop">
            <div class="title">Functionality</div>
            <div class="value">{{ functionality }}</div>
          </div>
          <div class="prop">
            <div class="title">Facilities</div>
            <div class="value">{{ facilities }}</div>
          </div>
          <div class="prop">
            <div class="title">Neighbourhood</div>
            <div class="value">{{ neighbourhood }}</div>
          </div>
          <div class="prop">
            <div class="title">Culture</div>
            <div class="value">{{ culture }}</div>
          </div>
          <div class="prop">
            <div class="title">Fittings</div>
            <div class="value">{{ fittings }}</div>
          </div>
          <div class="prop">
            <div class="title">Noise</div>
            <div class="value">{{ noise }}</div>
          </div>
        </div>
        <div class="text">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'user_rating',
  props: {
    image: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    aggregate: {
      type: Number,
      required: true
    },
    management: {
      type: Number,
      required: true
    },
    functionality: {
      type: Number,
      required: true
    },
    fittings: {
      type: Number,
      required: true
    },
    facilities: {
      type: Number,
      required: true
    },
    culture: {
      type: Number,
      required: true
    },
    neighbourhood: {
      type: Number,
      required: true
    },
    noise: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .user-rating {
    .title-card {
      margin-top: 1em;
      display: flex;
      flex-direction: row;
      .image {
        display: flex;
        flex-direction: column;
        margin-right: 1em;
        width: 42px;
        height: 42px;
        img {
          width: 42px;
          height: 42px;
          border-radius: 100%;
          vertical-align: top;
        }
      }
      .meta {
        display: flex;
        flex: 1;
        flex-direction: column;
        vertical-align: top;
        .user {
          font-weight: bold;
          font-size: 16px;
        }
        .date {
          text-transform: uppercase;
          color: @light_grey;
          font-size: 12px;
        }
        .score {
          .prop {
            border: 1px solid @light_grey;
            display: inline-block;
            font-size: 0;
            margin-top: 7px;
            border-radius: 33px;
            .title {
              background-color: @light_grey;
              border-top-left-radius: 33px;
              border-bottom-left-radius: 33px;
              display: inline-block;
              padding: .5em 1em;
              color: @white;
              font-size: 12px;
            }
            .value {
              display: inline-block;
              padding: .5em 1em;
              font-size: 12px;
            }
          }
          .prop.aggregate {
            border: 1px solid @purple;
            .title {
              .purple_gradient();
            }
          }
        }
        .text {
          margin-top: 1em;
        }
      }
    }
  }
</style>
