<template>
  <div class="posts">
    <div class="compose">
      <div class="prop">
        <div class="title">Create Post</div>
        <div class="value">
          <div class="field">
            <div class="field-set">
              <label class="field-set-legend field-validation" v-if="errors.first('body')">{{ errors.first('body') }}</label>
              <label class="field-set-legend" v-else>You're posting to residents of {{building.name}}.</label>
              <textarea v-model="post.body" class="edit field-set-input" id="id" name="body" v-validate="'required|min:2|max:999'"></textarea>
              <input style="display: none;" class="edit field-set-input" id="files" type="file" ref="files" multiple="multiple" v-on:change="validate()">
              <div class="files">
                <div class="file static-text" v-for="file in files" v-bind:key="file"><i class="material-icons">insert_drive_file</i> {{ file.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="value">
          <button class="button static-text" v-on:click="$refs.files.click()"><i class="material-icons">attach_file</i> Attachments</button>
          <button class="btn static-text action-style" v-on:click="submit()">Submit as {{ $store.getters.user.username }}</button>
        </div>
      </div>
    </div>
    <spinner :active="network" spinner="spinner" color="rgba(239,98,108,1)"/>
    <div v-if="r.results" class="results">
      <user-post v-for="post in r.results.content" v-bind:key="post.id" :files="post.userMultimedia" :user="post.user.first + ' ' + post.user.last" :date="parseDate(post.date)" :text="post.body"></user-post>
    </div>
    <div class="switch">
      <div class="switch-position-center">
        <div class="prev switch-nav" v-if="r.filter.page > 0" onclick="window.scrollTo(0, 0);" v-on:click="r.filter.page--; initialise();"><i class="icon ion-ios-arrow-back"></i></div>
        <div class="disabled prev switch-nav" v-else><i class="icon ion-ios-arrow-back"></i></div>
        <div class="curr">{{ r.filter.page + 1 }} ... {{ r.results.totalPages}}</div>
        <div class="nex switch-nav" v-if="(r.results.totalPages - 1) > r.filter.page" onclick="window.scrollTo(0, 0);" v-on:click="r.filter.page++; initialise();"><i class="icon ion-ios-arrow-forward"></i></div>
        <div class="disabled nex switch-nav" v-else><i class="icon ion-ios-arrow-forward"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPost from './UserPost'
import Options from './options'
import Spinner from 'vue-element-loading'

export default {
  name: 'Results',
  components: {UserPost, Options, Spinner},
  props: {
    id: {
      type: String,
      required: true
    },
    allowed: {
      type: Boolean,
      required: true
    },
    building: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      post: {
        body: null,
        link: null,
        postId: null
      },
      files: null,
      r: {
        results: false,
        filter: {
          'score': 'Any',
          'page': 0
        }
      }
    }
  },
  methods: {
    initialise: function () {
      var vm = this
      this.$http('building/id/' + vm.id + '/residents?page=' + vm.r.filter.page).then(r => {
        vm.r.results = r.data
        vm.network = false
      })
    },
    validate: function () {
      const vm = this
      const element = vm.$refs.files
      if (element.files.length > 10) {
        element.value = null
        vm.$toasted.show('You are only allowed to upload a maximum of 10 files.')
      }
      vm.files = element.files
    },
    parseDate: function (date) {
      var formatted = new Date(date)
      return formatted.toLocaleString()
    },
    upload: function (id) {
      return new Promise((resolve, reject) => {
        const vm = this
        const element = vm.$refs.files.files
        var formData = new FormData()
        for (var i = 0; i < element.length; i++) {
          formData.append('file', element[i])
        }
        formData.append('post_id', id)
        this.$http({
          method: 'POST',
          url: 'building/id/' + vm.building.id + '/residents/multimedia',
          data: formData,
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then(response => {
          vm.$toasted.show(response.data)
          resolve(response)
        }).catch(error => {
          vm.$toasted.show(error)
          reject(error)
        })
      })
    },
    submit: async function () {
      var vm = this
      if (this.errors.items.length <= 0) {
        this.$http({
          method: 'POST',
          url: 'building/id/' + vm.$route.params.id + '/residents/new',
          data: vm.post
        }).then(async r => {
          await vm.upload(r.data.id)
          vm.$emit('post', r.status)
          vm.$toasted.show(r.status)
        }).catch(function (error) {
          vm.$toasted.show(error)
        })
      } else {
        vm.$toasted.show('You have one or more invalid fields.')
      }
    }
  },
  mounted: function () {
    var vm = this
    vm.initialise()
  }
}
</script>

<style lang="less" scoped>
@import '../../src/assets/css/stylesheet';
.results {
  margin: 4em 0 1em 0;
}
.filter {
  .filter-item {
    display: inline-flex;
    border: 1px solid @border-grey;
    border-radius: 3px;
    .pre-text {
      padding: 1em;
      border-right: 1px solid @border-grey;
    }
    .custom-dropdown {
      padding: 1em;
    }
  }
  .filter-item.action-item {
    cursor: pointer;
    border: unset;
    height: 100%;
    font-weight: bold;
    .accent();
    color: @white;
    padding: 1em;
  }
  .filter-item:not(:first-child) {
    margin: 0 0 0 1em;
  }
}
</style>
