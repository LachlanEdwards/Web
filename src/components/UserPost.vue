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
            <div class="files">
              <div class="file" v-if="files" v-for="file in files" v-bind:key="file.id">
                <div class="file-type static-text"><i class="material-icons">insert_drive_file</i> {{file.fileType}}</div>
                <div class="file-name"><a :href="file.url">{{file.fileName}}</a></div>
              </div>
            </div>
            <p class="card-text"><small class="text-muted">{{ date }}</small></p>
            <div class="card-buttons">
              <div class="card-reply static-text"><i class="material-icons">add_comment</i> Reply</div>
            </div>
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
    text: {
      type: String,
      required: true
    },
    files: {
      type: Array,
      required: false
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
      .files {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .file {
          margin-right: 1em;
          margin-bottom: 1em;
          display: flex;
          flex-direction: row;
          justify-content: center;
          .file-type {
            margin-right: 1em;
          }
        }
      }
    }
  }
</style>
