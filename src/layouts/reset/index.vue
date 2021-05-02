<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="card"
      seamless
      :maximized="$q.platform.is.mobile"
      :full-height="$q.platform.is.mobile"
    >
      <!-- <q-card class="my-card" style="max-width: 400px;width:400px;">
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>
        </q-img>
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">Sign In</div>
          </div>
        </q-card-section>

        <q-separator />

        <div class="q-pa-md">
          <q-input
            ref="email"
            color="primary"
            v-model="loginForm.email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type email']"
          ></q-input>
          <q-input
            ref="password"
            color="primary"
            v-model="loginForm.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>

        <q-separator />
        <q-card-actions align="right">
          <q-btn @click="handleLogin" flat color="primary" label="Register" />
          <q-space />
          <q-btn @click="handleLogin" flat color="primary" label="Login" />
        </q-card-actions>
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>-->
      <div>
        <!-- <q-card > -->
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="reset" label="Reset Password" /> 
          <!-- <q-tab name="reset" label="Reset" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="reset"> 
              <reset/>
          </q-tab-panel> 
        </q-tab-panels>
        <!-- </q-card> -->
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { csrf } from "src/api/auth"; 
import reset from "./reset";
export default {  
  components: { reset },
  data() {
    return {
      tab: "reset",
      card: true,
      loginForm: {
        fullname: null,
        email: "",
        password: "",
        passwor2: "",
      },
      isPwd: true,
      redirect: null,
      loading: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
};
</script>
