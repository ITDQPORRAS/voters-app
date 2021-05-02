<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>App</q-toolbar-title>
        <q-space />
        <div class="q-pl-sm q-gutter-sm row">
          <q-btn dense round outline>
            <q-icon name="more_vert" round flat />
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{this.name}}</div>
                  <q-btn
                    @click="logout"
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 130px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{this.userName}}</div>
          <div class="text-subtitle1">{{this.name}}</div>
          <!-- <div>{{this.userName}}</div> -->
        </div>
      </q-img>
      <q-scroll-area
        style="height: calc(100% - 130px); margin-top: 130px; border-right: 1px solid #ddd"
      >
        <q-list>
          <q-expansion-item
            group="somegroup"
            v-for="(item,i) in routess"
            :key="i"
            expand-separator
            :icon="item.icon"
            :label="item.name"
            v-show="item.hidden !== true"
          >
            <q-list v-for="(child,c) in item.children" :key="c">
              <router-link
                :to="child.path"
                exact
                tag="div"
                class="item item-link drawer-closer cursor-pointer"
              >
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" :name="child.icon" />
                  </q-item-section>
                  <q-item-section>{{child.name}}</q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
// import EssentialLink from "components/EssentialLink.vue";
import { allRoutes } from "src/router";
import { getToken } from "src/utils/auth"; // get token from cookie
import store from "src/store";
export default {
  name: "MainLayout",

  data() {
    return {
      tab: "home",
      leftDrawerOpen: true,
      routess: []
    };
  },
  mounted() {
    this.loadRoutes();
    const hasToken = getToken();
    if (!hasToken) {
      this.$router.push("/login");
    } else {
      try {
        if (!this.userName) {
          store
            .dispatch("user/getInfo")
            .then(response => {
              store.dispatch("global/getData");
            })
            .catch(error => {
              this.$router.push(this.redirect || "/");
            });
        }
      } catch (error) {
        alert(error);
      }
    }
  },
  methods: {
    loadRoutes() {
      allRoutes.forEach(element => {
        element.forEach(el => {
          this.routess.push(el);
        });
      });
    },
    async logout() {
      this.$q.loading.show();
      this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
      this.$q.loading.hide();
    }
  },
  watch: {
    tab: function(Val) {
      // this.$router.push({ name: "/home/" });
      this.$router.push("/" + Val);
    }
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "device", "userId", "userName"])
  }
};
</script>
