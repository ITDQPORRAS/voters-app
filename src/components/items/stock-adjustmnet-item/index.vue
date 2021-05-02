<template>
  <div id="tabs">
    <keep-alive>
      <component :is="component" :item="item" />
    </keep-alive>
  </div>
</template>
<script>
import EventBus from "./_event";
import tabList from "./list";
import entry from "./items";
export default {
  components: {
    tabList,
    entry
  },
  data() {
    return {
      activetab: 1,
      loading: true,
      listData: [],
      component: "tabList",
      item: null
    };
  },
  mounted() {
    EventBus.$on("selected", data => {
      this.item = data;
      this.component = "entry";
    });
    EventBus.$on("list", data => {
      this.component = "tabList";
    });
    EventBus.$on("send", data => {
      this.component = "tabList";
      this.$emit("send", data);
    });
    EventBus.$on("closed", data => {
      this.$emit("closed", data);
    });
  },
  methods: {
    process(item) {
      this.activetab = 2;
    }
  }
};
</script>
<style scoped>
.tab-container {
  margin: 10px;
}
</style>
