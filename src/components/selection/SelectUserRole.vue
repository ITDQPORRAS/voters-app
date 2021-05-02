<template>
  <div>
    <q-select
      v-model="optionModel"
      clearable
      :options="option"
      option-value="id"
      option-label="RoleName"
      :label="optionLabel"
      dense
      emit-value
      :readonly="readonly"
      :rules="rules"
      :disable="disable"
      map-options
      use-input
      input-debounce="0"
      @filter="filterQSelect"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section>
            <q-item-label v-html="scope.opt.RoleName"></q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon
              v-if="scope.opt.id != 1"
              name="edit"
              color="positive"
              @click="edit(scope)"
            />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:before-options v-if="canAddNew">
        <q-item clickable class="text-positive" @click="clickAddNew" v-ripple>
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

    <dlg :title="entryTitle" v-model="dlgEntry" @save="addNew">
      <div class="col-12 col-12-xs">
        <entry
          ref="entry"
          :entryData="editData"
          @editedValue="editedValue"
          @changeRoleStatus="changeRoleStatus"
          @close="closeentry"
          @cancelwindow="cancelwindow"
        />
      </div>
    </dlg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import dlg from "#/dlg";
import entry from "src/pages/setup/Role/entry";
export default {
  components: {
    dlg,
    entry
  },

  props: {
    selected: [String, Number],
    optionLabel: { type: String, default: "Role" },
    canAddNew: { type: Boolean, default: true },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    rules: Array
  },
  data() {
    return {
      entryTitle: "Add New Role",
      dlgEntry: false,
      editData: {
        id: 0,
        description: null,
        status: null
      },
      search: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["GET_USERS_ROLE"]),
    changeRoleStatus(value) {
      this.editData.status = value == true ? "Active" : "Deactivated";
    },
    editedValue(text) {
      this.editData.description = text;
    },
    async getData() {
      try {
        await this.GET_USERS_ROLE();
      } catch (error) {
        console.log(error);
      }
    },
    edit(scope) {
      this.editData = {
        id: 0,
        description: null,
        status: null
      };

      this.editData.id = scope.opt.id;
      this.editData.status = scope.opt.Status;
      this.editData.description = scope.opt.Description;
      this.entryTitle = "Edit Role";
      this.dlgEntry = true;
    },
    clickAddNew() {
      this.dlgEntry = true;
      this.entryTitle = "Add New Role";
      this.editData = {
        id: 0,
        description: null,
        status: "Active"
      };
    },
    addNew() {
      this.$refs.entry.saveData();
    },
    closeentry() {
      this.editData = {
        id: 0,
        description: null
      };
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
    ...mapGetters(["GETUSERROLE"]),
    option: {
      get() {
        return this.GETUSERROLE.filter(
          v => v.RoleName.toLowerCase().indexOf(this.search) > -1
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
