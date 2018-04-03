<template>
    <div id="app">
        <nav-header></nav-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import NavHeader from './components/m-header/m-header'
    import Tab from './components/tab/tab'
    export default {
        components: {
            NavHeader,
            Tab
        }
    }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
