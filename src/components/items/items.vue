<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-12 col-md-12">
        <q-input type="text" v-model="name" label="Description" readonly />
      </div>
      <div class="col-12 col-md-12">
        <q-input
          v-model="form.qty"
          type="number"
          label="Quantity"
          autofocus
          ref="qtyinput"
          @focus="focus"
          @keydown.enter.prevent="send"
        />
      </div>
      <!-- <div class="col-12 col-md-12">
        <q-input readonly v-model="form.price" type="number" label="Price" />
      </div>
      <div class="col-12 col-md-12">
        <q-input readonly v-model="form.total" type="number" label="Total" />
      </div>
      <div v-if="showPaid" class="col-12 col-md-12">
        <q-input
          v-model="form.paid"
          type="number"
          label="Paid"
          mask="#,##0.00"
        />
      </div> -->
      <q-separator spaced inset vertical dark />
      <div class="col-12 col-md-12">
        <div class="row">
          <div class="col-6">
            <q-btn
              flat
              rounded
              color="primary"
              style="width:120px;border:1px solid #ccc"
              outline
              icon="arrow_back_ios"
              label="back"
              @click="goHome"
            />
          </div>
          <div class="col-6 text-right">
            <q-btn
              rounded
              unelevated
              style="width:120px;border:1px solid #ccc"
              color="positive"
              icon="check_circle_outline"
              :disabled="disabled"
              @click="send"
              label="Ok"
              flat
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from "./_event";
export default {
  props: {
    id: Number,
    name: String,
    po_price: Number,
    price: Number,
    container_id: Number,
    showPaid: { type: Boolean, default: false },
    computePaid: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        id: "",
        description: "",
        qty: 0,
        po_price: 0,
        price: 0,
        total: 0,
        paid: 0,
        container_id: 0
      },
      disabled: true
    };
  },
  watch: {
    "form.qty": {
      handler(NewVal, OldVal) {
        this.form.total = Number(NewVal * this.form.price).toFixed(2);
        if (NewVal > 0) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
        if (this.computePaid) {
          this.form.paid = this.form.total;
        }
      }
    },
    "form.price": {
      handler(NewVal, OldVal) {
        this.form.total = Number(NewVal * this.form.qty).toFixed(2);
        if (this.computePaid) {
          this.form.paid = this.form.total;
        }
      }
    },
    price: {
      handler(NewVal) {
        this.form.price = NewVal;
      }
    }
  },
  created() {
    this.form.price = this.price;
  },
  methods: {
    goHome(val) {
      EventBus.$emit("list", val);
    },
    focus: function() {
      this.$refs.qtyinput.select();
    },
    close() {
      EventBus.$emit("closed");
    },
    send() {
      if (this.form.qty > 0) {
        this.form.id = this.id;
        this.form.container_id = this.container_id;
        this.form.po_price = this.po_price;
        this.form.description = this.name;
        EventBus.$emit("send", this.form);
      }
    }
  }
};
</script>
