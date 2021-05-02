<template>
  <div>
    <q-btn color="grey-7" size="xs" round flat icon="more_vert">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item
            :disabled="disabledEdit"
            v-show="showEdit"
            clickable
            v-ripple
            v-close-popup
            @click="edit"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="edit" />
            </q-item-section>
            <q-item-section>Edit</q-item-section>
          </q-item>
          <q-item
            :disabled="disabledView"
            v-show="showView"
            clickable
            v-ripple
            v-close-popup
            @click="view"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="preview" />
            </q-item-section>
            <q-item-section>View</q-item-section>
          </q-item>
          <q-item
            :disabled="disabledDel"
            v-show="showCancel"
            clickable
            v-ripple
            v-close-popup
            @click="cancel"
          >
            <q-item-section avatar>
              <q-icon color="negative" name="close" />
            </q-item-section>
            <q-item-section>Delete</q-item-section>
          </q-item>
          <q-separator />
          <slot />
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
export default {
  props: {
    showEdit: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showView: { type: Boolean, default: false },
    disabledEdit: { type: Boolean, default: false },
    disabledDel: { type: Boolean, default: false },
    disabledView: { type: Boolean, default: false },
  },
  methods: {
    edit() {
      this.$emit("edit");
    },
    cancel() {
      this.$emit("cancel");
    },
    view() {
      this.$emit("view");
    },
  },
};
</script>
<style scoped>
.q-item {
  min-height: 28px;
  padding: 8px 16px;
  color: inherit;
  transition: color 0.3s, background-color 0.3s;
}
</style>