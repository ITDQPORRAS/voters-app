<template>
	<div>
		<div>
			<div class="row q-pt-lg">
				<div class="col-12 col-md-12 text-center">
					<q-img
						src="icons/banner.png"
						spinner-color="white"
						style="height: 100px; max-width: 120px"
					></q-img>
				</div>
				<div class="col-12 col-md-12 text-center text-h6">e-Voters</div>
				<div class="col-12 col-md-12 q-pt-lg">
					<q-input
						ref="email"
						outlined
						v-model="loginForm.email"
						label="Email"
						stack-label
						lazy-rules
						dense
						:rules="[(val) => (val && val.length > 0) || 'Please input Email']"
					>
						<template v-slot:prepend>
							<q-icon name="email" />
						</template>
					</q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						outlined
						dense
						ref="password"
						v-model="loginForm.password"
						label="Password"
						:type="isPwd ? 'password' : 'text'"
						stack-label
						size="sm"
					>
						<template v-slot:prepend>
							<q-icon name="vpn_key" />
						</template>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>

					<a @click="forgot">
						<a class="text-primary">Forgot Password?</a>
					</a>
				</div>
				<div class="col-12 col-md-12 q-pt-lg">
					<q-btn
						@click="handleLogin"
						style="width: 100%"
						color="primary"
						label="Login"
					/>
				</div>
				<div class="col-12 col-md-12">
					<h1>or</h1>
				</div>
				<!-- <div class="col-12 col-md-12">
					<q-btn
						@click="auth('google')"
						color="negative"
						style="width: 100%"
						class="full-width"
						icon="fab fa-google"
						label="Login with Google"
						size="md"
					>
					</q-btn>
				</div> -->
				<div class="col-12 col-md-12 q-pt-md">
					<div class="text-center">
						No account yet?
						<em class="text-primary">
							<a @click="register">Click here to Register</a>
						</em>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import EventBus from "./events";
import Resource from "@/api/resource";
export default {
	data() {
		return {
			tab: "login",
			card: true,
			loginForm: {
				email: "",
				password: "",
			},
			isPwd: true,
			redirect: null,
			loading: false,
		};
	},
	methods: {
		async auth(network) {
			this.$hello(network)
				.login({
					scope: "email",
				})
				.then(async (res) => {
					const authRes = this.$hello(network).getAuthResponse();
					console.log(authRes);
					// alert(authRes.client_id);
					let par = {
						grant_type: "social",
						client_id: "2",
						client_secret: "kkpSaagQr1NzqIBAWIQBlDPXQwmmvEPvnCVEoI4f",
						provider: network,
						access_token: res.authResponse.access_token,
						user: this.loginForm.email,
						password: this.loginForm.password,
					};

					await new Resource("oauth/token").post(par).then(async (res) => {
						this.$store.dispatch("user/setTokenz", res).then(async () => {
							this.$store.dispatch("user/getInfo").then(async () => {
								// this.$socket.client.emit("login", this.loginForm.email);
								// this.$socket.client.emit("join", {
								// email: this.loginForm.email
								// });
								this.$router.push("/");
								this.$q.loading.hide();
							});
						});
					});
				});
		},
		forgot() {
			EventBus.$emit("reset");
		},
		register() {
			EventBus.$emit("register");
		},
		async handleLogin() {
			this.$refs.email.validate();
			this.$refs.password.validate();

			if (this.$refs.email.hasError || this.$refs.password.hasError) {
				this.formHasError = true;
			} else {
				this.$q.loading.show();
				this.$store
					.dispatch("user/login", this.loginForm)
					.then(async () => {
						await this.$store.dispatch("user/getInfo").then(() => {
							this.$router.push("/");
							this.$q.loading.hide();
						});
						this.$q.loading.hide();
						this.loading = false;
					})
					.catch((error) => {
						this.$q.loading.hide();
					});
			}
		},
	},
	watch: {
		// $route: {
		//   handler: function(route) {
		//     if (this.$store.state.app.currentPath === "/reset-password") {
		//       this.redirect = "/";
		//       return true;
		//     } else {
		//       this.redirect = this.$store.state.app.currentPath;
		//       return true;
		//     }
		//     if (this.$store.state.app.currentPath === "/login") {
		//       this.redirect = "/";
		//       return true;
		//     } else {
		//       this.redirect = this.$store.state.app.currentPath;
		//     }
		//   },
		//   immediate: true
		// }
	},
};
</script>
<style lang="sass" scoped>
.row > div
  padding-left: 15px
  padding-right: 15px
</style>
<style scoped>
h1 {
	overflow: hidden;
	text-align: center;
	font-size: 1rem;
	line-height: 1rem;
}

h1:before,
h1:after {
	background-color: #1976d2;
	content: "";
	display: inline-block;
	height: 1px;
	position: relative;
	vertical-align: middle;
	width: 50%;
}

h1:before {
	right: 0.5em;
	margin-left: -50%;
}

h1:after {
	left: 0.5em;
	margin-right: -50%;
}

#content .col {
	float: left;
}

#footer {
	clear: left;
}
</style>
