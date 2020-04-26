<template>
  <div class="home">
    <v-layout align-center justify-center >
      <div></div>
          <v-flex xs12 sm8 md4>

                 <v-btn x-large rounded color="success" :to="{
                     name: 'Login'
                 }">LOGIN</v-btn>
                 
                <v-spacer></v-spacer>
                <br>
                <p>OR</p>
                <br>
                 <v-btn x-large rounded color="primary" :to="{
                     name: 'Register'
                 }">SIGN UP</v-btn>
                <v-spacer></v-spacer> 
          </v-flex>
        </v-layout>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
    font-size: 90px;
    color: whitesmoke;
}
p:hover{
    color: #D32F2F;
}
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
