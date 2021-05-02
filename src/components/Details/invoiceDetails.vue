<template>
  <q-card flat>
    <q-table :columns="headers" :data="items">
      <template v-slot:bottom-row>
        <q-tr class="text-left" style="background-color:#ccc;color:black">
          <q-td><b>Total</b></q-td>
          <q-td
            ><b>{{ sumField("Total") }}</b>
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
  </q-card>
</template>
<script>
import numeral from "numeral";
export default {
  props: {
    headers: Array,
    items: Array,
    title: String,
    customKey: { type: String, default: "Total" }
  },
  methods: {
    close() {
      this.$emit("closed");
    },
    sumField(key) {
      if (!this.customKey == "" || !this.customKey == null) {
        key = this.customKey;
      }
      return numeral(
        this.items.reduce(
          (a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
          0
        )
      ).format("00,00.00");
    }
  }
};
</script>
