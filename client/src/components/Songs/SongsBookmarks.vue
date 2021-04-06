<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
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
      pagination: {
        sortBy: 'date',
        descending: true
      },
      bookmarks: [
        {
          title: 'hello world',
          artist: 'Testing'
        },
        {
          title: 'hello universe',
          artist: 'Done Testing'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    console.log('SongsBookmark isUserLoggedIn: ', this.isUserLoggedIn)
    let bookmarkArr = []
    if (this.isUserLoggedIn) {
      bookmarkArr = (await BookmarksService.index({
        userId: (JSON.parse(localStorage.getItem('user'))).id
      }))
    }
    console.log('bookmarkArr: ', bookmarkArr.data[0].UserId)
  }
}
</script>

<style scoped>
</style>
