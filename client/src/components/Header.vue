<template>
   <v-app-bar dark flat color="red darken-3">
    
      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Dark Mode"
      ></v-switch>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-spacer></v-spacer>
        <v-toolbar-title class="title" color="red darken-3">
          HYPERTUBE
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
            <v-btn   icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list >
            <v-list-item>
              <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-list-item>
              <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item>
              <v-btn dark @click="logout()">Logout</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-app-bar>
</template>

<script>

export default {
  props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    data: vm => ({
      initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : false,
    }),

    beforeDestroy () {
      if (!this.$vuetify) return
      this.$vuetify.theme.dark = this.initialDark
    },
  logout(){
      this.$store.dispatch('setToken', null),
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Hypertube'
      })
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    cursor: pointer;
    color:#D32F2F;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 60px;
}
.title:hover{
    color: white; 
}
</style>



