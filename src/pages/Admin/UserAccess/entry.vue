<template>
	<div class="q-pa-sm">
		<q-card>
			<toolbar title="User Profile Entry" @back="goHome"></toolbar>
			<div>
				<q-form ref="contentheader">
					<div class="row q-pa-sm">
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
						<div class="col-12 col-md-12">
							<q-select
								v-model="main.empid"
								:options="emp"
								option-value="id"
								option-label="FullName"
								stack-label
								label="Employee"
								emit-value
								map-options
							/>
						</div>
					</div>
				</q-form>
			</div>
			<q-separator />
			<div class="col-12 q-pa-sm">
				<command
					@save="saveValidation"
					@clear="clearall"
					:showCancel="false"
					:disable="disable"
					:labelSave="main.id > 0 ? 'Update' : 'Save'"
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
		emp: [],
		text: null,
		loading: false,
		valid: false,
		success: true,
		main: {
			userid: 0,
			name: null,
			created: null,
			email: null,
			empid: 0,
		},

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
				id: 0,
				name: null,
				created: null,
				email: null,
				empid: null,
			};
		});
		EventBus.$on("edit", (data) => {
			this.loading = false;
			this.main = {
				id: data["id"],
				name: data["name"],
				created: data["Created"],
				email: data["email"],
				empid: data["empid"],
			};
		});
		this.getEmployee();
	},
	methods: {
		goHome() {
			EventBus.$emit("list");
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
					const parameter = this.main;
					const datax = new Resource("User/updateUser");
					const { data } = await datax.store(parameter);
					this.$q.notify(data.Message);
					this.$emit("list");
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
		async getEmployee() {
			// const datax = new Resource("Employee/show");
			// const { data } = await datax.list();
			// this.emp = data;
		},
		clearall() {
			EventBus.$emit("add");
		},
	},
};
</script>
