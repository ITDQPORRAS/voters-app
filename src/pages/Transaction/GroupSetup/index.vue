<template>
	<div class="q-pa-sm">
		<q-table title="Grouping" :data="data" :columns="columns" row-key="name" />
		<q-menus @add="onAdd" :showfilter="false" @filter="dlgfilter = true">
		</q-menus>
		<q-dlg v-model="dlgAdd" title="Groupings">
			<entry />
		</q-dlg>
	</div>
</template>
<script>
import entry from "./entry";
export default {
	components: { entry },
	data() {
		return {
			dlgAdd: false,
			data: [],
			columns: [
				{ label: "Name", field: "description", align: "left" },
				{ label: "Type", field: "_group", align: "left" },
				{ label: "Color", field: "_color", align: "left" },
				{ label: "Actions", field: "actions" },
			],
		};
	},
	methods: {
		onAdd() {
			this.dlgAdd = true;
		},
	},
	created() {},
};
</script>
<style scoped>
</style>