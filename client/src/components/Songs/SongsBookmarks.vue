<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :options="options"
      :items="bookmarks"/>
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>

        <td class="text-xs-right">
           {{props.item.artist}}

        </td>
      </template>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      options: {
         // sortBy: 'createdAt'
        // descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    let bookmarkArr = []
    let jsonObj = null;
    if (this.isUserLoggedIn) {
      // bookmarkArr = await BookmarksService.index({
      //   userId: (JSON.parse(localStorage.getItem('user'))).id
      // })
      bookmarkArr = await BookmarksService.index()
        
      console.log('id of first object of bookmarkArr: ', bookmarkArr.data[0].id)
      for (let i = 0; i < bookmarkArr.data.length; i++) {
        let song = (await SongsService.show(bookmarkArr.data[i].SongId)).data
        console.log('Song queried: ', song)
        jsonObj = {
          "title" : song.title,
          "artist": song.artist
        }
        this.bookmarks.push(jsonObj)
      }
      console.log('SongsBookmarks - mounted bookmarks Arr: ', this.bookmarks)
    }
  }
}
</script>

<style scoped>
</style>
