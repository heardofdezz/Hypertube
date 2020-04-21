<template>
  <div class="home">
    <v-layout align-center justify-center >
      <div></div>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" dark color="rgb(50, 0, 0, 0.7)">
              <v-toolbar color="transparent" flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>LOGIN !  </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form name="signup-form" autocomplete="off">
                  <v-text-field 
                  v-model="email"
                    label="Em@il"
                    name="Email"
                    type="text"
                  ></v-text-field>
                  
                  <v-text-field
                  v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  ></v-text-field>
                   <v-btn @click="login" color="grey darken-2">Login</v-btn>
                </v-form>
                <div class="error" v-html="error" />
                <p><a href="">Forgot Password?</a></p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue-grey darken-1">42_Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn  color="#4CAF50"
                :to="{
                        name: 'Register'
                      }">Sign Up</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2">Gmail</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
  </div>
</template>

<script>
import UsersService  from '@/services/UsersService';
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await UsersService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setToken', response.data.token).then(() => {
          this.router.push('/movies')
        })
      } catch (error){
        this.error = error.response.data.error
      }
  console.log('login button has been clicked', this.email, this.password)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home {
  width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
font-family: 'Bangers', cursive;
padding-top: 90px;
  background: url( 'https://www.generationcable.net/wp-content/uploads/2017/03/Netflix-Background.jpg') no-repeat center center;
    background-size: cover;
    /* background-color: red; */
    transform: scale(1.0);
}
</style>
