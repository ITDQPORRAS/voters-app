<template>
	<div class="q-pa-sm">
		<q-list bordered>
			<q-expansion-item
				group="group"
				icon="perm_identity"
				label="Profile Information"
				default-opened
				header-class="text-primary"
			>
				<q-separator />
				<q-card>
					<q-card-section>
						<div class="row q-col-gutter-sm justify-center">
							<div class="col-12 col-md-12">
								<q-input
									:dense="$q.screen.lt.md"
									stack-label
									ref="firstName"
									color="primary"
									v-model="form.firstName"
									label="First Name"
								></q-input>
							</div>
							<div class="col-12 col-md-12">
								<q-input
									:dense="$q.screen.lt.md"
									stack-label
									ref="middleName"
									color="primary"
									v-model="form.middleName"
									label="Middle Name"
								></q-input>
							</div>
							<div class="col-8 col-md-9">
								<q-input
									:dense="$q.screen.lt.md"
									stack-label
									ref="lastName"
									color="primary"
									v-model="form.lastName"
									label="Last Name"
									lazy-rules
								></q-input>
							</div>
							<div class="col-4 col-md-3">
								<q-input
									:dense="$q.screen.lt.md"
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
									:dense="$q.screen.lt.md"
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
									:dense="$q.screen.lt.md"
									v-model="form.gender"
									:options="genderx"
									option-value="Gender"
									option-label="Gender"
									label="Gender"
									stack-label
									lazy-rules
								/>
							</div>
							<div class="col-6 col-md-3">
								<q-input
									:dense="$q.screen.lt.md"
									readonly
									stack-label
									ref="purok"
									v-model="rep_address"
									color="primary"
									label="Purok"
								></q-input>
							</div>
							<div class="col-6 col-md-3">
								<q-input
									readonly
									:dense="$q.screen.lt.md"
									stack-label
									ref="Barangay"
									v-model="brgy_name"
									color="primary"
									label="Barangay"
								></q-input>
							</div>
							<div class="col-6 col-md-6">
								<q-select
									ref="relation"
									:dense="$q.screen.lt.md"
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
									:dense="$q.screen.lt.md"
									bottom-slots
									v-model="form.contact_number"
									label="Mobile No"
									mask="####-###-####"
									unmasked-value
								>
									<template v-slot:hint>e.g. 0912-356-7890</template>
								</q-input>
							</div>
						</div>
					</q-card-section>
				</q-card>
			</q-expansion-item>
			<q-separator />
			<q-expansion-item
				group="group"
				icon="attachment"
				label="Valid ID"
				header-class="text-teal"
			>
				<q-separator />
				<q-card>
					<q-card-section>
						<div class="col-12">
							<q-uploader
								flat
								bordered
								max-files="1"
								hide-upload-btn
								style="width: 100%"
								label="Upload Valid ID"
								url=""
								extensions=".gif,.jpg,.jpeg,.png"
								@added="businessfile"
								@removed="businessfileRemove"
							/>
						</div>
					</q-card-section>
				</q-card>
			</q-expansion-item>
		</q-list>
		<div class="col-12">
			<q-btn
				class="full-width"
				@click="save"
				:loading="loading"
				color="primary"
				label="Save"
			/>
		</div>
	</div>
</template>
<script>
import { getInfo } from "src/utils/auth";
import Resource from "@/api/resource";
export default {
	data() {
		return {
			loading: false,
			form: {
				lastName: "",
				firstName: "",
				middleName: "",
				suffix: "",
				birthdate: "",
				gender: "",
				members_id: getInfo()["details"][0]["client_guid"],
				client_guid: getInfo()["details"][0]["client_guid"],
				member_type: null,
				contact_number: null,
			},
			brgy_name: getInfo()["details"][0]["brgy_name"],
			rep_address: getInfo()["details"][0]["purok"],
			genderx: ["Female", "Male"],
			relation: [],
			businessfileData: [],
		};
	},
	mounted() {
		this.loadRelation();
	},
	methods: {
		businessfile(file) {
			file.forEach((element) => this.businessfileData.push(element));
		},
		businessfileRemove(file) {
			var filtered = this.businessfileData.filter(function (value, index, arr) {
				return value.name !== file[0].name;
			});
			this.businessfileData = filtered;
		},
		async loadRelation() {
			const { data } = await new Resource("Reader/GetRelationship").list();
			this.relation = data.map((item) => Object.values(item)[1]);
		},
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
		async finalSave() {
			if (this.valid) {
				this.loading = true;
				// const datax = new Resource("Reader/saveMember");
				// const { data } = await datax.store({
				// 	data: this.form,
				// 	main: this.datax,
				// });
				// this.$socket.client.emit("encodeMembers");
				// this.$q.notify(JSON.stringify(data.Message));
				// this.loading = false;
				// this.$emit("loaded");
				// this.clear();
				// lastName: "",
				// firstName: "",
				// middleName: null,
				// suffix: null,
				// birthdate: "",
				// gender: "",
				// members_id: getInfo()["details"][0]["client_guid"],
				// client_guid: getInfo()["details"][0]["client_guid"],
				// member_type: null,
				// contact_number: null,
				const data = new FormData();
				let businessfileData = this.businessfileData;
				console.log(businessfileData);
				for (var i = 0; i < businessfileData.length; i++) {
					let file = businessfileData[i];
					data.append(`validID[${i}]`, file);
				}
				data.append("lastName", this.form.lastName);
				data.append("firstName", this.form.firstName);
				data.append("middleName", this.form.middleName);
				data.append("suffix", this.form.suffix);
				data.append("birthdate", this.form.birthdate);
				data.append("gender", this.form.gender);
				data.append("members_id", this.form.members_id);
				data.append("client_guid", this.form.client_guid);
				data.append("member_type", this.form.member_type);
				data.append("contact_number", this.form.contact_number);

				return new Promise((resolve, reject) => {
					this.$axios
						.post(`Reader/saveMemberOnline`, data, {
							headers: { "content-type": "multipart/form-data" },
							processData: false,
							contentType: false,
						})
						.then(({ data }) => {
							this.$q.loading.hide();
							this.$q.notify(JSON.stringify(data.Message));
							this.$socket.client.emit("encodeMembers");
							this.$emit("loaded");
							resolve(null);
						})
						.catch((err) => {
							this.loading = false;
							this.$q.loading.hide();
							reject(err);
							this.errors = err.response.data.errors;
							this.uploadPercentage = false;
						});
				});
				this.$q.notify(JSON.stringify(data.Message));
				this.$q.loading.hide();
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
	},
};
</script>