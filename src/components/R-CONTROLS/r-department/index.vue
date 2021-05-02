<template>
	<q-select
		:dense="$q.screen.lt.md"
		v-model="vmodel"
		:label="label"
		:readonly="readonly"
		:options="departments"
		option-label="name"
		option-value="id"
		map-options
		emit-value
	/>
</template>
<script>
import Resource from "@/api/resource";
import { mapGetters } from "vuex";
import { date } from "quasar";
export default {
	props: {
		label: [String],
		value: {
			type: String,
			default: "",
		},
		readonly: { type: Boolean, default: false },
	},

	computed: {
		...mapGetters(["departments"]),
		vmodel: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit("input", value);
			},
		},
	},
	watch: {
		value() {
			if (this.departments.length > 0) {
				const datax = this.departments.filter(
					(v) => v.id.indexOf(this.value) > -1
				);
				this.$emit("selected", datax[0]);
			}
		},
	},
};
</script>