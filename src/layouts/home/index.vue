<template>
	<div class="row"></div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import btngoogle from "#/q-google";
import { mapGetters } from "vuex";
import {
	getInfo,
	getMember,
	setSelected,
	getSelected,
	setMember,
} from "src/utils/auth";
// import GoogleLogin from "vue-google-login";
export default {
	data() {
		return {
			code: null,
			datax: null,
			selected: {
				name: "Click Me",
				captain: null,
				mayor: null,
				code: null,
			},
		};
	},
	methods: {
		onLogin() {
			EventBus.$emit("login");
		},
		selectedPerson(item) {
			this.selected.name = item.fullname;
			this.selected.captain = item.brgy_captain;
			this.selected.mayor = item.citymunMayor;
			this.selected.code = item.client_guid;
			setSelected(this.selected);
		},
		async loadMember() {
			// this.tab = "list";
			// this.loading = true;
			// const datax = new Resource("Reader/getMember");
			// const { data } = await datax.get(getInfo()["details"][0]["client_guid"]);
			// const d = data;
			// this.listMember = d;
			// this.loading = false;
			new Resource("Reader/getMemberList")
				.get(getInfo()["details"][0]["client_guid"])
				.then(({ data }) => {
					setMember(data);
					this.datax = data;
				});
		},
	},
	mounted() {
		this.loadMember();
		if (getSelected()) {
			this.selected = getSelected();
		}
	},
	computed: {
		...mapGetters(["avatar"]),
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