<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="name" label="Search by Name"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchName">
        Search
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users</v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-card-actions v-if="users.length > 0">
          <!-- <v-card-actions> -->
          <v-btn small color="error" @click="removeAllUsers">
            Remove All
          </v-btn>
        </v-card-actions>
        <v-btn small color="accent" @click="refreshList">
            Refresh
          </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "users-list",
  data() {
    return {
      users: [],
      name: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        //{ text: "Id", value: "id", sortable: false },
        { text: "E-mail", value: "email", sortable: false },
        // { text: "Password", value: "password", sortable: false },
        { text: "Role", value: "role", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.map(this.getDisplayUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    searchName() {
      UserDataService.findByName(this.name)
        .then((response) => {
          this.users = response.data.map(this.getDisplayUser);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    editUser(id) {
      this.$router.push({ name: "userDetails", params: { id: id } });
    },
    deleteUser(id) {
      UserDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          alert(e.response.data.message);
        });
    },
    getDisplayUser(user) {
      return {
        id: user.id,
        name: user.name.length > 30 ? user.name.substr(0, 30) + "..." : user.name,
        email: user.email.length > 30 ? user.email.substr(0, 30) + "..." : user.email,
        role: user.role.length > 30 ? user.role.substr(0, 30) + "..." : user.role,
      };
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>