<template>
    <div id="app">
        <div class="nav">
            <router-link class="nav-link" to="/asin">ASIN</router-link>
            <router-link class="nav-link" to="/keywords">KEYWORDS</router-link>
<!--            <router-link class="nav-link" to="/synonyms">SYNONYMS</router-link>-->
        </div>
        <router-view/>
    </div>
</template>

<script>


    export default {
        name: 'App',
        components: {

        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
