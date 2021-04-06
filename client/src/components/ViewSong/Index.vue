<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-2">
        <you-tube :youtubeId="song.youtubeId" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 class="ml-2 mt-2">
       <tab :song="song" />
      </v-flex>
      <v-flex xs6 class="ml-2 mt-2">
        <lyrics :song="song" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
import SongMetadata from '@/components/ViewSong/SongMetadata'
import YouTube from '@/components/ViewSong/YouTube'
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data () {
    return {
      song: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    if(this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
        //userId: (JSON.parse(localStorage.getItem('user'))).id
      })
    }
  },
  components: {
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border:none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
