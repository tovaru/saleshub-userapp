<template>
  <div id="app">

    <div class="login-page">
      <transition name="fade">
        <div v-if="!data.registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div v-if="!data.registerActive" class="card login" v-bind:class="{ error: data.emptyFields }">
              <h1>Sign In</h1>
              <form class="form-group">
                <input v-model="data.emailLogin" type="email" class="form-control" placeholder="Email" required>
                <input v-model="data.passwordLogin" type="password" class="form-control" placeholder="Password"
                  required>
                <input type="submit" class="btn btn-primary" @click="doLogin">
                <p>Don't have an account? <a href="#"
                    @click="data.registerActive = !data.registerActive, data.emptyFields = false">Sign up here</a>
                </p>
                <p><a href="#">Forgot your password?</a></p>
              </form>
            </div>

            <div v-else class="card register" v-bind:class="{ error: data.emptyFields }">
              <h1>Sign Up</h1>
              <form class="form-group">
                <input v-model="data.nameReg" type="text" class="form-control" placeholder="Username" required>
                <input v-model="data.emailReg" type="email" class="form-control" placeholder="Email" required>
                <input v-model="data.passwordReg" type="password" class="form-control" placeholder="Password" required>
                <input v-model="data.confirmReg" type="password" class="form-control" placeholder="Confirm Password"
                  required>
                <v-combobox v-model="data.roleReg" :items="items" label="Role" outlined dense></v-combobox>
                <input type="submit" class="btn btn-primary" @click="doRegister">
                <p>Already have an account? <a href="#"
                    @click="data.registerActive = !data.registerActive, data.emptyFields = false">Sign in here</a>
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService";
import UserDataService from "../services/UserDataService";

export default {
  name: "login-2",
  data() {
    return {
      data: {
        registerActive: false,
        emailLogin: "",
        passwordLogin: "",
        nameReg: "",
        emailReg: "",
        passwordReg: "",
        confirmReg: "",
        roleReg: "",
        emptyFields: false
      },
      items: [
        'user',
        'admin',
      ],
    };
  },
  methods: {
    doLogin() {
      var credentials = {
        email: this.data.emailLogin,
        password: this.data.passwordLogin,
      };

      AuthDataService.login(credentials)
        .then((response) => {
          console.log(response.data);
          alert("Logged in successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    doRegister() {
      var newUser = {
        name: this.data.nameReg,
        email: this.data.emailReg,
        password: this.data.passwordReg,
        role: this.data.roleReg,
      }

      UserDataService.create(newUser)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          alert("User registered sucessfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .wallpaper-register {
    background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }

  25% {
    transform: translateX(25px);
  }

  50% {
    transform: translateX(-25px);
  }

  75% {
    transform: translateX(25px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>