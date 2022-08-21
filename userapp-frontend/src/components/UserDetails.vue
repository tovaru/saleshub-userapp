<template>
  <div v-if="currentUser" class="edit-form py-3">
    <p class="headline">Edit User</p>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentUser.name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentUser.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentUser.password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        required
      ></v-text-field>
      <v-combobox
            v-model="currentUser.role"
            :items="items"
            label="Role"
            outlined
            dense
          ></v-combobox>
      <v-btn color="error" small class="mr-2" @click="deleteUser">
        Delete
      </v-btn>
      <v-btn color="success" small @click="updateUser">
        Update
      </v-btn>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user-details",
  data() {
    return {
      currentUser: null,
      message: "",
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = "The user was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "userDashboard" });
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>