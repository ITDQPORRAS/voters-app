<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-11">
            <q-select
              v-model="optionModel"
              clearable
              :options="option"
              option-value="id"
              option-label="fullname"
              :label="optionLabel"
              dense
              emit-value
              :readonly="readonly"
              map-options
              use-input
              input-debounce="0"
              @filter="filterQSelect"
              :rules="[
                val => (val !== null && val !== '' && val !== 0) || 'Required.'
              ]"
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
            </q-select>
          </div>
          <div class="col-1">
            <q-btn
              class="text-capitalize"
              color="primary"
              icon="search"
              dense
              flat
              round
              @click="showCustomerFinder = true"
              style="border:1px solid #ccc"
            />
          </div>
        </div>
      </div>
    </div>
    <FindCustomer
      @found="selectFoundCustomer"
      @back="showCustomerFinder = false"
      :full="true"
      :showCustomerFinder="showCustomerFinder"
    />
    <dlg
      :showCommand="false"
      title="Add New Customer"
      v-model="dlgEntry"
      @save="addNew"
    >
      <div class="col-12 col-12-xs">
        <entry ref="entry" @close="closeentry" @cancelwindow="cancelwindow" />
      </div>
    </dlg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dlg from "#/dlg";
import entry from "src/pages/setup/Customer/entry";
import FindCustomer from "src/components/Find/FindCustomer";

export default {
  components: {
    dlg,
    entry,
    FindCustomer
  },

  props: {
    optionLabel: { type: String, default: "Customer" },
    selected: [String, Number],
    readonly: { type: Boolean, default: false }
  },
  data() {
    return {
      dlgEntry: false,
      showCustomerFinder: false,
      search: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["GET_CUSTOMERS"]),
    selectFoundCustomer(v) {
      this.showCustomerFinder = false;
      this.optionModel = v;
    },
    async getData() {
      try {
        await this.GET_CUSTOMERS();
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
    ...mapGetters(["GETCUSTOMERS"]),
    option: {
      get() {
        return this.GETCUSTOMERS.filter(
          v => v.fullname.toLowerCase().indexOf(this.search) > -1
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
