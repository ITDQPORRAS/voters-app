<template>
  <div class="q-pa-sm">
    <q-table title="Leader List" :data="data" :columns="columns" row-key="name">
      <template v-slot:top-right>
        <q-btn round color="primary" icon="group_add" @click="onVoterList" />
      </template>
    </q-table>
    <q-voters v-model="dlgVoters" @selected="onSelectedLeader"> </q-voters>
    <q-dlg
      v-model="dlgselected"
      :title="selectedData.lastname + ', ' + selectedData.firstname"
      @save="onSave"
    >
      <selected :datax="selectedData" />
    </q-dlg>
  </div>
</template>

<script>
import selected from "./selected";
export default {
  components: { selected },
  data() {
    return {
      selectedData: {},
      dlgselected: false,
      search: "",
      dlgVoters: false,
      listHeader: {
        lastname: "",
        fname: "",
        barangay: "",
        precinctno: ""
      },
      pagination: {
        sortBy: "voters.voterid",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15
      },
      count: 0,
      countDown: 3,
      list: [],
      columns: [
        {
          name: "precinctno",
          label: "Precinct No",
          field: "precinctno",
          align: "left"
        },
        {
          name: "lastname",
          label: "Last Name",
          field: "lastname",
          align: "left"
        },
        {
          name: "fname",
          label: "First Name and Middle name",
          field: "firstname",
          align: "left"
        },
        { label: "DOB", field: "birthday", align: "left" },
        {
          name: "barangay",
          label: "Barangay",
          field: "barangay",
          align: "left"
        },
        // { label: "Sitio", field: "sitio", align: "left" },
        { label: "address", field: "address", align: "left" }
      ]
    };
  },
  methods: {
    onSave() {
      alert("asd");
    },
    onVoterList() {
      this.dlgVoters = true;
    },
    onSelectedLeader(item) {
      this.dlgVoters = false;
      this.selectedData = item;
      this.dlgselected = true;
    }
  }
};
</script>
