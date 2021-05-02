<template>
	<div>
		<q-tabs
			v-model="tab"
			dense
			class="text-grey"
			active-color="primary"
			indicator-color="primary"
			align="justify"
			narrow-indicator
		>
			<q-tab name="add" label="Add" />
			<q-tab name="list" label="List" />
		</q-tabs>
		<q-separator />
		<q-tab-panels v-model="tab" animated>
			<q-tab-panel name="add">
				<div class="row">
					<div class="col-12 col-md-3">
						<q-input
							dense
							stack-label
							ref="lastName"
							color="primary"
							v-model="form.lastName"
							label="Last Name"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please Type Last Name',
							]"
						></q-input>
					</div>

					<div class="col-12 col-md-3">
						<q-input
							dense
							stack-label
							ref="firstName"
							color="primary"
							v-model="form.firstName"
							label="First Name"
							lazy-rules
							:rules="[
								(val) => (val && val.length > 0) || 'Please Type First Name',
							]"
						></q-input>
					</div>
					<div class="col-12 col-md-3">
						<q-input
							dense
							stack-label
							ref="middleName"
							color="primary"
							v-model="form.middleName"
							label="Middle Name"
						></q-input>
					</div>

					<div class="col-12 col-md-3">
						<q-input
							dense
							stack-label
							color="primary"
							v-model="form.suffix"
							label="Extension"
						></q-input>
					</div>
					<div class="col-6 col-md-3">
						<q-input
							v-model="form.birthdate"
							mask="date"
							label="Birth Date"
							stack-label
							dense
						>
							<template v-slot:hint>YYYY/MM/DD</template>
							<template v-slot:append>
								<q-icon name="event" class="cursor-pointer">
									<q-popup-proxy
										ref="qDateProxy"
										transition-show="scale"
										transition-hide="scale"
									>
										<q-date
											v-model="form.birthdate"
											@input="() => $refs.qDateProxy.hide()"
										/>
									</q-popup-proxy>
								</q-icon>
							</template>
						</q-input>
					</div>
					<div class="col-6 col-md-3">
						<q-select
							dense
							v-model="gender"
							:options="genderx"
							option-value="Gender"
							option-label="Gender"
							label="Gender"
							stack-label
							lazy-rules
							:rules="[
								(val) =>
									(val !== null && val !== '') || 'Please select a gender',
							]"
						/>
					</div>
					<div class="col-6 col-md-3">
						<q-input
							dense
							:readonly="datax.rep_id === 0 ? false : true"
							:rules="[
								(val) => (val !== null && val !== '') || 'Please input purok',
							]"
							stack-label
							ref="purok"
							v-model="datax.rep_address"
							color="primary"
							label="Purok"
						></q-input>
					</div>
					<div class="col-6 col-md-3">
						<q-input
							readonly
							dense
							stack-label
							ref="Barangay"
							v-model="datax.brgy_name"
							color="primary"
							label="Barangay"
						></q-input>
					</div>
					<div class="col-6 col-md-6">
						<q-select
							ref="relation"
							dense
							v-model="form.member_type"
							:options="relation"
							option-value="id"
							option-label="description"
							label="Relationship"
							stack-label
							lazy-rules
							:rules="[
								(val) =>
									(val !== null && val !== '') ||
									'Please select a relationship',
							]"
						/>
					</div>
					<div class="col-6 col-md-6">
						<q-input
							dense
							stack-label
							ref="contact_number"
							color="primary"
							v-model="form.contact_number"
							label="Contact #"
						></q-input>
					</div>
					<div class="col-12 col-md-12 text-right">
						<q-btn
							@click="save"
							:loading="loading"
							outline
							color="primary"
							label="Save"
						/>
					</div>
				</div>
			</q-tab-panel>
			<q-tab-panel name="list">
				<div>
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
					<q-table
						class="my-sticky-header-table"
						flat
						bordered
						:loading="loading"
						:columns="headers"
						:data="listMember"
						dense
						:rows-per-page-options="[40, 80]"
						row-key="id"
						binary-state-sort
						hide-top
					>
						<template v-slot:body-cell-remove="props">
							<q-td :props="props">
								<div class="col-auto">
									<q-btn color="grey-7" size="xs" round flat icon="more_vert">
										<q-menu cover auto-close>
											<q-list>
												<q-item clickable>
													<q-item-section @click="printCard(props.row)"
														>Print Card</q-item-section
													>
												</q-item>
												<q-item clickable>
													<q-item-section @click="viewmember(props.row)"
														>View Member</q-item-section
													>
												</q-item>
											</q-list>
										</q-menu>
									</q-btn>
								</div>
							</q-td>
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
										<!-- <q-input
                      v-model="props.row.birthdate"
                      dense
                      autofocus
                      counter
                      title="Birthdate"
                      buttons
                    />-->
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
				</div>
			</q-tab-panel>
		</q-tab-panels>
	</div>
</template>
<script>
import { Cookies } from "quasar";
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import { date } from "quasar";
import numeral from "numeral";
export default {
	name: "Member",
	props: {
		datax: Object,
	},
	data() {
		return {
			read: false,
			purok: null,
			gender: null,
			vrelation: null,
			rep_address: null,
			tab: "list",
			card: true,
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
			loading: false,
			valid: false,
			genderx: ["Female", "Male"],
			headers: [
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
				{
					name: "rep_address",
					label: "Purok",
					field: "rep_address",
					align: "left",
				},
				{
					name: "remove",
					label: "Remove",
					field: "remove",
					align: "left",
				},
			],
			listMember: [],
			listMemberOld: [],
			relation: [],
			showSave: false,
		};
	},
	mounted() {
		if (this.datax.rep_id === 0) {
			this.datax.rep_address = "";
			this.form.member_type = "Puno ng Pamilya";
			this.purok = this.datax.rep_address;
		}
		this.loadRelation();
		this.form.client_guid = this.datax.client_guid;
		this.form.members_id = this.datax.client_guid;
		this.loadMember(this.form.client_guid);
	},
	methods: {
		async validate() {
			this.$refs.firstName.validate();
			this.$refs.lastName.validate();
			this.$refs.relation.validate();
			this.$refs.purok.validate();
		},
		async save() {
			try {
				await this.validate();
				if (
					this.$refs.lastName.hasError ||
					this.$refs.firstName.hasError ||
					this.$refs.relation.hasError ||
					this.$refs.purok.hasError
				) {
					this.formHasError = true;
				} else {
					this.loading = true;
					if (await this.checkingname()) {
						this.loading = false;
					} else {
						this.loading = false;
						this.finalSave();
					}
				}
			} catch (error) {
				this.$q.notify(JSON.stringify(error));
				this.loading = false;
			}
		},
		async finalSave() {
			if (this.valid) {
				this.loading = true;
				if (this.datax.rep_id === 0) {
					await this.getRef();
				}
				const datax = new Resource("Reader/saveMember");
				const { data } = await datax.store({
					data: this.form,
					main: this.datax,
				});
				if (this.datax.rep_id === 0) {
					await this.checkID();
				}
				this.$socket.client.emit("encodeMembers");
				this.$q.notify(JSON.stringify(data.Message));
				this.loading = false;
				this.clear();

				this.tab = "list";
				this.loadMember(this.form.client_guid);
				this.$emit("loaded");
			}
		},
		clear() {
			this.form.lastName = "";
			this.form.middleName = "";
			this.form.birthdate = "";
			this.form.firstName = "";
			this.form.member_type = "";
			this.form.gender = "";
			this.form.contact_number = "";
			this.form.suffix = "";
			this.gender = [];
		},
		async loadMember($id) {
			this.loading = true;
			const datax = new Resource("Reader/getMember");
			const { data } = await datax.get($id);
			const d = data;
			this.listMember = d;
			Cookies.set("datax", d);
			this.listMemberOld = Cookies.get("datax");
			this.loading = false;
		},
		async checkID() {
			try {
				this.loading = true;
				const { data } = await new Resource("Reader/checkID").get(
					this.form.client_guid
				);
				if (data) {
					this.datax.rep_id = data[0].rep_id;
					this.datax.rep_address = data[0].rep_address;
				}
			} catch (error) {
				this.loading = false;
			}
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
		compare(arr1, arr2) {
			if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
				this.showSave = true;
			} else {
				this.showSave = false;
			}
		},
		async checkingname() {
			const par = {
				lastName: this.form.lastName,
				firstName: this.form.firstName,
			};
			const { data } = await new Resource("Reader/checkingname").list(par);
			if (data.length > 0) {
				this.$q
					.dialog({
						title: data.length + " Records duplicate lastname and firstname ",
						message: "Would you like to save this data?",
						cancel: true,
						persistent: true,
					})
					.onOk(() => {
						this.valid = true;
						this.finalSave();
					})
					.onCancel(() => {
						return true;
					})
					.onDismiss(() => {
						return false;
					});
			} else {
				this.valid = true;
			}
		},
		async getRef() {
			const { data } = await new Resource("Reader/getRef").get(
				this.datax.rep_brgy
			);
			this.form.client_guid = data[0].client_guid;
			this.form.members_id = data[0].client_guid;
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
			this.loadMember(this.form.client_guid);
			this.loading = false;
		},
		async loadRelation($id) {
			const { data } = await new Resource("Reader/GetRelationship").list();
			this.relation = data.map((item) => Object.values(item)[1]);
		},
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
<style lang="sass" scoped>
.row > div
  padding: 5px 5px
</style>
