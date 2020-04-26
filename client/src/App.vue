<template>
  <div id="app">
<link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">
     <page-header/>
   <v-app>
      <v-content>
        <v-container fluid fill-height>
              <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
  width: 100%;
  height: 100%;
}
</style>
