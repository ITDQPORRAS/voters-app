<template>
	<div>
		<div class="row">
			<div class="col-12 col-md-5 fixed-center"></div>
			<div class="col-12 col-md-2 fixed-center">
				<keep-alive>
					<component :is="component" />
				</keep-alive>
			</div>
			<div class="col-12 col-md-5 fixed-center"></div>
		</div>
	</div>
</template>
<script>
import EventBus from "./events";
import { csrf } from "src/api/auth";
import login from "./login";
import register from "./register";
import reset from "./reset";
import { colors } from "quasar";
export default {
	components: { login, register, reset },
	data() {
		return {
			autoplay: true,
			slide: 2,
			fullscreen: false,
			tab: "login",
			card: true,
			loginForm: {
				fullname: null,
				email: "",
				password: "",
				passwor2: "",
			},
			isPwd: true,
			redirect: null,
			loading: false,
			component: "login",
		};
	},
	mounted() {
		EventBus.$on("register", (data) => {
			this.component = "register";
		});
		EventBus.$on("reset", (data) => {
			this.component = "reset";
		});
		EventBus.$on("login", (data) => {
			this.component = "login";
		});
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
