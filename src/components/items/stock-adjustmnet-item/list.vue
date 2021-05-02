<template>
  <q-card flat>
    <div class="row">
      <div class="col">
        <q-btn round flat color="positive" icon="refresh" @click="refresh" />
      </div>
    </div>
    <q-pull-to-refresh @refresh="refresh">
      <q-table
        :loading="loading"
        :columns="headers"
        :data="getActiveProducts"
        :filter="search"
        flat
        :rows-per-page-options="[20, 30, 50, 60, 80, 100, 500, 1000]"
        @row-click="onRowClick"
        style="width:100%"
        row-key="id"
      >
        <template v-slot:top-right>
          <q-input
            dense
            rounded
            debounce="500"
            style="width:150px"
            v-model="search"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-pull-to-refresh>
    <dlg
      v-model="dlgItem"
      :title="`selected.description`"
      :showToolBar="true"
      :showCommand="false"
    >
      <template v-slot>
        <items ref="entry" />
      </template>
    </dlg>
  </q-card>
</template>
<script>
import Resource from "@/api/resource";
import EventBus from "./_event";
import dlg from "#/dlg";
import items from "./items";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { dlg, items },
  data() {
    return {
      dlgItem: false,
      search: "",
      loading: false,
      selected: [],
      headers: [
        { label: "Item Code", field: "code", align: "left" },
        { label: "Item Description", field: "description", align: "left" }
      ]
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    ...mapActions(["getProductInfo"]),
    async getItem() {
      this.loading = true;
      await this.getProductInfo();
      this.loading = false;
    },
    async refresh(done) {
      this.getItem();
      done();
    },
    onRowClick(evt, row) {
      this.selected = row;
      EventBus.$emit("selected", row);
    },
    getDetails(val) {},
    close() {
      EventBus.$emit("closed");
    }
  },
  computed: {
    ...mapGetters(["items", "getActiveProducts", "products"])
  }
};
</script>
