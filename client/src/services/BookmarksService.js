import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
       return Api().post('bookmarks', bookmark)
  },
  delete (bookmark) {
    return Api().delete('bookmarks', {
      params: bookmark
    })
  }
}
