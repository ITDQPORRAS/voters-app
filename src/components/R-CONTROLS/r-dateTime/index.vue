<template>
	<div>
		<q-input
			v-model="vmodel"
			:readonly="readonly"
			:label="label"
			:dense="$q.screen.lt.md"
		>
			<template v-slot:prepend>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-date
							v-model="vmodel"
							today-btn
							minimal
							ref="qDateProxy"
							mask="YYYY/MM/DD HH:mm"
						>
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="Close" color="primary" flat />
							</div>
						</q-date>
					</q-popup-proxy>
				</q-icon>
			</template>

			<template v-slot:append>
				<q-icon name="access_time" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-time
							v-model="vmodel"
							today-btn
							minimal
							mask="YYYY/MM/DD HH:mm"
							format24h
						>
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="Close" color="primary" flat />
							</div>
						</q-time>
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
			default: date.formatDate(new Date().toLocaleString(), "YYYY-MM-DD HH:mm"),
		},
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
	},
};
</script>