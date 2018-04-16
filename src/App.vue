<template>
    <div id="app">
        <nav-header></nav-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import NavHeader from './components/m-header/m-header'
    import Tab from './components/tab/tab'
    import Player from './components/player/player'
    export default {
        components: {
            NavHeader,
            Tab,
            Player
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
