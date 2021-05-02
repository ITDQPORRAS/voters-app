<template>
	<q-slide-item @bottom="onLogin">
		<template v-slot:bottom>
			<q-icon name="link" />
			login
		</template>
		<q-item>
			<div class="full-width">
				<div class="row q-pt-lg q-pb-lg">
					<div class="col-12 col-md-12 q-pt-md">
						<q-card flat class="column items-center">
							<div class="row">
								<div class="col-12 text-center">
									<img
										src="icons/nagacebu_brand_logo.png"
										alt
										style="height: 90px; max-width: 320px"
									/>
								</div>
							</div>
						</q-card>
					</div>
				</div>
				<div
					class="text-h5 text-light-bold text-center bg-primary text-white q-pt-sm"
					style="height: 50px"
				>
					City of Naga Household Card
				</div>

				<div class="col-12 col-md-12 q-pt-sm">
					<!-- <div id="content"> -->
					<div class="row">
						<!-- <div class="col-6 text-center">
							<q-avatar rounded size="150px" font-size="52px">
								<img :src="img" alt />
							</q-avatar>
						</div> -->
						<div class="col-12">
							<div class="text-h5 text-center">
								<qriously :value="datax.client_guid" :size="160" />
							</div>
						</div>
					</div>
				</div>
				<div class="text-body2 text-center">
					{{ datax.client_guid }}
				</div>
				<div class="text-h5 text-bold text-center">
					<u>{{ datax.name }}</u>
				</div>
				<div class="text-h6 text-bold text-center">
					<u>{{ datax.cityName }}</u>
					<div class="text-subtitle2 text-center">City</div>
				</div>
				<div class="text-h6 text-bold text-center">
					<u>{{ datax.barangay }}</u>
					<div class="text-subtitle2 text-center">Barangay</div>
				</div>
				<div v-if="datax.purok" class="text-h6 text-bold text-center">
					<u>{{ datax.purok }}</u>
					<div class="text-subtitle2 text-center">Purok</div>
				</div>
			</div>
		</q-item>
	</q-slide-item>
</template>
<script>
import { csrf } from "src/api/auth";
import EventBus from "./events";
import Resource from "@/api/resource";
import btngoogle from "#/q-google";
import axios from "axios";
import { getInfo, getMember, setSelected, getSelected } from "src/utils/auth";
import { setImage, getImage } from "src/utils/auth";
// import GoogleLogin from "vue-google-login";
export default {
	data() {
		return {
			code: null,
			selected: {
				name: "Click Me",
				captain: null,
				mayor: null,
				code: null,
				citymunDesc: null,
				brgy_name: null,
				purok: null,
			},
			datax: {
				fullname: null,
				client_guid: null,
				brgy_name: null,
				citymunDesc: null,
				rep_address: null,
			},
			img: "icon/icons8-customer-64.png",
		};
	},
	methods: {
		onLogin() {
			EventBus.$emit("login");
		},

		selectedPerson(item) {
			console.log(item);
			this.selected.name = item.fullname;
			this.selected.captain = item.brgy_captain;
			this.selected.mayor = item.citymunMayor;
			this.selected.code = item.client_guid;
			this.selected.citymunDesc = item.citymunDesc;
			this.selected.brgy_name = item.brgy_name;
			this.selected.purok = item.rep_address;
			setSelected(this.selected);
		},
		validateFields() {
			this.$refs.province.validate();
		},
		selectValidate(val) {
			if (val === null) {
				return "You must make a selection!";
			}
		},
	},
	mounted() {
		if (getMember()[0]) {
			this.datax = getMember()[0];
		}
		if (getSelected()) {
			this.selected = getSelected();
		}
		// if (getImage()) {
		// 	this.img = getImage();
		// }
	},
};
</script>

<style scoped>
.q-item {
	padding: 0px 0px 0px 0px;
	color: inherit;
	transition: color 0.3s, background-color 0.3s;
}

#content .col {
	float: left;
}

#footer {
	clear: left;
}
.q-field__marginal {
	height: 45px !important;
	color: rgba(0, 0, 0, 0.54);
	font-size: 24px;
}
.q-field__control {
	height: 45px !important;
	max-width: 100%;
	outline: none;
}
</style>