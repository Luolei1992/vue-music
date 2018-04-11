<template>
    <div class="singer">
        <listview :data="singers"></listview>
    </div>
</template>

<script>

import {getSingerList} from 'api/singer.js'
import {ERR_OK} from 'api/config.js'

import Listview from '../../base/listview/listview'
import Singer from 'common/js/singer.js'


let HOT_NAME = "热门"
let HOT_SINGER_LENGTH = 10
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
                if(res.code === ERR_OK) {
                    this.singers = this._listInRules(res.data.list)
                }
            })
        },
        _listInRules(lis){
            let item_list = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            lis.forEach((value,index)=>{
                if(index < HOT_SINGER_LENGTH){
                    item_list.hot.items.push(new Singer({
                    id:value.Fsinger_mid,
                    name:value.Fsinger_name,
                }))
                }
                let key = value.Findex;
                if(!item_list[key]){
                    item_list[key] = {
                        title:key,
                        items:[]
                    }
                }
                item_list[key].items.push(new Singer({
                    id:value.Fsinger_mid,
                    name:value.Fsinger_name,
                }))
            })
            let hot = [];
            let ret = [];
            for(let key in item_list){
                let val = item_list[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title == HOT_NAME){
                    hot.push(val)
                }
            }
            ret.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            console.log(item_list);
            console.log(hot.concat(ret));
            return hot.concat(ret);
        }
    },
    components:{
        Listview
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
