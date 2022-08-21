<template>
  <v-app>
    <v-app-bar app dark>
      <!-- <div class="d-flex align-center mr-2">
        Welcome, 
      </div> -->
      <div v-if="username">
        <span class="d-flex align-center mr-2">Welcome, {{ username }}.</span>
      </div>
      <div v-else>
        <div class="d-flex align-center mr-2">
        Please sign in.
        </div>
      </div>
      <v-btn color="yellow" to="/userDashboard" text>
        User database
      </v-btn>
      <v-btn color="accent" elevation="2" to="/register" text>
        Register
      </v-btn>
      <v-btn color="error" elevation="2" to="/login" text>
        Login
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AuthDataService from './services/AuthDataService';

export default {
  name: "app",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    updateUsername () {
      AuthDataService.getCurrentUser()
        .then((response) => {
          console.log(response.data);
          this.username = response.data;
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    }
  },
  mounted() {
    this.updateUsername();
  },
};
</script>