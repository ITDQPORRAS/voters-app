<template>
	<q-select
		:dense="$q.screen.lt.md"
		v-model="vmodel"
		:label="label"
		:readonly="readonly"
		:options="barangay"
		option-label="Brgy Name"
		option-value="ID"
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
	data() {
		return {
			options: ["Male", "Female"],
		};
	},

	computed: {
		...mapGetters(["barangay"]),
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
			if (this.barangay.length > 0) {
				const datax = this.barangay.filter(
					(v) => v.ID.indexOf(this.value) > -1
				);
				this.$emit("selected", datax[0]);
			}
		},
	},
};
</script>