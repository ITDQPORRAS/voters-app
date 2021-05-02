<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card flat>
				<q-pull-to-refresh @refresh="refresh">
					<q-table
						class="my-sticky-header-table"
						flat
						title="Receiving List"
						bordered
						:loading="loading"
						:columns="headers"
						:data="lists"
						dense
						:filter="search"
						row-key="id"
						:rows-per-page-options="[10, 20, 30]"
					>
						<template v-slot:top-right>
							<q-input
								dense
								rounded
								debounce="500"
								style="width: 150px"
								v-model="search"
								placeholder="Search"
							>
								<template v-slot:append>
									<q-icon name="search" />
								</template>
							</q-input>
						</template>
						<template v-slot:body-cell-reference="props">
							<q-td :props="props">
								<div>
									<q-badge
										:color="
											props.row.status === 'Approved'
												? 'green'
												: props.row.status === 'Cancelled'
												? 'red'
												: 'orange'
										"
										:label="props.value"
									/>
								</div>
								<div class="my-table-details">{{ props.row.date }}</div>
							</q-td>
						</template>
						<template v-slot:body-cell-Docs="props">
							<q-td :props="props">
								<div class="my-table-details">
									DR # : {{ props.row.DR_Number }}
								</div>
								<div class="my-table-details">
									INV # : {{ props.row.INV_Number }}
								</div>
							</q-td>
						</template>

						<template v-slot:body-cell-actions="props">
							<q-td :props="props">
								<info
									@edit="edit(props.row)"
									@cancel="onCancel(props.row)"
									:showDetail="true"
									@details="details(props.row)"
								></info>
							</q-td>
						</template>
					</q-table>
				</q-pull-to-refresh>
			</q-card>
		</div>

		<xmenu showfilter @add="Add" @filter="dlgfilter = true" />
		<q-dlg v-model="dlgfilter" :showCommand="false" title="Filter">
			<template v-slot>
				<filterx @data="filtered" />
			</template>
		</q-dlg>
		<dlg v-model="dlgDetails" :showCommand="false" :title="dtltitle">
			<Details
				:items="dtlItem"
				:headers="dtlHeader"
				@closed="dlgDetails = false"
			/>
		</dlg>
	</q-page>
</template>

<script>
import { mapActions } from "vuex";
import Resource from "src/api/resource";
import EventBus from "./events";
import xmenu from "#/menu";
import info from "#/information";
import Details from "@/components/Details";
import dlg from "#/dlg";
import filterx from "#/filter";
import { date } from "quasar";

export default {
	components: { info, filterx, dlg, Details, xmenu },
	data() {
		return {
			dlgDetails: false,
			pagination: {
				rowsPerPage: 10, // current rows per page being displayed
			},
			options: true,
			dlgfilter: false,
			mobile: this.$q.platform.is.mobile,
			dlgEntry: false,
			fab2: null,
			filter: {
				from: date.formatDate(new Date(), "YYYY-MM-01"),
				to: date.formatDate(new Date(), "YYYY-MM-DD"),
			},
			search: "",
			lists: [],
			loading: false,
			headers: [
				{
					name: "reference",
					label: "Reference",
					field: "reference",
					align: "left",
					sortable: true,
					required: true,
				},
				{
					name: "supplier",
					label: "Supplier",
					field: "supplier",
					align: "left",
					sortable: true,
				},
				{
					name: "description",
					label: "Warehouse",
					field: "description",
					align: "left",
					sortable: true,
				},
				{
					name: "Docs",
					label: "Docs",
					field: "DR_Number",
					align: "left",
					sortable: true,
				},
				{
					name: "Status",
					label: "Status",
					field: "status",
					align: "left",
					sortable: true,
				},
				{
					name: "actions",
					label: "Action",
					field: "actions",
				},
			],
			dtlHeader: [
				{
					name: "description",
					label: "Description",
					field: "description",
					align: "left",
					sortable: true,
				},
				{
					name: "item_qty",
					label: "Qty",
					field: "item_qty",
					sortable: true,
				},
				{
					name: "price",
					label: "Price",
					field: "price",
					format: (val, row) =>
						`${(val * 1)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
					sortable: true,
				},
				{
					name: "Total",
					label: "Total",
					field: "Total",
					format: (val, row) =>
						`${(val * 1)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
					sortable: true,
				},
			],
			dtlItem: [],
			dtltitle: "Title",
			idx: 0,
		};
	},
	mounted() {
		this.getList();
		this.loadData();
		EventBus.$on("refresh", (data) => {
			this.getList();
		});
	},
	methods: {
		...mapActions(["getProductInfo", "GET_SUPPLIERS", "GET_STORAGES"]),
		async loadData() {
			await this.getProductInfo();
			await this.GET_SUPPLIERS();
			await this.GET_STORAGES();
		},

		closeMsgDialog(val) {
			this.popUpDialog = false;
		},
		getColor(stat) {
			if (stat == "Active") {
				return "black";
			}
			if (stat == "Cancelled") {
				return "red";
			}
		},
		filtered(par) {
			this.filter.from = par.from;
			this.filter.to = par.to;
			this.getList();
		},
		async details(item) {
			try {
				this.loading = true;
				const datax = new Resource("Receiving/details");
				const { data } = await datax.get(item.id);
				this.dtlItem = data;
				this.dtltitle = item.reference;
				this.dlgDetails = true;
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		Add() {
			EventBus.$emit("entry");
			EventBus.$emit("add");
		},
		refresh(done) {
			try {
				this.getList();
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async getList() {
			try {
				this.$q.loading.show();
				this.dlgfilter = false;
				const datax = new Resource("Receiving/show");
				await datax
					.list(this.filter)
					.then(async ({ data }) => {
						this.lists = data;
						this.$q.loading.hide();
					})
					.catch((er) => {
						this.$q.loading.hide();
						console.log(er);
					});
			} catch (error) {
				this.$q.loading.hide();
				console.log(error);
			}
		},
		async edit(item) {
			if (this.hasPermission(this.permissionCode.modify)) {
				if (item.status == "For Approval") {
					this.loading = true;
					const res = new Resource("Receiving/edit");
					await res
						.get(item.id)
						.then(async ({ data }) => {
							this.loading = false;
							if (data.status !== "For Approval") {
								this.$q.notify("Transaction was already " + data.status);
							} else {
								await this.$router.push("Receivingentry");
								EventBus.$emit("edit", data);
							}
						})
						.catch((er) => {
							this.loading = false;
						});
				} else {
					this.$q.notify("Cannot modify " + item.status + " transaction.");
					return;
				}
			} else {
				this.popUpDialog = true;
			}
		},
		async showConfirmed(item) {
			this.idx = item.id;
			this.$refs.command.onShow(3);
		},
		onCancel(item) {
			if (this.hasPermission(this.permissionCode.cancel)) {
				if (item.status == "For Approval") {
					this.$q
						.dialog({
							title: "Confirm",
							message: "Are you sure you want to cancel this transaction?",
							cancel: true,
							persistent: true,
						})
						.onOk(() => {
							this.cancel(item);
						});
				} else {
					this.$q.notify(
						"Transaction was already " + item.status + ", cannot continue."
					);
				}
			} else {
				this.popUpDialog = true;
			}
		},
		async cancel(item) {
			if (item.status == "Cancelled") {
				this.$q.notify("Transaction was already cancelled");
				return;
			}
			this.loading = true;
			const res = new Resource("Receiving/cancel");
			await res.get(item.id).then(({ data }) => {
				this.$q.notify(data.Message);
				item.status = "Cancelled";
				this.loading = false;
			});
		},
	},
};
</script>
<style>
.my-table-details {
	font-size: 0.85em;
	font-style: italic;
	max-width: 200px;
	white-space: normal;
	color: #555;
	margin-top: 4px;
}
</style>
