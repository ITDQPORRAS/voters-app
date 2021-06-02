<template>
  <div class="q-pa-sm">
    <q-table
      title="Voters List"
      :data="list"
      :columns="columns"
      row-key="voterid"
      :loading="loading"
      dense
      @request="onRequest"
      :pagination.sync="pagination"
    >
      <template v-slot:header-cell-precinctno="props">
        <q-th :props="props">
          <q-input
            v-model="listHeader.precinctno"
            :label="props.col.label"
            type="text"
            dense
          ></q-input>
        </q-th>
      </template>
      <template v-slot:header-cell-lastname="props">
        <q-th :props="props">
          <q-input
            v-model="listHeader.lastname"
            :label="props.col.label"
            type="text"
            dense
          ></q-input>
        </q-th>
      </template>
      <template v-slot:body-cell-fname="props">
        <q-td :props="props">
          {{ props.row.firstname + " " + props.row.middlename }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import Resource from "@/api/resource";
export default {
  data() {
    return {
      loading: false,
      listHeader: {
        lastname: "",
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
        { label: "Barangay", field: "barangay", align: "left" },
        { label: "Sitio", field: "sitio", align: "left" },
        { label: "address", field: "address", align: "left" }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        this.countDown = 0;
        const par = {
          pagination: this.pagination,
          filters: this.listHeader
        };
        this.onRequest(par);
      } catch (error) {
        this.loading = false;
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    async onRequest(props) {
      this.countDown = 0;
      this.loading = true;
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = this.listHeader;
      const fetchCount =
        rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
      const startRow = (page - 1) * rowsPerPage;
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;
      await this.fetchFromServer(
        startRow,
        fetchCount,
        filter,
        sortBy,
        descending
      );
      this.loading = false;
    },
    async fetchFromServer(startRow, count, filter, sortBy, descending) {
      const par = {
        startRow: startRow,
        count: count,
        filter: filter,
        sortBy: sortBy,
        descending: descending,
        type: this.type
      };
      this.loading = true;
      await new Resource("Voters/show").store(par).then(async ({ data }) => {
        this.list = data.list;
        this.loading = false;
      });
      await new Resource("Voters/showCount").store(par).then(({ data }) => {
        this.pagination.rowsNumber = data.count;
      });
      const { data } = await datax.store(par);
      this.pagination.rowsNumber = data.count;
      return data;
    }
  },
  watch: {
    listHeader: {
      deep: true,
      handler(val) {
        this.countDown = 3;
        this.countDownTimer();
      }
    },
    countDown(val) {
      if (val == 0) {
        this.getList();
      }
    }
  }
};
</script>

<style scoped></style>
