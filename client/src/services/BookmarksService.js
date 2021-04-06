import Api from '@/services/Api'

export default {
  index (bookmark) {
    console.log('BookmarksService - get')
    console.log('bookmark: ', bookmark)
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    console.log('BookmarksService - post')
    console.log('URL: ', Api().get('bookmarks', {
      params: bookmark
    }))

    return Api().post('bookmarks', bookmark)
  },
  delete (bookmark) {
    console.log('BookmarksService - delete')
    return Api().delete('bookmarks', {
      params: bookmark
    })
  }
}
