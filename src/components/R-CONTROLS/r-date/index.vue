<template>
	<div>
		<q-input
			v-model="vmodel"
			:readonly="readonly"
			:label="label"
			mask="date"
			:dense="$q.screen.lt.md"
		>
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy
						ref="qDateProxy"
						transition-show="scale"
						transition-hide="scale"
					>
						<q-date
							today-btn
							color="primary"
							minimal
							v-model="vmodel"
							@input="() => $refs.qDateProxy.hide()"
						/>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>
<script>
import { date } from "quasar";
export default {
	props: {
		label: [String, Number],
		value: {
			type: String,
			default: date.formatDate(new Date().toLocaleString(), "YYYY-MM-DD"),
		},
		hideValue: { type: Boolean, default: false },
		readonly: { type: Boolean, default: false },
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
		computedDatum: {
			get: function () {
				return this.formatteerDatum(this.vmodel);
			},
			set: function () {
				this.vmodel = null;
			},
		},
	},
	methods: {
		formatteerDatum(x) {
			return date.formatDate(x, "MM/DD/YYYY");
		},
	},
};
</script>