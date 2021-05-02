<template>
	<div class="q-pa-md q-col-gutter-sm">
		<div class="row">
			<div class="col self-start"></div>
			<div class="col self-center text-center">
				<q-color v-model="modelHex" class="my-picker" />
			</div>
			<div class="col self-end"></div>
		</div>
		<div class="row">
			<div class="col self-start"></div>
			<div class="col self-center text-center">
				<q-btn
					color="primary"
					class="my-picker"
					icon="check"
					label="Set"
					@click="onClick"
					style="width: 100px"
				/>
			</div>
			<div class="col self-end"></div>
		</div>
	</div>
</template>
<script>
import { colors } from "quasar";

export default {
	data() {
		return {
			modelHex: this.$q.localStorage.getItem("themes") || "rgb(204,27,50)",
		};
	},
	methods: {
		onClick() {
			this.$q.localStorage.set("themes", this.modelHex);
			this.$q.notify("Successfully set!");
		},
	},
	watch: {
		modelHex: {
			handler(val, oldVal) {
				colors.setBrand("primary", val);
			},
			immediate: true,
		},
	},
};
</script>
<style lang="sass" scoped>
.my-picker
	max-width: 250px
</style>
