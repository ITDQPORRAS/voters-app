<template>
  <div class="row fit full-width ">
    <div style="padding:5px; ">
      <q-btn
        v-if="item.indx == count"
        size="10px"
        unelevated
        class="vertical-middle "
        color="positive"
        dense
        round
        icon="mdi-plus"
        @click="pushItem"
        :style="[
          item.indx == 1 ? { 'margin-top': '20px' } : { 'margin-top': '-5px' }
        ]"
      />
      <q-btn
        v-if="item.indx !== count"
        size="10px"
        unelevated
        class="vertical-middle cursor-inherit"
        color="transparent"
        dense
        round
      />
    </div>
    <div class="col-10">
      <span
        v-show="item.indx == 1"
        class="label text-bold "
        style="padding-left:5px; "
        >{{ item.indx == 1 ? "Description" : "" }}</span
      >
      <SelectProduct
        ref="select_product"
        @selected="productSelected"
        optionLabel=""
        :selected="item.id ? item.id : null"
        :rules="[v => !!v || 'required']"
      />
    </div>
    <div class="col-1 text-right">
      <span v-show="item.indx == 1" class="label text-bold">{{
        item.indx == 1 ? "Qty" : ""
      }}</span>
      <q-input
        input-class="text-right"
        dense
        :disable="item.id ? false : true"
        reverse-fill-mask
        mask="#,###,###"
        v-model="getQty"
        type="number"
        label=""
      />
    </div>
    <div class="col text-right">
      <q-btn
        round
        dense
        flat
        size="10px"
        color="grey-7"
        icon="mdi-delete"
        @click="remove(item)"
      />
    </div>
  </div>
</template>

<script>
import SelectProduct from "src/components/selection/SelectProduct";

export default {
  components: {
    SelectProduct
  },
  props: {
    item: { type: Object },
    position: { type: Number },
    count: { type: Number }
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    productSelected(params) {
      if (params) {
        this.item.id = params.product[0].id;
        if (this.isPurchase) {
          this.item.price = params.product[0].po_price;
        } else {
          this.item.price = params.product[0].sellingPrice;
        }
        this.item.description = params.product[0].description;
        this.$emit("calculateTotal");
      }
    },
    pushItem() {
      this.$emit("pushItem");
    },
    remove(xx) {
      this.$emit("removeItem", {
        item: this.item
      });
      this.$emit("calculateTotal");
    },
    removeComma(number) {
      if (number) {
        return number.toString().replace(",", "");
      }
      return 0;
    }
  },
  computed: {
    getQty: {
      get() {
        return this.item.item_qty;
      },
      set(newqty) {
        this.item.item_qty = newqty;
        var qty = this.item.item_qty ? this.removeComma(this.item.item_qty) : 0;
        var price = this.item.price ? this.removeComma(this.item.price) : 0;
        this.item.Total = parseInt(qty) * parseInt(price);
        this.$emit("calculateTotal");
      }
    }
  }
};
</script>

<style></style>
