<template>
    <div class="singer" ref="singer">
        singer
    </div>
</template>

<script>

import {getSingerList} from 'api/singer.js'
import {ERR_OK} from 'api/config.js'
export default {
    data(){
        return {
            singers:[]
        }
    },
    created(){
        this._getSingerList()
    },
    methods:{
        _getSingerList(){
            getSingerList().then((res)=>{
                console.log(res.data.list);
                if(res.code === ERR_OK) {
                    this.singers = res.data.list
                }
            })
        }
    }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
}
</style>
