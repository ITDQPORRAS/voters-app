<template>
	<q-select
		:dense="$q.screen.lt.md"
		v-model="vmodel"
		:label="label"
		:readonly="readonly"
		:options="options"
	/>
</template>
<script>
import { date } from "quasar";
export default {
	props: {
		label: {
			type: String,
			default: "Civil Status",
		},
		value: {
			type: String,
			default: "",
		},
		readonly: { type: Boolean, default: false },
	},
	data() {
		return {
			options: ["Single", "Married", "Widowed", "Separated"],
		};
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