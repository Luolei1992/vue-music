// import {commonParams} from './config'
import axios from 'axios'

// export function getLyric(mid) {
//   const url = '/api/lyric'

//   const data = Object.assign({}, commonParams, {
//     songmid: mid,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0,
//     categoryId: 10000000,
//     pcachetime: +new Date(),
//     format: 'json',
//     callback: 'MusicJsonCallback_lrc',
//     jsonpCallback: 'MusicJsonCallback_lrc'
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSongWords(){
    const url = 'https://www.easy-mock.com/mock/5abf10708966673c04832664/geci'
    return axios.get(url, {
        params: ""
      }).then((res) => {
        return Promise.resolve(res.data)
      })
}
