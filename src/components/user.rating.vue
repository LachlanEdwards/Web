<template>
  <div class="ur">
    <div class="card mb-3" style="max-width: 100%">
      <div class="row no-gutters">
        <div class="col-md-1">
          <div class="initial">
            {{ user.split(" ")[0].charAt(0) }}{{ user.split(" ")[1].charAt(0) }}
          </div>
        </div>
        <div class="col-md-11">
          <div class="card-body">
            <h5 class="card-title">{{ user }}</h5>
            <p class="card-text">{{ text }}</p>
            <div class="card-text dots">
              <div v-for="n in parseInt(score)" :key="n" class="dot">
                <div class="dot-inside"></div>
              </div>
              <div v-for="n in parseInt(5 - score)" :key="n" class="dot-outline">
                <div class="dot-outline-inside"></div>
              </div>
            </div>
            <p class="card-text"><small class="text-muted">{{ date }}</small></p>
          </div>
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
    score: {
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
  @import '../../src/assets/css/stylesheet';
  .ur {
    .card {
      border-color: @border-grey;
      .initial {
        width: 100%;
        height: 100%;
        background: linear-gradient(-45deg, rgba(239,98,108,1) 0%, rgba(250,130,97,1) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        color: @white;
        font-weight: bold;
        font-size: 24px;
      }
      .dots {
        display: flex;
        flex-direction: row;
        margin: 0 0 1em 0;
        .dot {
          margin: 0 .1em 0 0;
          .ml-style-linear-gradient();
          border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .dot-inside {
            .ml-style-linear-gradient();
            border-radius: 1rem;
            border: 2px solid @white;
            width: calc(100% - 4px);
            height: calc(100% - 4px);
          }
        }
        .dot-outline {
          margin: 0 .1em 0 0;
          .ml-style-linear-gradient();
          border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .dot-outline-inside {
            background-color: @white;
            border-radius: 1rem;
            border: 2px solid @white;
            width: calc(100% - 4px);
            height: calc(100% - 4px);
          }
        }
      }
    }
  }
</style>
