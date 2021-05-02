<template>
	<div>
		<q-tlbr title="Register" @back="login"></q-tlbr>
		<div class="q-pa-sm">
			<q-list bordered>
				<q-expansion-item
					group="somegroup"
					icon="perm_identity"
					label="Profile Information"
					default-opened
					header-class="text-primary"
				>
					<q-separator />
					<q-card>
						<q-card-section>
							<div class="row q-col-gutter-sm">
								<!-- <div class="col-12 col-md-6">
									<q-select
										:dense="true"
										:popup-content-style="{ height: '250px' }"
										:options-dense="true"
										v-model="v_province"
										:options="province"
										option-value="id"
										option-label="name"
										label="Province *"
										input-debounce="0"
										@filter="filterProvince"
										ref="province"
										stack-label
										use-input
										lazy-rules
										:rules="[
											(val) => (val !== null && val !== '') || 'Required',
										]"
									/>
								</div> -->
								<!-- <div class="col-12 col-md-6">
									<q-select
										:dense="true"
										:popup-content-style="{ height: '250px' }"
										:options-dense="true"
										v-model="v_city"
										:options="city"
										option-value="id"
										option-label="name"
										label="City *"
										use-input
										@filter="filterCity"
										lazy-rules
										:rules="[
											(val) =>
												(val !== null && val !== '') || 'Field is required',
										]"
									/>
								</div> -->
								<div class="col-12 col-md-6">
									<q-select
										:dense="true"
										:popup-content-style="{ height: '250px' }"
										:options-dense="true"
										v-model="v_barangay"
										:options="barangay"
										option-value="id"
										option-label="name"
										label="Barangay "
										use-input
										@filter="filterBarangay"
									/>
								</div>
								<div class="col-12 col-md-6">
									<q-input
										dense
										ref="email"
										color="primary"
										v-model="loginForm.purok"
										label="Purok/Sitio"
									></q-input>
								</div>
								<div class="col-12 col-md-12">
									<q-input
										dense
										ref="email"
										color="primary"
										v-model="loginForm.fname"
										label="First Name"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please input first name',
										]"
									></q-input>
								</div>
								<div class="col-12 col-md-12">
									<q-input
										dense
										ref="email"
										color="primary"
										v-model="loginForm.mname"
										label="Middle Name"
										lazy-rules
									></q-input>
								</div>
								<div class="col-8 col-md-8">
									<q-input
										dense
										ref="email"
										color="primary"
										v-model="loginForm.lname"
										label="Last Name"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please input last name',
										]"
									></q-input>
								</div>
								<div class="col-4 col-md-4">
									<q-input
										dense
										ref="email"
										color="primary"
										v-model="loginForm.ext"
										label="Extension"
										lazy-rules
									></q-input>
								</div>
								<div class="col-12 col-md-8">
									<q-input
										dense
										ref="email"
										color="primary"
										type="text"
										v-model="loginForm.email"
										label="Email"
										lazy-rules
										:rules="[
											(val) => (val && val.length > 0) || 'Please type email',
										]"
									></q-input>
								</div>
								<div class="col-12 col-md-4">
									<q-input
										dense
										ref="hh_no"
										color="primary"
										type="text"
										v-model="profile.hh_no"
										label="Household Card #"
										lazy-rules
										:rules="[
											(val) =>
												(val && val.length > 0) ||
												'Please type household card #',
										]"
										mask="##-####"
										hint="Mask: ##-####"
									></q-input>
								</div>
								<div class="col-6 col-md-6">
									<q-input
										dense
										ref="password"
										color="primary"
										v-model="loginForm.password"
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please input password',
										]"
										type="password"
										lazy-rules
										label="Password"
									></q-input>
								</div>
								<div class="col-6 col-md-6">
									<q-input
										dense
										ref="password2"
										color="primary"
										v-model="loginForm.password2"
										:rules="[
											(val) =>
												(val && val.length > 0) || 'Please retry password',
										]"
										type="password"
										lazy-rules
										label="Repeat Password"
									></q-input>
								</div>
							</div>
						</q-card-section>
					</q-card>
				</q-expansion-item>

				<q-separator />

				<q-expansion-item
					group="somegroup"
					icon="attachment"
					label="Household"
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
									label="Upload Household Card"
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
			<div class="col-12 col-md-12">
				<q-btn
					@click="handleLogin"
					:loading="loading"
					style="width: 100%"
					color="info"
					label="Register"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import EventBus from "./events";
import { getBrgy, setBrgy } from "src/utils/auth";
export default {
	data() {
		return {
			step: 1,
			tab: "login",
			card: true,
			facility: [],
			v_barangay: [],
			v_province: [],
			v_city: [],
			barangay: [],
			barangayData: [],
			province: [],
			provinceData: [],
			city: [],
			cityData: [],
			loginForm: {
				name: "",
				email: "",
				password: "",
				password2: null,
				brgy_id: null,
				fname: "",
				mname: "",
				lname: "",
				ext: "",
				purok: "",
			},
			profile: {
				provinceId: null,
				provinceName: null,
				cityId: null,
				cityName: null,
				barangayId: null,
				barangay: null,
				address: null,
				hh_no: null,
			},
			facilityMain: [],
			isPwd: true,
			isPwd1: true,
			redirect: null,
			loading: false,
			valid: true,

			businessfileData: [],
		};
	},
	mounted() {
		// this.getFacility();
		// this.getBrgy();
		this.getProvince();
	},
	methods: {
		filterProvince(val, update) {
			if (val === "") {
				update(() => {
					this.province = this.provinceData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.province = this.provinceData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		filterCity(val, update) {
			if (val === "") {
				update(() => {
					this.city = this.cityData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.city = this.cityData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		filterBarangay(val, update) {
			if (val === "") {
				update(() => {
					this.barangay = this.barangayData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.barangay = this.barangayData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		async getProvince() {
			const { data } = await new Resource().getProvince();
			this.provinceData = data;
			this.v_province = {
				id: "0722",
				name: "CEBU",
			};
		},
		async getBarangay(idx) {
			const { data } = await new Resource().getBarangay(idx);
			this.barangayData = data;
		},
		async getCity(idx) {
			const { data } = await new Resource().getCity(idx);
			this.cityData = data;
			this.v_city = {
				id: "072234",
				name: "CITY OF NAGA",
			};
		},
		businessfile(file) {
			file.forEach((element) => this.businessfileData.push(element));
		},
		businessfileRemove(file) {
			var filtered = this.businessfileData.filter(function (value, index, arr) {
				return value.name !== file[0].name;
			});
			this.businessfileData = filtered;
		},
		validate() {
			this.loginForm.name =
				this.loginForm.fname +
				" " +
				this.loginForm.mname +
				" " +
				this.loginForm.lname +
				" " +
				this.loginForm.ext;
			this.$refs.email.validate();
			this.$refs.password.validate();
			if (this.loginForm.password !== this.loginForm.password2) {
				this.valid = false;
				this.$q.notify({
					color: "negative",
					message: "Password not matched!",
					icon: "report_problem",
					position: "top",
				});
			}
		},
		async getFacility() {
			this.facility = getBrgy();
			const { data } = await new Resource("facility").list();
			this.facility = data;
			setBrgy(data);
		},
		async getBrgy() {
			await new Resource("getBrgy").list().then(({ data }) => {
				this.barangay = data;
			});
		},
		login() {
			EventBus.$emit("login");
		},
		async handleLogin() {
			try {
				this.valid = true;
				await this.validate();
				if (this.$refs.email.hasError || this.$refs.password.hasError) {
					this.formHasError = true;
				} else {
					if (this.valid) {
						this.$q.loading.show();

						const data = new FormData();
						let businessfileData = this.businessfileData;
						console.log(businessfileData);
						for (var i = 0; i < businessfileData.length; i++) {
							let file = businessfileData[i];
							data.append(`validID[${i}]`, file);
						}
						data.append("fname", this.loginForm.fname);
						data.append("mname", this.loginForm.mname);
						data.append("lname", this.loginForm.lname);
						data.append("ext", this.loginForm.ext);
						data.append("brgy_id", this.profile.barangayId);
						data.append("purok", this.loginForm.purok);
						data.append("name", this.loginForm.name);
						data.append("email", this.loginForm.email);
						data.append("password", this.loginForm.password);
						data.append("province_code", this.profile.provinceId);
						data.append("provinceName", this.profile.provinceName);
						data.append("cityId", this.profile.cityId);
						data.append("cityName", this.profile.cityName);
						data.append("barangay", this.profile.barangay);
						data.append("hh_no", this.profile.hh_no);

						return new Promise((resolve, reject) => {
							this.$axios
								.post(`storeRegister`, data, {
									headers: { "content-type": "multipart/form-data" },
									processData: false,
									contentType: false,
								})
								.then(({ data }) => {
									this.$q.loading.hide();
									this.$q.notify(JSON.stringify(data.Message));
									// this.$socket.client.emit("register");
									EventBus.$emit("login");
									resolve(null);
								})
								.catch((err) => {
									this.$q.loading.hide();
									reject(err);
									this.errors = err.response.data.errors;
									this.uploadPercentage = false;
								});
						});
						this.$q.notify(JSON.stringify(data.Message));
						this.$q.loading.hide();
					}
				}
			} catch (error) {
				this.$q.notify(JSON.stringify(error));
				this.loading = false;
			}
		},
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
		facilityMain: function (val) {
			this.loginForm.facility = val.id;
			this.loginForm.facilityName = val.facility_name;
		},
		v_city(n) {
			this.profile.cityId = n.id;
			this.profile.cityName = n.name;
			this.getBarangay(this.profile.cityId);
			immediate: true;
		},
		v_barangay(n) {
			this.profile.barangayId = n.id;
			this.profile.barangay = n.name;
			immediate: true;
		},
		v_province(n) {
			this.profile.provinceId = n.id;
			this.profile.provinceName = n.name;
			this.getCity(this.profile.provinceId);
			immediate: true;
		},
	},
};
</script>

<style scoped>
#content .col {
	float: left;
}

#footer {
	clear: left;
}
.q-field--with-bottom {
	padding-bottom: 15px;
}
</style>