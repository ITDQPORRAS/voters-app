<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-4">
          <q-input v-model="text" label="Standard1" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model="text" label="Standard2" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model="text" label="Standard3" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model="text" label="Standard3" />
        </div>
        <div class="col-12 col-md-12">
          <q-btn @click="save" color="primary" label="Primary" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Resource from "src/api/resource";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      text: null
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),
    async save() {
      const par = { email: "alex@codecourse.com", password: "ilovecats" };
      await this.$axios.get("sanctum/csrf-cookie");
      await this.$axios.post("auth/login", par);
    }
  }
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 5px 5px
</style>

