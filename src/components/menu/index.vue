<template>
	<q-page-sticky position="bottom-right" :offset="fabPos">
		<!-- <q-btn fab icon="widgets" color="primary" @click="goHome" /> -->
		<q-fab
			v-model="menux"
			label="Actions"
			external-label
			label-class="bg-grey-3 text-purple"
			vertical-actions-align="left"
			color="primary"
			icon="widgets"
			direction="left"
			:loading="loading"
			v-touch-pan.prevent.mouse="moveFab"
			:disable="draggingFab"
		>
			<q-fab-action
				v-show="showAdd"
				label-class="bg-grey-3 text-grey-8"
				external-label
				color="primary"
				icon="add"
				label="New"
				label-position="top"
				@click="add"
			/>
			<q-fab-action
				v-show="showfilter"
				label-class="bg-grey-3 text-grey-8"
				external-label
				color="secondary"
				icon="filter_alt"
				label="Filter"
				label-position="top"
				@click="filter"
			/>
			<q-fab-action
				v-show="showPrint"
				label-class="bg-grey-3 text-grey-8"
				external-label
				color="orange"
				icon="print"
				label="Print"
				label-position="top"
				@click="print"
			/>
			<slot />
		</q-fab>
	</q-page-sticky>
</template>
<script>
export default {
	props: {
		showAdd: {
			type: Boolean,
			default: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		showfilter: {
			type: Boolean,
			default: false,
		},
		showPrint: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			menux: null,
			fabPos: [18, 18],
			draggingFab: false,
		};
	},
	methods: {
		moveFab(ev) {
			this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

			this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y];
		},
		add() {
			this.$emit("add");
		},
		filter() {
			this.$emit("filter");
		},
		print() {
			this.$emit("print");
		},
	},
};
</script>