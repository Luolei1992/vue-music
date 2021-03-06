import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({},commonParams,{
        channel: "singer",
        page: "list",
        key: "all_all_all",
        pagesize: 100,
        pagenum: 1,
        loginUin: 0,
        hostUin: 0,
        platform: "yqq",
        needNewCode: 0,
    })
    return jsonp(url,data,options)
}
export function getSingerDetail(id){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({},commonParams,{
        g_tk: 32603675,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: id,
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
    })
    return jsonp(url,data,options)
}
// export function getSingerPlayUrl(id){
//     const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//     const data = Object.assign({},commonParams,{
//         loginUin: 0,
//         hostUin: 0,
//         platform: 'yqq',
//         needNewCode: 0,
//         singermid: id,
//         order: 'listen',
//         begin: 0,
//         num: 5,
//         songstatus: 1,
//         cid: 205361747,
//         uin: 0,
//         songmid: id,
//         filename: 'C400'+id+'.m4a',
//         guid: 7101213003,
//     })
//     return jsonp(url,data,options)
// }

