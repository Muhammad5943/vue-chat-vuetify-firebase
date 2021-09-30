<template>
  <!-- <v-app>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app> -->

  <div id="app">
    <chat v-if="user" />
    <login v-else />
  </div>
</template>

<script>
import firebase from 'firebase';
import Chat from '@/components/Chat.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'App',
  components: {
    'chat': Chat,
    'login': Login
  },

  data: () => ({
    user: firebase.auth().currentUser
  }),
};
</script>

<style>
  .danger-alert {
    color: red;
  }
</style>
