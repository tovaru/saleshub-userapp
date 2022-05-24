<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Login</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="auth.email"
          :rules="[(v) => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="auth.password"
          :rules="[(v) => !!v || 'Password is required']"
          label="Password"
          required
        ></v-text-field>
      </v-form>
      <v-btn color="primary" class="mt-3" @click="tryLogin ">Submit</v-btn>
      <v-btn color="accent" elevation="2" class="mt-3" to="/register" text>Register</v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Logged in successfully!
        </v-card-title>
        <v-card-subtitle>
          Click the button to loggin.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newAuth ">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService";
export default {
  name: "add-auth",
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  methods: {
    tryLogin() {
      var credentials = {
        email: this.auth.email,
        password: this.auth.password,
      };
      AuthDataService.login(credentials)
        .then((response) => {
          console.log(response);
          this.submitted = true;
          alert(response.data.message);
          window.location.href = 'http://localhost:8081/userDashboard';
          //this.$router.push('userDashboard');
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    newAuth() {
      this.submitted = false;
      this.auth = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
}
</style>