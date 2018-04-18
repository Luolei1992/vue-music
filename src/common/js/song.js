import { ERR_OK } from 'api/config'

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
        // http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=648CF0069E8C63994F3D047DBB39A3EF23331FB8F9FD7304F30AAEAEA15D082C9398300B70ABD655D000394617D28627BB3D1BC0E244FC96&guid=5637601456&uin=1145235349&fromtag=66
        url:'http://dl.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?vkey=461667060181B86AA48E9E8EA5D1F431A492E0F8DBE155F66EC5A2446DFD5A4453EC2B04303DD63903F35B213D9DECAC783B1E166522B143&guid=7101213003&uin=0&fromtag=66'
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}

