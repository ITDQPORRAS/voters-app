<template>
  <div id="tabs">
    <keep-alive>
      <component
        :is="component"
        :id="id"
        :show-paid="showPaid"
        :name="name"
        :price="price"
        :po_price="po_price"
        :container_id="container_id"
        :compute-paid="computePaid"
      />
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
  props: {
    showPaid: { type: Boolean, default: false },
    computePaid: { type: Boolean, default: false }
  },
  data() {
    return {
      activetab: 1,
      loading: true,
      listData: [],
      component: "tabList",
      id: null,
      name: null,
      po_price: null,
      price: null,
      container_id: 0
    };
  },
  mounted() {
    EventBus.$on("selected", data => {
      console.log(data);
      this.id = data.id;
      this.name = data.description;
      this.po_price = data.po_price;
      this.price = data.sellingPrice;
      this.container_id = data.container_id;
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
