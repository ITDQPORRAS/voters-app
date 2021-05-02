<template>
  <div>
    <div>
      <div class="row">
        <div class="col-12 col-md-12">
          <q-img
            src="https://cdn.quasar.dev/img/material.png"
            basic
            style="height: 150px;width:100%"
          >
            <div class="absolute-bottom text-subtitle2 text-center">Reset Password</div>
          </q-img>
        </div>
        <div class="col-12 col-md-12">
          <q-input
            dense
            ref="email"
            color="primary"
            v-model="resetForm.email"
            label="Email"
            lazy-rules
            readonly
            :rules="[ val => val && val.length > 0 || 'Please type email']"
          ></q-input>
        </div>
        <div class="col-6 col-md-6">
          <q-input
            dense
            stack-label
            ref="password"
            color="primary"
            v-model="resetForm.password"
            :rules="[
              val => !!val || 'Please input password.',
              val => val.length >= 8 || 'Please use minimum of 8 characters',
            ]"
            type="password"
            lazy-rules
            label="Password"
          ></q-input>
        </div>
        <div class="col-6 col-md-6">
          <q-input
            dense
            stack-label
            ref="password2"
            color="primary"
            v-model="resetForm.password2"
            :rules="[ val => val && val.length > 0 || 'Please retry password']"
            type="password"
            lazy-rules
            label="Repeat Password"
          ></q-input>
        </div>
        <div class="col-12 col-md-12">
          <q-btn @click="handleReset" style="width:100%" outline color="primary" label="Reset" />
        </div> 
        <div class="col-12 col-md-12">
          <q-btn class="float-right" @click="gotoLogin" flat rounded color="primary" label="Return to Login" />
        </div> 
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
export default {
  data() {
    return {
      tab: "login",
      card: true,
      token: null,
      resetForm: {
        email: "",
        password: "",
        password2: "",
      },
      isPwd: true,
      redirect: null,
      loading: false,
      valid: true,
    };
  },
  methods: {
    gotoLogin(){
        this.$router.push("/login");
    },
    validate() {
      this.$refs.email.validate();  
      this.$refs.password.validate();  
      this.$refs.password2.validate();  
      if (this.resetForm.password !== this.resetForm.password2) { 
        this.valid = false;
        this.$q.notify({
          color: "negative",
          message: "Password not matched!",
          icon: "report_problem",
          position: "top",
        });
      }
    }, 
    async handleReset() {
      try {
        this.valid = true;
        await this.validate();
        if (this.$refs.email.hasError || this.$refs.password.hasError || this.$refs.password2.hasError) {
          this.formHasError = true;
        } else { 
          if (this.valid) {  
            this.$q.loading.show();
            const datax = new Resource("password-reset");
            const { data } = await datax.store({
                token: this.token,
                email: this.resetForm.email,
                password: this.resetForm.password,
                password_confirmation: this.resetForm.password2
            }); 
            console.log(data);
            this.$q.notify(JSON.stringify(data.Message)); 
             this.$q.loading.hide();
            this.gotoLogin();
          }
        }
      } catch (error) { 
        this.$q.notify(JSON.stringify(error)); 
         this.$q.loading.hide();
      }
    }, 
  },
  created() {
      this.resetForm.email = this.$route.query.e;
      this.token = this.$route.query.t;
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
<style lang="sass" scoped>
.row > div
  padding: 5px 5px
</style>
