<template>
  <q-card flat>
    <q-card-section>
      <div class="row">
        <div class="col-12">
          <q-table :columns="headers" :data="items.checks">
            <template v-slot:bottom-row>
              <q-tr class="text-left" style="background-color:#ccc;color:black">
                <q-td> </q-td>
                <q-td> </q-td>
                <q-td> </q-td>
                <q-td><b>Total</b></q-td>
                <q-td class="float-right"
                  ><b>{{ sumField("check_amount") }}</b>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:body-cell-invref="props">
              <q-td :props="props">
                <q-avatar
                  size="40px"
                  font-size="20px"
                  color="positive"
                  text-color="white"
                  icon="mdi-receipt"
                />
                <span class="q-pr-md"></span> {{ props.row.invref }}
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <hr />
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <b>Checks:</b>
            </div>
            <div class="col-6 text-right q-pr-sm">
              {{ sumField("check_amount") }}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <b>Cash:</b>
            </div>
            <div class="col-6 text-right q-pr-sm">{{ getCash() }}</div>
          </div>
          <hr />
          <div class="row">
            <div class="col-6">
              <b> Total:</b>
            </div>
            <div class="col-6 text-right q-pr-sm">{{ getTotal() }}</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import Resource from "src/api/resource";
import numeral from "numeral";
export default {
  props: { id: [Number, String, Object] },
  created() {
    this.getInvoices();
  },
  data() {
    return {
      items: {
        cash: [],
        checks: []
      },
      headers: [
        {
          name: "reference",
          label: "Reference",
          field: "reference",
          align: "left"
        },
        {
          name: "bank_name",
          label: "Bank",
          field: "bank_name",
          align: "left"
        },
        {
          name: "check_number",
          label: "Check #",
          field: "check_number",
          align: "left"
        },
        {
          name: "check_date",
          label: "Check Date",
          field: "check_date",
          align: "left"
        },
        {
          name: "check_amount",
          label: "Amount",
          field: "check_amount",
          align: "right",
          format: (val, row) =>
            `${(val * 1)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        }
      ]
    };
  },
  methods: {
    async getInvoices() {
      this.$q.loading.show();
      const res = new Resource("payment/getReceiptInfo");
      await res
        .get(this.id)
        .then(({ data }) => {
          this.$q.loading.hide();
          this.items = data;
        })
        .catch(er => {
          this.$q.loading.hide();
          console.log(er);
        });
    },
    close() {
      this.$emit("closed");
    },
    getTotal() {
      const cash = this.items.cash.reduce(
        (a, b) => parseFloat(a) + (parseFloat(+b["cashPmt"]) || 0),
        0
      );
      const check = this.items.checks.reduce(
        (a, b) => parseFloat(a) + (parseFloat(+b["check_amount"]) || 0),
        0
      );
      return numeral(parseFloat(cash) + parseFloat(check)).format("00,00.00");
    },

    getCash() {
      return numeral(
        this.items.cash.reduce(
          (a, b) => parseFloat(a) + (parseFloat(+b["cashPmt"]) || 0),
          0
        )
      ).format("00,00.00");
    },
    sumField(key) {
      if (!this.customKey == "" || !this.customKey == null) {
        key = this.customKey;
      }
      return numeral(
        this.items.checks.reduce(
          (a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
          0
        )
      ).format("00,00.00");
    }
  }
};
</script>
