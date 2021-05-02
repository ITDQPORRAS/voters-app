<template>
	<div class="q-pa-sm">
		<q-card>
			<toolbar title="User Profile Entry" @back="goHome"></toolbar>
			<div>
				<q-form ref="contentheader">
					<div class="row">
						<div class="col-6 col-md-6 q-pt-sm">
							<q-input
								ref="Name"
								v-model="main.name"
								dense
								label="Name"
								:readonly="readonly"
								lazy-rules
								:rules="[(val) => (val !== null && val !== '') || 'Required']"
							/>
						</div>
						<div class="col-6 col-md-6 q-pt-sm">
							<q-input
								v-model="main.created"
								readonly
								dense
								label="Created Date"
							/>
						</div>
						<div class="col-12 col-md-12 q-pt-sm">
							<q-input
								ref="Email"
								label="Email"
								v-model="main.email"
								dense
								:readonly="readonly"
								lazy-rules
								:rules="[(val) => (val !== null && val !== '') || 'Required']"
							/>
						</div>
					</div>
				</q-form>
				<template bordered>
					<q-form ref="content">
						<div class="row">
							<div class="col-12 col-md-12">
								<br />
								<b>Permissions</b>
							</div>
							<div class="col-12 col-md-12 q-pb-sm q-pt-sm">
								<q-table
									flat
									bordered
									:loading="loading"
									:columns="headers"
									:data="list"
									:dense="$q.screen.lt.md"
									:pagination.sync="pagination"
									:table-style="pointer_style"
								>
									<template v-slot:header-cell-Read="props">
										<q-th :props="props">
											<q-checkbox
												bottom-label
												label="Read"
												size="xs"
												dense
												v-model="chkallRead"
											/>
										</q-th>
									</template>
									<template v-slot:header-cell-Write="props">
										<q-th :props="props">
											<q-checkbox
												bottom-label
												label="Edit"
												size="xs"
												dense
												v-model="chkallWrite"
											/>
										</q-th>
									</template>
									<template v-slot:header-cell-Create="props">
										<q-th :props="props">
											<q-checkbox
												bottom-label
												label="Create"
												size="xs"
												dense
												v-model="chkallCreate"
											/>
										</q-th>
									</template>
									<template v-slot:header-cell-Delete="props">
										<q-th :props="props">
											<q-checkbox
												bottom-label
												label="Delete"
												size="xs"
												dense
												v-model="chkallDelete"
											/>
										</q-th>
									</template>
									<template v-slot:body-cell-Read="props">
										<q-td :props="props">
											<q-checkbox
												size="xs"
												true-value="1"
												false-value="0"
												dense
												v-model="props.row.Read"
											/>
										</q-td>
									</template>
									<template v-slot:body-cell-Write="props">
										<q-td :props="props">
											<q-checkbox
												size="xs"
												true-value="1"
												false-value="0"
												dense
												v-model="props.row.Write"
											/>
										</q-td>
									</template>
									<template v-slot:body-cell-Create="props">
										<q-td :props="props">
											<q-checkbox
												size="xs"
												true-value="1"
												false-value="0"
												dense
												v-model="props.row.Create"
											/>
										</q-td>
									</template>
									<template v-slot:body-cell-Delete="props">
										<q-td :props="props">
											<q-checkbox
												size="xs"
												true-value="1"
												false-value="0"
												dense
												v-model="props.row.Delete"
											/>
										</q-td>
									</template>
								</q-table>
							</div>
						</div>
					</q-form>
				</template>
			</div>
			<q-separator />
			<div class="col-12 q-pa-sm">
				<command
					@save="saveValidation"
					@clear="clearall"
					:disable="disable"
					:labelSave="main.userid > 0 ? 'Update' : 'Save'"
				/>
			</div>
		</q-card>
	</div>
</template>
<script>
import EventBus from "./events";
import toolbar from "#/Toolbar";
import command from "#/Command";
import Resource from "src/api/resource";
import { date } from "quasar";
import { errorMonitor } from "events";
export default {
	name: "entry",
	components: { toolbar, command },
	data: () => ({
		readonly: true,
		disable: false,
		pointer_style: { "pointer-events": "all" },
		chkallRead: false,
		chkallWrite: false,
		chkallCreate: false,
		chkallDelete: false,

		text: null,
		loading: false,
		valid: false,
		success: true,
		main: {
			userid: 0,
			name: null,
			created: null,
			email: null,
		},
		headers: [
			{ name: "Module", label: "Module", field: "module", align: "left" },
			{ name: "Read", label: "Read", field: "Read", align: "center" },
			{ name: "Create", label: "Create", field: "Create", align: "center" },
			{ name: "Write", label: "Edit", field: "Write", align: "center" },
			{ name: "Delete", label: "Delete", field: "Delete", align: "center" },
		],
		pagination: {
			page: 1,
			rowsPerPage: 0, // 0 means all rows
		},
		list: [],
	}),
	mounted() {
		EventBus.$on("add", () => {
			this.loading = false;
			this.main = {
				userid: 0,
				name: null,
				created: null,
				email: null,
			};
			this.getUserRoles(0);
		});
		EventBus.$on("edit", (data) => {
			this.loading = false;
			this.main = {
				userid: data["id"],
				name: data["name"],
				created: data["Created"],
				email: data["email"],
			};
			this.getUserRoles(data["id"]);
		});
	},
	methods: {
		goHome() {
			EventBus.$emit("list");
		},
		async getUserRoles(id) {
			const { data } = await new Resource("UserSettings/GetUserRole").list({
				id: id,
			});
			this.list = data;
		},
		saveValidation() {
			this.$refs.contentheader.validate().then((valid) => {
				if (valid === true) {
					this.saveData();
				}
			});
		},
		async saveData() {
			try {
				this.$q.loading.show();
				if (this.success) {
					this.loading = true;
					const par = { main: this.main, roles: this.list };
					const datax = new Resource("UserSettings/StoreUserRole");
					const { data } = await datax.store(par);
					this.$q.notify(data.Message);
					this.$q.loading.hide();
					this.loading = false;
				} else {
					this.$q.loading.hide();
					this.loading = false;
				}
			} catch (error) {
				this.$q.notify(error);
				this.$q.loading.hide();
				this.loading = false;
			}
		},
		clearall() {
			EventBus.$emit("add");
		},
	},
	watch: {
		chkallRead: function (val) {
			if (val === true) {
				this.list.forEach((element) => {
					element.Read = "1";
				});
			} else {
				this.list.forEach((element) => {
					element.Read = "0";
				});
			}
		},
		chkallWrite: function (val) {
			if (val === true) {
				this.list.forEach((element) => {
					element.Write = "1";
				});
			} else {
				this.list.forEach((element) => {
					element.Write = "0";
				});
			}
		},
		chkallCreate: function (val) {
			if (val === true) {
				this.list.forEach((element) => {
					element.Create = "1";
				});
			} else {
				this.list.forEach((element) => {
					element.Create = "0";
				});
			}
		},
		chkallDelete: function (val) {
			if (val === true) {
				this.list.forEach((element) => {
					element.Delete = "1";
				});
			} else {
				this.list.forEach((element) => {
					element.Delete = "0";
				});
			}
		},
	},
};
</script>

