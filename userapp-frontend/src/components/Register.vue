<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">User Registration</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'Username is required']"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          :rules="[(v) => !!v || 'Email is required']"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :rules="[(v) => !!v || 'Password is required']"
          label="Password"
          required
        ></v-text-field>
        <v-combobox
            v-model="user.role"
            :items="items"
            label="Role"
            outlined
            dense
          ></v-combobox>
      </v-form>
      <v-btn color="primary" class="mt-3" @click="saveUser">Submit</v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          User registered successfully!
        </v-card-title>
        <v-card-subtitle>
          Click the button to complete registration.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        password: "",
        role: "",
      },
      items: [
        'user',
        'admin',
      ],
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
      };
      UserDataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
}
</style>