<template>
	<div>
		<q-btn
			align="left"
			:color="color"
			size="xs"
			round
			:label="label"
			flat
			:icon="icon"
		>
			<q-menu>
				<q-list style="min-width: 150px">
					<q-item
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
						v-show="showCancel"
						clickable
						v-ripple
						v-close-popup
						@click="cancel"
					>
						<q-item-section avatar>
							<q-icon color="negative" name="close" />
						</q-item-section>
						<q-item-section>Cancel</q-item-section>
					</q-item>
					<q-item
						v-show="showPrint"
						clickable
						v-ripple
						v-close-popup
						@click="print"
					>
						<q-item-section avatar>
							<q-icon color="info" name="local_printshop" />
						</q-item-section>
						<q-item-section>Print</q-item-section>
					</q-item>
					<q-item
						v-show="showDetail"
						clickable
						v-ripple
						v-close-popup
						@click="details"
					>
						<q-item-section avatar>
							<q-icon color="green" name="grading" />
						</q-item-section>
						<q-item-section>Details</q-item-section>
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
		showDetail: { type: Boolean, default: false },
		showPrint: { type: Boolean, default: false },
		color: { type: String, default: "grey-7" },
		label: { type: String, default: null },
		icon: { type: String, default: "more_vert" },
	},
	methods: {
		edit() {
			this.$emit("edit");
		},
		cancel() {
			this.$emit("cancel");
		},
		print() {
			this.$emit("print");
		},
		details() {
			this.$emit("details");
		},
	},
};
</script>