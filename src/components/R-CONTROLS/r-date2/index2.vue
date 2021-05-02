<template>
	<q-input
		:v-model="computedDatum"
		:readonly="readOnly"
		@focus="verplaatsFocus"
		:label="label"
	>
		<template v-slot:append>
			<q-icon name="event" class="cursor-pointer">
				<q-popup-proxy
					ref="qDateProxy"
					@show="readOnly = true"
					@hide="readOnly = false"
				>
					<q-date
						v-model="displayValue"
						minimal
						@input="$refs.qDateProxy.hide()"
					/>
				</q-popup-proxy>
			</q-icon> </template
	></q-input>
</template>
<script>
import { date } from "quasar";
export default {
	props: { label: String },
	data: () => ({
		readOnly: false,
	}),
	computed: {
		computedDatum: {
			get: function () {
				return this.formatteerDatum(this.displayValue);
			},
			set: function () {
				this.displayValue = null;
			},
		},
		displayValue: {
			get: function () {
				return date.formatDate(this.value, "YYYY/MM/DD");
			},
			set: function (modifiedValue) {
				this.$emit("input", modifiedValue);
			},
		},
	},
	methods: {
		verplaatsFocus() {
			document.activeElement.blur();
			this.$refs.qDateProxy.show();
		},
		formatteerDatum(x) {
			return date.formatDate(x, "DD/MM/YYYY");
		},
	},
};
</script>