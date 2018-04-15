<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import { ERR_OK } from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
    data(){
        return {
            songs:[]
        }
    },
    computed:{
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getDetail(this.singer.id)
    },
    methods:{
        _getDetail(id){
            if(!id){
                this.$router.push({path:'/singer'})
                return
            }
            getSingerDetail(id).then((res)=>{
                if(res.code === ERR_OK){
                    this.songs = this._normallizeSongs(res.data.list)
                    console.log(this.songs);
                }
            }).catch((res)=>{

            })
        },
        _normallizeSongs(list){
            let lis = []
            list.forEach((item) => {
                let {musicData} = item;  //解构赋值相当于是let musicData = item.musicData
                if(musicData.songid && musicData.albummid) {
                    lis.push(createSong(musicData))
                }
            });
            return lis;
        }
    },
    components:{
        MusicList
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
}

.singer-detail {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
}
</style>