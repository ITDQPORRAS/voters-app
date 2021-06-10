<template>
  <div class="rows">
    <div class="col-12">
      <q-select
        v-model="form.group_id"
        :options="groupList"
        option-value="dtl_id"
        option-label="GROUP"
        stack-label
        emit-value
        map-options
        label="Group"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    datax: Object
  },
  data() {
    return {
      form: {
        group_id: "",
        voter_id: this.datax.voterid,
        leader: 1,
        leader_idx: "",
        _category_main: "",
        _category_sub: ""
      }
    };
  },
  mounted() {
    this.getgroup();
  },
  methods: {
    async getgroup() {
      await this.$store.dispatch("global/getGroup").then(() => {});
    }
  },
  watch: {
    "form.group_id"(val) {
      alert(val);
      let selec = this.groupList.find(x => {
        return x.main_id === val;
      });
      console.log(selec);
      this.form._category_sub = selec.dtl_id;
      this.form._category_main = selec.main_id;
    }
  },
  computed: {
    ...mapGetters(["groupList"])
  }
};
</script>

<style></style>
