<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <songs-bookmarks/>
      <recently-viewed-songs class="mt-2"/>
    </v-flex>
    <v-flex :class="{
      xs12: !isUserLoggedIn,
      xs6: isUserLoggedIn
    }" class="ml-1">
      <songs-search-panel />
      <songs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import SongsSearchPanel from '@/components/Songs/SongsSearchPanel'
import SongsPanel from '@/components/Songs/SongsPanel'
import RecentlyViewedSongs from '@/components/Songs/RecentlyViewedSongs'
import SongsBookmarks from '@/components/Songs/SongsBookmarks'
import SongsService from '@/services/SongsService'

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
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
