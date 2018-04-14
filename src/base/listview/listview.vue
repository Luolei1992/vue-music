<template>
    <scroll :data="data" class="listview" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <uL>
                    <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </uL>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex == index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { genData } from 'common/js/dom.js'

const staticHeight = 18
const titleHeight = 30
export default {
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((group) => {
                return group.title.substr(0, 1)
            })
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        },

    },
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = genData(e.target, "index")
            let fstTouch = e.touches[0]
            this.touch.y1 = fstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            let fstTouch = e.touches[0]
            this.touch.y2 = fstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) / staticHeight | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            if (!index && index !== 0) {
                return
            }
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            list.map((value, idx) => {
                let item = value
                height += item.clientHeight
                this.listHeight.push(height)
            })
        },
        selectItem(item){
            this.$emit('select',item)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            if (newY > 0) {  //滚动到顶部
                this.currentIndex = 0
                return;
            }
            for (let i = 0; i < listHeight.length; i++) {   //中间部分
                let startHeight = listHeight[i]
                let endHeight = listHeight[i + 1]
                if (-newY >= startHeight && -newY < endHeight) {
                    this.currentIndex = i
                    this.diff = endHeight + newY
                    return
                }
            }
            this.currentIndex = listHeight.length - 2
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < titleHeight) ? newVal - titleHeight : 0
            if (this.fixedTop == fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }

    },

    components: {
        Scroll,
        Loading
    }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
        padding-bottom: 30px;

        .list-group-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }

        .list-group-item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;

            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }

    .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;

        .item {
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;

            &.current {
                color: $color-theme;
            }
        }
    }

    .list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }

    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
