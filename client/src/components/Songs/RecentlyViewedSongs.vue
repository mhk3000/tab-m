<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :options="options"
      :items="histories"/>
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
import SongHistoryService from '@/services/SongHistoryService'
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
        },
        {
          text: 'Viewed at',
          value: 'createdAt'
        }
      ],
      options: {
        // sortBy: 'date',
        // descending: true
      },
      histories: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    let historyArr = []
    let jsonObj = null;
    if (this.isUserLoggedIn) {
      // historyArr = await SongHistoryService.index({
      //   userId: (JSON.parse(localStorage.getItem('user'))).id
      // })
      historyArr = await SongHistoryService.index()
      console.log('id of first object of historyArr: ', historyArr.data[0].id)
      for (let i = 0; i < historyArr.data.length; i++) {
        let song = (await SongsService.show(historyArr.data[i].SongId)).data
        console.log('Song queried: ', song)
        jsonObj = {
          "title" : song.title,
          "artist": song.artist,
          "createdAt": historyArr.data[i].createdAt
        }
        this.histories.push(jsonObj)
      }
      console.log('SongsHistory - mounted historys Arr: ', this.histories)
    }
  }
}
</script>

<style scoped>
</style>
