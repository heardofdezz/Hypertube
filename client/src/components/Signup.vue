<template>
  <div class="home">
    <v-layout align-center justify-center >
      <div></div>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" dark color="rgb(50, 0, 0, 0.7)">
              <v-toolbar color="transparent" flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>SIGN UP!</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form name="signup-form" autocomplete="off">
                  <v-text-field
                    label="Email"
                    name="email"
                    type="text"
                  ></v-text-field>

                   <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="First Name"
                    name="firstname"
                    type="text"
                  ></v-text-field>

                   <v-text-field
                    label="Last Name"
                    name="lastname"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  ></v-text-field>
                  
                  <v-text-field
                    id="password2"
                    label="Type Your Password Again"
                    name="password2"
                    type="password2"
                  ></v-text-field>

                   <v-btn color="#4CAF50">Sign Up</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
  </div>
</template>
<script>
export default {
  name: 'Hypertube',
  data () {
    return {};
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
    padding-top: 90px;
font-family: 'Kameron', serif;
  background: url( 'https://www.generationcable.net/wp-content/uploads/2017/03/Netflix-Background.jpg') no-repeat center center;
    background-size: cover;
    /* background-color: red; */
    transform: scale(1.0);
}
</style>
