<template>
   <v-app-bar dark flat color="red darken-3">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-toolbar-title color="primary">
          <router-link class="home" to="/">HYPERTUBE</router-link>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn"  icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items>
          <v-btn v-if="$store.state.isUserLoggedIn" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn  v-if="$store.state.isUserLoggedIn" icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list>
            <v-list-item>
              <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-list-item>
              <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-app-bar>
</template>

<script>
export default {
  logout(){
      this.$store.dispatch('setToken', null),
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    cursor: pointer;
    color:#D32F2F;
}
.home:hover{
    color: white; 
}
</style>



