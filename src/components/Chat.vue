<template>
     <div class="wrapper">
          <v-row justify="center" class="logout-container">
          <v-container>
               <header>
               <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    @click="logoutSign"
               >
                    logout
               </v-btn>

               <h1>Chat firebase!!</h1>
               </header>

               <section>
               <main>
                    <div
                         v-for="(msg, i) in messages"
                         :key="'i-'+i"
                         :class="['message', sentOrReceived(msg.userUID)]"
                    >
                         <img
                              :src="msg.photoURL"
                              :alt="msg.displayName"
                         />

                         <p>{{ msg.text }}</p>
                    </div>

                    <div
                         ref="scrollable"
                    ></div>
               </main>

               <form @submit.prevent="sendMessage">
                    <v-text-field
                    v-model="message"
                    :counter="100"
                    :error-messages="errors"
                    label="Message"
                    :rules="rules"
                    required
                    ></v-text-field>

                    <v-btn 
                         class="mr-4" 
                         type="submit"
                         :dissabled="!message"
                    >Submit</v-btn>
               </form>
               </section>
          </v-container>
          </v-row>
     </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      rules: [(value) => !!value || "Required."],
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: "",
      messages: [],
    };
  },

  methods: {
    logoutSign() {
      firebase.auth().signOut();
    },

    sentOrReceived(userUID) {
         return userUID === this.user.uid ? 'sent' : 'received'
    },

    async sendMessage() {
     //  e.preventDefault();

      const messageInfo = {
        userUID: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        text: this.message,
        createdAt: Date.now(),
      };

      await this.db.collection("messages").add(messageInfo);

      this.message = "";
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
    },
  },

  mounted() {
       this.db.collection('messages').orderBy('createdAt')
          .onSnapshot((queryShap) => {
               this.messages = queryShap.docs.map((doc) => doc.data())
          })
  },
};
</script>

<style lang="scss" scoped>
.logout-container {
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

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
.wrapper {
  text-align: center;
  max-width: 728px;
  margin: 0 auto;
  header {
    background-color: #181717;
    height: 10vh;
    min-height: 50px;
    color: white;
    position: fixed;
    width: 100%;
    max-width: 728px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    padding: 10px;
    box-sizing: border-box;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background-color: rgb(40, 37, 53);
    main {
      padding: 10px;
      height: 75vh;
      margin: 10vh 0 10vh;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar {
        width: 0.25rem;
      }
      &::-webkit-scrollbar-track {
        background: #1e1e24;
      }
      &::-webkit-scrollbar-thumb {
        background: #6649b8;
      }
    }
    form {
      height: 10vh;
      position: fixed;
      bottom: 0;
      background-color: rgb(24, 23, 23);
      width: 100%;
      max-width: 728px;
      display: flex;
      font-size: 1.5rem;
      button {
        width: 20%;
        background-color: rgb(56, 56, 143);
      }
      input {
        line-height: 1.5;
        width: 100%;
        font-size: 1.5rem;
        background: rgb(58, 58, 58);
        color: white;
        outline: none;
        border: none;
        padding: 0 10px;
      }
    }
  }
  button {
    background-color: #282c34; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 1.25rem;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  button,
  input {
    color: #fff;
    border: none;
  }
  p {
    max-width: 500px;
    margin-bottom: 12px;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    color: white;
    text-align: center;
  }
  .message {
    display: flex;
    align-items: center;
    &.received {
      p {
        background: #e5e5ea;
        color: #000;
        text-align: left;
      }
    }
    &.sent {
      flex-direction: row-reverse;
      p {
        color: #fff;
        background: #0b93f6;
        align-self: flex-end;
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 2px 5px;
    }
    p {
      max-width: 500px;
      margin-bottom: 12px;
      line-height: 24px;
      padding: 10px 20px;
      border-radius: 25px;
      position: relative;
      color: #fff;
      text-align: center;
    }
  }
}
</style>