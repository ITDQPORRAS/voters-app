<template>
  <div>
    <q-select
      v-model="optionModel"
      clearable
      :options="option"
      option-value="id"
      option-label="FullName"
      :label="optionLabel"
      dense
      emit-value
      :readonly="readonly"
      map-options
      use-input
      input-debounce="0"
      @filter="filterQSelect"
      :rules="rules"
    >
      <!-- :error="$v.main.Vendor_id.$error" -->

      <template v-slot:no-option>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              icon="add"
              font-size="30px"
              size="30px"
              text-color="positive"
            ></q-avatar>
          </q-item-section>
          <q-item-section>
            No results, Add New?
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    optionLabel: { type: String, default: "Employee" },
    selected: [String, Number],
    readonly: { type: Boolean, default: false },
    rules: Array
  },
  data() {
    return {
      search: ""
    };
  },
  created() {},
  methods: {
    filterQSelect(val, update, abort) {
      setTimeout(() => {
        update(
          () => {
            if (val === "") {
              this.search = "";
            } else {
              const needle = val.toLowerCase();
              this.search = needle;
            }
          },
          ref => {
            if (val !== "" && ref.options.length > 0) {
              ref.setOptionIndex(-1);
              ref.moveOptionSelection(1, true);
            }
          }
        );
      }, 300);
    },
    ClearSearch() { 
      this.search = ""; 
    }
  },
  computed: {
    ...mapGetters(["GETUSERS"]),
    option: {
      get() {
        return this.GETUSERS.filter(
          v => v.FullName.toLowerCase().indexOf(this.search) > -1
        );
      }
    },
    optionModel: {
      get() {
        return this.selected;
      },
      set(v) {
        this.search = "";
        this.$emit("selected", v);
      }
    }
  }
};
</script>

<style></style>
