<template>
	<div class="q-pa-sm">
		<q-table title="Grouping" :data="data" :columns="columns" row-key="name">
			<template v-slot:body-cell-description="props">
				<q-td>
					<q-btn
						:style="{ color: props.row._color }"
						flat
						:label="props.value"
						@click="onClick"
					/>
					<!-- <div>
						<q-badge color="#c72626">
							{{ props.value }}
						</q-badge>
					</div> -->
				</q-td>
			</template>

			<template v-slot:body-cell-actions="props">
				<q-td :props="props">
					<q-info @edit="edit(props.row)" :showEdit="true" :showCancel="false">
					</q-info>
				</q-td>
			</template>
		</q-table>
		<q-menus @add="onAdd" :showfilter="false" @filter="dlgfilter = true">
		</q-menus>
		<q-dlg v-model="dlgAdd" title="Groupings" @save="onSave">
			<entry ref="entry" />
		</q-dlg>
	</div>
</template>
<script>
import entry from "./entry";
import Resource from "src/api/resource";
export default {
	components: { entry },
	data() {
		return {
			dlgAdd: false,
			data: [],
			columns: [
				{
					name: "description",
					label: "Name",
					field: "description",
					align: "left",
				},
				{ label: "Type", field: "_group", align: "left" },

				{ name: "actions", label: "Actions", field: "actions" },
			],
		};
	},
	methods: {
		onAdd() {
			this.dlgAdd = true;
		},
		onSave() {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Would you like to save this data",
					cancel: true,
					persistent: true,
				})
				.onOk(async () => {
					await new Resource("Group/store").store(this.$refs.entry.form);
					// console.log(this.$refs.entry.form);
				});
		},
		async list() {
			await new Resource("Group/show").list().then(({ data }) => {
				this.data = data;
			});
		},
	},
	created() {
		this.list();
	},
};
</script>
<style scoped>
</style>