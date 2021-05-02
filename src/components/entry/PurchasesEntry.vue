<template>
  <div>
    <q-card class="q-pa-md" flat>
      <div class="bg-grey-3 q-mb-sm">
        <q-separator inset horizontal dark />
      </div>
      <div v-for="(item, i) in items" :key="i">
        <EntryItem
          v-if="!isAdjustment"
          :item="item"
          :count="count"
          :isEditPrice="isEditPrice"
          @addContainer="addContainer"
          @removeItem="remove"
          @calculateTotal="calcTotal"
          @pushItem="Add"
        />
        <stockAdjEntryItem
          v-if="isAdjustment"
          :item="item"
          :count="count"
          @addContainer="addContainer"
          @removeItem="remove"
          @calculateTotal="calcTotal"
          @pushItem="Add"
        />
      </div>
      <div class="row fit q-mb-md" v-show="!hideTotal">
        <div class="col-grow text-right">
          <p class="">TOTAL</p>
        </div>
        <div class="col-3 text-right " v-show="!hideTotal">
          <q-input
            dense
            text-right
            readonly
            input-class="text-right"
            label-slot
            clearable
            reverse-fill-mask
            mask="#,###,###,###,###"
            suffix=".00"
            v-model="sum"
            type="text"
            label=""
          >
            <template v-slot:after>
              <span class="q-pr-lg"></span>
            </template>
          </q-input>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import numeral from "numeral";
import EntryItem from "src/components/entry/EntryItem";
import stockAdjEntryItem from "src/components/entry/stockAdjustmentEntryItem";
import services from "src/services/services";
export default {
  name: "PurchasesEntry",
  props: {
    items: { type: Array, default: null },
    isEditPrice: { type: Boolean, default: false },
    isPurchaseCost: { type: Boolean, default: false },
    hideTotal: { type: Boolean, default: false },
    isAdjustment: { type: Boolean, default: false }
  },
  components: { EntryItem, stockAdjEntryItem },
  created() {},
  mounted() {
    this.Add();
  },
  data() {
    return {
      sum: 0,
      count: 0
    };
  },
  methods: {
    calcTotal() {
      var sum = 0;
      this.items.forEach(element => {
        sum += parseFloat(services.removeComma(element.Total));
      });
      this.sum = sum;
      this.regenIndex();
    },
    addContainer(item) {
      this.items.push(item.data);
    },
    regenIndex() {
      let indexing = 1;
      this.items.forEach(item => {
        item.indx = indexing;
        indexing += 1;
      });
      this.count = this.items.length;
    },
    remove(_item) {
      if (this.items.length == 1) {
        return;
      }
      const index = this.items.indexOf(_item.item);
      console.log(index);
      this.items.splice(index, 1);
      this.regenIndex();
    },
    Add() {
      this.items.push({
        description: null,
        Total: 0,
        price: 0,
        item_qty: 0,
        id: null
      });
      this.regenIndex();
    }
  },
  computed: {
    getSum: {
      get() {
        return this.sum;
      },
      set(v) {}
    }
  },
  watch: {
    //watch items upon editing transaction and calculate its total
    items: {
      deep: true,
      handler() {
        this.calcTotal();
        this.regenIndex();
      }
    }
  }
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 5px;
</style>
