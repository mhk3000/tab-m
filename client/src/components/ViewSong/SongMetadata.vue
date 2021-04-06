<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
          <div class="song-artist">
          {{song.artist}}
        </div>
          <div class="song-genre">
          {{song.genre}}
        </div>
        <v-btn
          class="cyan"
          @click="navigateTo({
            name: 'song-edit',
            params: {
              songId: song.id
            }
          })">
          Edit
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && !isBookmarked"
          class="cyan"
          @click="setAsBookmark">
          Set As Bookmark
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && isBookmarked"
          class="cyan"
          @click="unsetAsBookmark">
          Unset as Bookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImUrl" />
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      isBookmarked: null,
      bookmark: null
    }
  },
  watch: {
    bookmark: function () {
      console.log('calling watch', this.isBookmarked)
    }
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    console.log('SongMetadata - mounted')
    console.log('songId: ', this.$store.state.route.params.songId)
    console.log('userId: ', (JSON.parse(localStorage.getItem('user'))).id)
    console.log('isBookmarked: ', this.isBookmarked)
    this.bookmark = await BookmarksService.index({
      songId: this.$store.state.route.params.songId,
      //userId: (JSON.parse(localStorage.getItem('user'))).id
    })
    console.log('Returning bookmark: ', this.bookmark.data.length)
    for (let i = 0; i < this.bookmark.data.length; i++) {
      if (this.bookmark.data[i].SongId != this.$store.state.route.params.songId) {
        this.isBookmarked = false
      } else {
        this.isBookmarked = true
        break
      }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async setAsBookmark () {
      try {
        console.log('SongMetadata - bookmark')
        console.log('songId: ', this.$store.state.route.params.songId)
        console.log('userId', (JSON.parse(localStorage.getItem('user'))).id)
        console.log('isBookmarked: ', this.isBookmarked)
        BookmarksService.post({
          songId: this.$store.state.route.params.songId
        })
        this.isBookmarked = true
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        console.log('SongMetadata - unbookmark')
        console.log('songId: ', this.$store.state.route.params.songId)
        console.log('userId', (JSON.parse(localStorage.getItem('user'))).id)
        console.log('isBookmarked: ', this.isBookmarked)
        await BookmarksService.delete({
          songId: this.$store.state.route.params.songId,
          userId: (JSON.parse(localStorage.getItem('user'))).id
        })
        this.isBookmarked = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px
}
.song-artist {
  font-size: 24px
}
.song-genre {
  font-size: 18px
}
.album-image  {
  width: 70%;
  margin:  0 auto;
}
</style>
