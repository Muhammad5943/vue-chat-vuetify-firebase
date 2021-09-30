<template>
  <v-row justify="center" class="login-container">
    <v-container>
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        @click="loginSign"
      >
        login
      </v-btn>
    </v-container>
  </v-row>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {};
  },

  methods: {
    loginSign() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithRedirect(provider)
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  text-align: center;
  padding-top: 50px;
  button {
    width: 50%;
    font-weight: bold;
    font-size: 18pt;
    padding: 20px;
    border-radius: 15px;
    border: none;
    box-shadow: #00000040 0px 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #7562ff;
    }
  }
}
</style>
