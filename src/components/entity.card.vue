<template>
  <div class="entity-card" @click="clicked">
    <div class="card-template">
      <div class="main">
          <div class="details">
            <div class="desc">
              <div class="profile-picture">
                <div class="profile-picture-link" :style="{backgroundImage: 'url(' + source + ')'}" ></div>
              </div>
              <div class="meta">
                <div class="name">
                  <h2>{{ title }}</h2>
                </div>
                <div class="suburb">
                  <i class="fas fa-map-marker-alt"></i><span> {{ subtitle }}</span>
                </div>
              </div>
            </div>
            <div class="score">
              <i v-for="n in parseInt(rating)" :key="n" class="fas fa-star star"></i><i v-for="n in parseInt(5 - rating)" :key="n" class="far fa-star star"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable semi */
export default {
  name: 'apartment_card',
  props: {
    entity: {
      type: String,
      required: true
    },
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
  },
  methods: {
    clicked: function (event) {
      this.$emit('click', this.page, event);
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../src/assets/css/style';
  .hover-shadow {
    box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -webkit-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
    -moz-box-shadow: 0px 0px 0px 4px rgba(255,255,255,0.5);
  }
  .entity-card:hover {
    color: @black;
    text-decoration: none;
    .hover-shadow();
  }
  .entity-card {
    border: 1px solid @grey;
    border-radius: 3px;
    cursor: pointer;
    overflow: hidden;
    color: @black;
    .card-template {
      .header {
        padding: 1em;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        .type, .rating {
          letter-spacing: 1px;
          font-size: 10px;
        }
      }
      .main {
        padding: 1em;
        .details {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .desc {
            overflow: hidden;
            display: flex;
            flex-direction: row;
            .profile-picture {
              margin: 0 1em 0 0;
              .profile-picture-link {
                border-radius: 100%;
                background-size: cover;
                background-position: center center;
                background-repeat: no-repeat;
                height: 100%;
                width: 57.78px;
              }
            }
            .meta {
              .name {
                font-weight: bold;
                h2 {
                  font-weight: inherit;
                  margin: 0;
                }
              }
              .suburb {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
