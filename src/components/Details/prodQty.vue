<template>
  <q-card flat class="container">
    <q-table :columns="headers" :data="items">
      <template v-slot:bottom-row> </template>
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
    customKey: { type: String, default: "Qty" }
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
