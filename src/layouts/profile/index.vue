<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-tabs
					v-model="tab"
					dense
					align="justify"
					narrow-indicator
					inline-label
					class="bg-primary text-white shadow-2"
				>
					<q-tab name="barangay" icon="add" label="Add Member" />
					<q-tab name="list" icon="groups" label="Members" />
				</q-tabs>
				<q-separator />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="barangay">
						<entry @loaded="loadMember()" />
					</q-tab-panel>
					<q-tab-panel name="list">
						<q-table
							class="my-sticky-header-table"
							flat
							:title="BarangayName"
							bordered
							:loading="loading"
							:columns="headersList"
							:data="listMember"
							dense
							:filter="searchName"
							:rows-per-page-options="[20, 40]"
							row-key="idx"
						>
							<template v-slot:top-left>
								<div class="text-center">
									<q-input
										dense
										outlined
										v-model="datax.rep_address"
										:readonly="!read"
										label="Purok"
									>
										<template v-slot:append>
											<q-icon
												name="loop"
												@click="read = !read"
												class="cursor-pointer"
											/>
										</template>
									</q-input>
								</div>
							</template>
							<template v-slot:body="props">
								<q-tr :props="props">
									<q-td key="lastName" :props="props">
										{{ props.row.lastName }}
										<q-popup-edit
											v-model="props.row.lastName"
											title="last Name"
											buttons
										>
											<q-input
												v-model="props.row.lastName"
												dense
												autofocus
												counter
												buttons
											/>
										</q-popup-edit>
									</q-td>

									<q-td key="firstName" :props="props">
										{{ props.row.firstName }}
										<q-popup-edit
											v-model="props.row.firstName"
											title="First Name"
											buttons
										>
											<q-input v-model="props.row.firstName" dense autofocus />
										</q-popup-edit>
									</q-td>
									<q-td key="middleName" :props="props">
										{{ props.row.middleName }}
										<q-popup-edit
											v-model="props.row.middleName"
											title="Middle Name"
											buttons
										>
											<q-input v-model="props.row.middleName" dense autofocus />
										</q-popup-edit>
									</q-td>

									<q-td key="suffix" :props="props">
										{{ props.row.suffix }}
										<q-popup-edit
											v-model="props.row.suffix"
											title="Suffix"
											buttons
										>
											<q-input
												v-model="props.row.suffix"
												dense
												autofocus
												counter
												buttons
											/>
										</q-popup-edit>
									</q-td>
									<q-td key="birthdate" :props="props">
										{{ props.row.birthdate }}
										<q-popup-edit
											v-model="props.row.birthdate"
											title="Birthdate"
											buttons
										>
											<q-input
												v-model="props.row.birthdate"
												mask="date"
												dense
												autofocus
												counter
												buttons
											>
												<template v-slot:hint>YYYY/MM/DD</template>
												<template v-slot:append>
													<q-icon name="event" class="cursor-pointer">
														<q-popup-proxy
															ref="qDateProxy4"
															transition-show="scale"
															transition-hide="scale"
														>
															<q-date
																v-model="props.row.birthdate"
																@input="() => $refs.qDateProxy4.hide()"
															/>
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</q-popup-edit>
									</q-td>
									<q-td key="gender" :props="props">
										{{ props.row.gender }}
										<q-popup-edit
											v-model="props.row.gender"
											title="Gender"
											buttons
										>
											<q-select
												ref="relation"
												v-model="props.row.gender"
												:options="genderx"
												option-value="id"
												option-label="description"
												dense
												autofocus
											/>
										</q-popup-edit>
									</q-td>
									<q-td key="contact_number" :props="props">
										{{ props.row.contact_number }}
										<q-popup-edit v-model="props.row.contact_number" buttons>
											<q-input
												v-model="props.row.contact_number"
												dense
												autofocus
												counter
												title="Contact #"
												buttons
											/>
										</q-popup-edit>
									</q-td>
									<q-td key="member_type" :props="props">
										{{ props.row.member_type }}
										<q-popup-edit
											v-model="props.row.member_type"
											title="Relation"
											buttons
										>
											<q-select
												ref="relation"
												v-model="props.row.member_type"
												:options="relation"
												option-value="id"
												option-label="description"
												dense
												autofocus
											/>
										</q-popup-edit>
									</q-td>
									<q-td key="rep_address" :props="props">{{
										props.row.rep_address
									}}</q-td>
									<q-td key="remove" :props="props">
										<q-btn
											color="grey-7"
											@click="remove(props.row)"
											size="xs"
											round
											flat
											icon="close"
										></q-btn>
									</q-td>
								</q-tr>
							</template>
							<template v-slot:top-right>
								<q-input
									dense
									rounded
									debounce="500"
									style="width: 150px"
									v-model="searchName"
									placeholder="Search"
								>
									<template v-slot:append>
										<q-icon name="search" />
									</template>
								</q-input>
							</template>
						</q-table>
						<q-page-sticky position="bottom-right" :offset="[18, 18]">
							<q-btn
								v-show="showSave"
								:loading="loading"
								size="lg"
								round
								icon="save"
								@click="updateData"
								class="text-white"
								color="teal"
							></q-btn>
						</q-page-sticky>
					</q-tab-panel>
				</q-tab-panels>
			</q-card>
			<div
				style="position: absolute; visibility: hidden"
				class="qrcode"
				ref="qrCodeUrl"
			></div>
		</div>

		<dlg v-model="dlgfilter" :showCommand="false" title="Filter">
			<filterx @data="showListHouse" :showDate="false">
				<template v-slot>
					<q-select
						v-model="purokName"
						:options="purok"
						option-value="purok"
						option-label="purok"
						label="Purok"
						stack-label
					/>
				</template>
			</filterx>
		</dlg>
		<dlg
			v-model="dlgMember"
			:showCommand="false"
			:full="true"
			:title="MemberTitle"
		>
			<member :datax="datax" @loaded="showListHouse" />
		</dlg>
	</q-page>
</template>
<script>
import entry from "./entry";
import { exportFile } from "quasar";
import Resource from "src/api/resource";
import { mapGetters } from "vuex";
import { getInfo, setMember } from "src/utils/auth";
import filterx from "#/filter";
import dlg from "#/dlg";
import member from "./member";
import store from "src/store";
import { Cookies } from "quasar";
function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;
	formatted =
		formatted === void 0 || formatted === null ? "" : String(formatted);
	formatted = formatted.split('"').join('""');
	return `"${formatted}"`;
}
export default {
	components: {
		filterx,
		dlg,
		member,
		entry,
	},
	data() {
		return {
			read: false,
			showSave: false,
			form: {
				lastName: "",
				firstName: "",
				middleName: null,
				suffix: null,
				birthdate: "",
				gender: "",
				members_id: null,
				client_guid: null,
				member_type: null,
				contact_number: null,
			},
			reference: [],
			MemberTitle: null,
			datax: {
				rep_address: null,
			},
			purok: [],
			purokName: { id: "%", purok: "All" },
			dlgfilter: false,
			dlgMember: false,
			// locations: "http://localhost:8000/quasar/backends_qr/public/",
			locations: "http://18.221.253.87/HomeCardBackend/public/",
			showIndi: false,
			selected: [],
			brgy_id: 0,
			tab: "barangay",
			search: "",
			searchName: "",
			loading: false,
			BarangayName: null,
			listsName: [],
			listMember: [],
			genderx: ["Female", "Male"],
			headersList: [
				// {
				// 	name: "home",
				// 	label: "Default Card",
				// 	field: "home",
				// 	align: "left",
				// },
				{
					name: "lastName",
					label: "Last Name",
					field: "lastName",
					align: "left",
				},
				{
					name: "firstName",
					label: "First Name",
					field: "firstName",
					align: "left",
				},
				{
					name: "middleName",
					label: "Middle Name",
					field: "middleName",
					align: "left",
				},

				{
					name: "suffix",
					label: "Suffix",
					field: "suffix",
					align: "left",
				},
				{
					name: "birthdate",
					label: "Birth Date",
					field: "birthdate",
					align: "left",
					format: (val, row) => `${date.formatDate(val, "MM/DD/YYYY")}`,
				},
				{
					name: "gender",
					label: "Gender",
					field: "gender",
					align: "left",
				},
				{
					name: "contact_number",
					label: "Contact #",
					field: "contact_number",
					align: "left",
				},
				{
					name: "member_type",
					label: "Relation",
					field: "member_type",
					align: "left",
				},
				// {
				// 	name: "rep_address",
				// 	label: "Purok",
				// 	field: "rep_address",
				// 	align: "left",
				// },
				{
					name: "remove",
					label: "Remove",
					field: "remove",
					align: "left",
				},
			],
			relation: [],
		};
	},
	methods: {
		validations() {
			for (let index = 0; index < this.listMember.length; index++) {
				// const element = this.listMember[index].lastName;
				if (!this.listMember[index].lastName) {
					this.$q.notify({
						type: "negative",
						message: `Please input Last Name @row ` + (index + 1),
					});
					this.valid = false;
					return (this.valid = false);
				}
				if (!this.listMember[index].firstName) {
					this.$q.notify({
						type: "negative",
						message: `Please input first Name @row ` + (index + 1),
					});
					this.valid = false;
					return (this.valid = false);
				}
			}
			return (this.valid = true);
		},
		async updateData() {
			try {
				this.validations();

				if (this.valid) {
					this.loading = true;
					const datax = new Resource("Reader/UpdateMember");
					const { data } = await datax.store({
						data: this.listMember,
						main: this.datax,
					});

					this.$q.notify(JSON.stringify(data.Message));
					this.loading = false;
					this.loadMember(this.form.client_guid);
					this.$emit("loaded");
				}
			} catch (error) {
				this.loading = false;
			}
		},
		compare(arr1, arr2) {
			if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
				this.showSave = true;
			} else {
				this.showSave = false;
			}
		},
		async loadRelation() {
			const { data } = await new Resource("Reader/GetRelationship").list();
			this.relation = data.map((item) => Object.values(item)[1]);
		},
		async loadMember() {
			this.tab = "list";
			this.loading = true;
			const datax = new Resource("Reader/getMember");
			const { data } = await datax.get(getInfo()["details"][0]["client_guid"]);
			const d = data;

			this.listMember = d;
			Cookies.set("datax", d);
			this.listMemberOld = Cookies.get("datax");
			this.loading = false;
			new Resource("Reader/getMemberList")
				.get(getInfo()["details"][0]["client_guid"])
				.then(({ data }) => {
					setMember(data);
				});
		},
		async remove(item) {
			if (item.member_type !== "Puno ng Pamilya") {
				this.$q
					.dialog({
						title: "Confirm",
						message: "Would you like to cancel this record?",
						cancel: true,
						persistent: true,
					})
					.onOk(() => {
						this.removing(item.id);
					});
			} else {
				this.$q.notify("not allowed!");
			}
		},
		async removing(id) {
			this.loading = true;
			const { data } = await new Resource("Reader/removeMember").get(id);
			this.$q.notify(JSON.stringify(data.Message));
			this.loadMember();
			this.loading = false;
		},
		exportTable() {
			const content = [this.headers.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.barangay.map((row) =>
						this.headers
							.map((col) =>
								wrapCsvValue(
									typeof col.field === "function"
										? col.field(row)
										: row[col.field === void 0 ? col.name : col.field],
									col.format
								)
							)
							.join(",")
					)
				)
				.join("\r\n");

			const status = exportFile("Household.csv", content, "text/csv");

			if (status !== true) {
				this.$q.notify({
					message: "Browser denied file download...",
					color: "negative",
					icon: "warning",
				});
			}
		},
		exportTableLeader() {
			const content = [this.headersList.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.listsName.map((row) =>
						this.headersList
							.map((col) =>
								wrapCsvValue(
									typeof col.field === "function"
										? col.field(row)
										: row[col.field === void 0 ? col.name : col.field],
									col.format
								)
							)
							.join(",")
					)
				)
				.join("\r\n");

			const status = exportFile(
				this.purokName.purok + ".csv",
				content,
				"text/csv"
			);

			if (status !== true) {
				this.$q.notify({
					message: "Browser denied file download...",
					color: "negative",
					icon: "warning",
				});
			}
		},
		async refresh(done) {
			await store.dispatch("global/getData");
			done();
		},
		async print() {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/Print");
				const par = { main: null };
				const { data } = await dataR.get(this.brgy_id);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async addNew() {
			await this.getRef();
		},
		async getRef($id) {
			const datax = new Resource("Reader/getRef");
			const { data } = await datax.get(this.brgy_id);
			this.datax = data[0];
			this.datax.rep_id = 0;
			this.MemberTitle = `MEMBERS ` + this.datax.client_guid;
			this.dlgMember = true;
		},
		viewmember(item) {
			this.datax = item;
			this.MemberTitle = `MEMBERS ` + this.datax.client_guid;
			this.dlgMember = true;
		},
		printCard(item) {
			this.printSelected(item.client_guid);
		},
		getSelectedString() {
			if (this.selected.length > 0) {
				this.showIndi = true;
			} else {
				this.showIndi = false;
			}
		},

		onSelection({ rows, added, evt }) {
			if (rows.length === 0 || this.$refs.table === void 0) {
				return;
			}

			const row = rows[0];
			const filteredSortedRows = this.$refs.table.filteredSortedRows;
			const rowIndex = filteredSortedRows.indexOf(row);
			const lastIndex = this.lastIndex;

			this.lastIndex = rowIndex;
			document.getSelection().removeAllRanges();

			if (this.$q.platform.is.mobile === true) {
				evt = { ctrlKey: true };
			} else if (
				evt !== Object(evt) ||
				(evt.shiftKey !== true && evt.ctrlKey !== true)
			) {
				this.selected = added === true ? rows : [];

				return;
			}

			const operateSelection =
				added === true
					? (selRow) => {
							const selectedIndex = this.selected.indexOf(selRow);
							if (selectedIndex === -1) {
								this.selected = this.selected.concat(selRow);
							}
					  }
					: (selRow) => {
							const selectedIndex = this.selected.indexOf(selRow);
							if (selectedIndex > -1) {
								this.selected = this.selected
									.slice(0, selectedIndex)
									.concat(this.selected.slice(selectedIndex + 1));
							}
					  };
			if (lastIndex === null || evt.shiftKey !== true) {
				operateSelection(row);
				return;
			}
			const from = lastIndex < rowIndex ? lastIndex : rowIndex;
			const to = lastIndex < rowIndex ? rowIndex : lastIndex;
			for (let i = from; i <= to; i += 1) {
				operateSelection(filteredSortedRows[i]);
			}
		},
		sumField(key) {
			return this.barangay.reduce(
				(a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
				0
			);
		},
		async printSelected($id) {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/printSampleIndividual");
				const par = { main: null };
				const { data } = await dataR.get($id);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async printSelectedMultiple($id) {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/PrintMultiple");
				const datay = this.selected.map((item) => Object.values(item)[6]);
				const par = { main: datay };
				const { data } = await dataR.list(par);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async showName(item) {
			this.brgy_id = item.id;
			this.tab = "list";
			this.BarangayName = item.brgy_name;
			this.getPurok(item);
			await this.showListHouse(item);
		},
		async showListHouse(item) {
			this.dlgfilter = false;
			this.loading = true;
			const datax = new Resource("Reader/LeaderPerBarangay");
			const filter = { brgyid: this.brgy_id, prkid: this.purokName.id };
			const { data } = await datax.list(filter);
			this.listsName = data;
			this.loading = false;
		},
		async getPurok(item) {
			this.purok = [];
			const datax = new Resource("Reader/getPurok");
			const { data } = await datax.get(item.id);
			this.purok.push({ purok: "All", id: "%" });
			for (var i = 0; i < data.length; i++) {
				this.purok.push(data[i]);
			}
		},
		toObject(arr) {
			var rv = {};
			for (var i = 0; i < arr.length; ++i) this.purok.push(arr[i]);
			return rv;
		},
		onRowClick(evt, row) {
			// this.$emit("selected", row);
			this.showName(row);
		},
	},
	watch: {
		selected: function (val, old) {
			// if (val.length < 5) {
			if (val.length > 0) {
				this.showIndi = true;
			} else {
				this.showIndi = false;
			}
			// } else {
			//   this.selected = old;
			//   this.$q.notify("Only 4 peson selected!");
			// }
		},
	},
	mounted() {
		// console.log(getInfo());
		this.datax.rep_address = getInfo()["details"][0]["rep_address"];
		this.loadMember();
		this.loadRelation();
	},
	computed: {
		...mapGetters(["barangay"]),
	},
	watch: {
		"datax.rep_address": function name() {
			this.showSave = true;
		},
		gender: function (val) {
			this.form.gender = val;
		},
		"form.birthdate": function (val) {
			this.form.birthdate = this.$moment(val.toLocaleString()).format(
				"YYYY-MM-DD"
			);
		},
		"form.birthdate": function (val) {
			this.form.birthdate = this.$moment(val.toLocaleString()).format(
				"YYYY-MM-DD"
			);
		},
		listMember: {
			deep: true,
			handler(newData, oldData) {
				this.compare(newData, this.listMemberOld);
			},
		},
	},
};
</script>
<style lang="stylus" scoped>
.q-tab-panel {
	padding: 0px;
}

.q-card__section--vert {
	padding: 2px;
}
</style>