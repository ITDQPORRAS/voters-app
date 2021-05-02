<template>
  <div>
    <q-select
      v-model="optionModel"
      clearable
      :options="option"
      option-value="id"
      option-label="FullName"
      :label="optionLabel"
      :disable="disable"
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

      <template v-slot:before-options>
        <q-item
          clickable
          class="text-positive"
          @click="dlgEntry = true"
          v-ripple
        >
          <q-item-section>
            Add New
          </q-item-section>
          <q-item-section avatar>
            <q-avatar
              icon="add"
              font-size="30px"
              size="30px"
              text-color="positive"
            ></q-avatar>
          </q-item-section>
        </q-item>
      </template>
      <dlg
        :showCommand="false"
        title="Add New Employee"
        v-model="dlgEntry"
        @save="addNew"
      >
        <div class="col-12 col-12-xs">
          <entry ref="entry" @close="closeentry" @cancelwindow="cancelwindow" />
        </div>
      </dlg>
    </q-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dlg from "#/dlg";
import entry from "src/pages/setup/Employee/entry";
export default {
  components: {
    dlg,
    entry
  },
  props: {
    optionLabel: { type: String, default: "Custodian" },
    selected: [String, Number],
    readonly: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    data: Array,
    rules: Array
  },
  data() {
    return {
      dlgEntry: false,
      search: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["GET_EMPLOYEES"]),
    async getData() {
      try {
        await this.GET_EMPLOYEES();
      } catch (error) {
        console.log(error);
      }
    },

    addNew() {
      this.$refs.entry.saveData();
    },
    closeentry() {
      this.dlgEntry = false;
      this.getData();
    },
    cancelwindow() {
      this.dlgEntry = false;
    },
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
    ...mapGetters(["GETEMPLOYEES"]),
    option: {
      get() {
        return this.GETEMPLOYEES.filter(
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
