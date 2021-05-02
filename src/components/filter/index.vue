<template>
  <div class="row">
    <div v-show="showDate" class="col-12 col-md-12">
      <div class="col-12 col-md-12">
        <q-select
          :options="types"
          v-model="form.filter"
          option-value="id"
          option-label="description"
          label="Filter By"
          stack-label
        />
      </div>
      <div class="col-12 col-md-12">
        <q-input v-model="form.from" mask="date" label="From" :rules="['date']" stack-label>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.from" @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="form.to" mask="date" label="To" :rules="['date']" stack-label>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                <q-date v-model="form.to" @input="() => $refs.qDateProxy2.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="col-12 col-md-12">
      <slot />
    </div>
    <div class="col-12 col-md-12">
      <q-btn class="full-width" @click="ok" rounded color="primary" label="Ok" />
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  props: {
    showDate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      FromCaption: "",
      DisplayFormat: "MM/dd/yyyy",
      form: {
        filter: "Month",
        from: this.$moment(new Date().toLocaleString()).format("YYYY-MM-01"),
        to: this.$moment(new Date().toLocaleString()).format("YYYY-MM-DD"),
        reportcaption: "",
      },

      types: [
        { id: 1, description: "Range" },
        { id: 2, description: "Month" },
        { id: 3, description: "Year" },
      ],
    };
  },
  methods: {
    ok() {
      //   alert(date.formatDate(this.form.to, "YYYY-MM-DD"));
      this.form.from = date.formatDate(this.form.from, "YYYY-MM-DD");
      this.form.to = date.formatDate(this.form.to, "YYYY-MM-DD");
      this.$emit("data", this.form);
    },
    filterChange() {
      if (this.form.filter === "Month") {
        this.form.from = moment(this.form.from).format("YYYY-MM-01");
        this.form.to = moment(this.form.from)
          .endOf("month")
          .format("YYYY-MM-DD");
        this.form.reportcaption = moment(this.form.from).format("MMMM YYYY");
        this.DisplayFormat = "MMMM yyyy";
        this.FromCaption = "Month";
      } else if (this.form.filter === "Year") {
        this.form.from = moment(this.form.from).format("YYYY-01-01");
        this.form.to = moment(this.form.from)
          .endOf("year")
          .format("YYYY-MM-DD");
        this.DisplayFormat = "yyyy";
        this.FromCaption = "Year";
        this.form.reportcaption = moment(this.form.from).format("YYYY");
      } else if (this.form.filter === "Daily") {
        this.form.from = moment(this.form.from).format("YYYY-MM-DD");
        this.form.to = moment(this.form.from).format("YYYY-MM-DD");
        this.DisplayFormat = "MM/dd/yyyy";
        this.FromCaption = "Daily";

        this.form.reportcaption = moment(this.form.from).format("MMMM DD,YYYY");
      } else if (this.form.filter === "Range") {
        this.form.from = moment(this.form.from).format("YYYY-MM-DD");
        this.form.to = moment(this.form.to).format("YYYY-MM-DD");
        this.DisplayFormat = "MM/dd/yyyy";
        this.FromCaption = "From";

        this.form.reportcaption =
          moment(this.form.from).format("MMMM DD,YYYY") +
          " - " +
          moment(this.form.to).format("MMMM DD,YYYY");
      }

      this.selected(this.form);
    },
  },
};
</script>

<style lang="sass" scoped>
.row > div
  padding: 5px 5px
</style>
