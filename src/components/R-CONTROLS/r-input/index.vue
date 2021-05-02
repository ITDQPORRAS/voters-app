<template>
	<q-input
		:dense="dense ? true : $q.screen.lt.md"
		v-model="vmodel"
		:label="label"
		:readonly="readonly"
		:type="type"
		:autogrow="autogrow"
	/>
</template>
<script>
import { date } from "quasar";
export default {
	props: {
		label: [String],
		value: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "text",
		},
		readonly: { type: Boolean, default: false },
		autogrow: { type: Boolean, default: false },
		dense: { type: Boolean, default: false },
	},
	computed: {
		vmodel: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit("input", value);
			},
		},
	},
};
</script>