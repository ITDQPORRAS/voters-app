<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col-12 col-md-12">
        <q-input
          type="text"
          v-model="item.description"
          label="Description"
          readonly
        />
      </div>
      <div class="col-12 col-md-12">
        <q-input
          v-model="form.qty"
          type="number"
          label="Quantity"
          ref="qtyinput"
          autofocus
          @focus="focus"
          @keydown.enter.prevent="send"
        />
      </div>
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
    item: Object
  },
  data() {
    return {
      form: {
        qty: 0
      },
      disabled: true
    };
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
      if (this.form.qty !== 0) {
        this.item.qty = this.form.qty;
        EventBus.$emit("send", this.item);
      }
    }
  },
  watch: {
    "form.qty": {
      handler(NewVal, OldVal) {
        if (NewVal == 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      }
    }
  }
};
</script>
