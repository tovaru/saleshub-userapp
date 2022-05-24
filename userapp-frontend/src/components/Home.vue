<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        User Account Manager
      </div>
      <v-btn to="/tutorials" text>
        User database
      </v-btn>
      <v-btn to="/register" text>
        Create user
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>