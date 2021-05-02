<template>
	<div>
		<div>
			<div class="row">
				<div class="col-12 col-md-12 q-pt-md">
					<q-card flat class="column items-center">
						<div class="row">
							<div class="col-12 text-center">
								<img src="icons/banner.png" alt style="height: 150px" />
								<div class="col-12 col-md-12 text-center text-h6">e-Voters</div>
							</div>
						</div>
					</q-card>
				</div>
			</div>
			<div class="row q-pt-lg">
				<div class="col-12 col-md-12">
					<q-input
						ref="email"
						outlined
						v-model="loginForm.email"
						label="Email"
						stack-label
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please input Email']"
					>
						<template v-slot:prepend>
							<q-icon name="email" />
						</template>
					</q-input>

					<!-- <q-input
						:dense="$q.screen.lt.md"
						ref="email"
						color="primary"
						v-model="loginForm.email"
						label="Email"
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please input Email']"
					></q-input> -->
				</div>
				<div class="col-12 col-md-12">
					<!-- <q-input
						ref="password"
						color="primary"
						v-model="loginForm.password"
						:type="isPwd ? 'password' : 'text'"
						label="Password"
						:rules="[
							(val) => (val && val.length > 0) || 'Please input password',
						]"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input> -->
					<q-input
						outlined
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
					<!-- <q-input outlined v-model="loginForm.password" label-slot clearable>
						<template v-slot:prepend>
							<q-avatar>
								<img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
							</q-avatar>
						</template>

						<template v-slot:label>
							<strong class="text-deep-orange">You</strong>
							can customize the
							<em class="q-px-sm bg-deep-orange text-white rounded-borders"
								>label</em
							>
						</template>
					</q-input> -->

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
						size="md"
					/>
				</div>
				<div class="col-12 col-md-12">
					<h1>or</h1>
				</div>

				<!-- <div class="col-12 col-md-12 q-pt-xs">
					<GoogleLogin
						class="google-signin-button"
						style="width: 100%"
						:params="params"
						:onSuccess="onSuccess"
						:onFailure="onFailure"
					>
						<b>Sign in with google</b>
					</GoogleLogin>
				</div> -->
				<!-- <div class="col-12 col-md-12">
					<q-btn
						@click="auth('facebook')"
						color="primary"
						style="width: 100%"
						class="full-width"
						icon="fab fa-facebook-f"
						label="Login with Facebook"
						size="md"
					>
					</q-btn>
				</div> -->
				<!-- <div class="col-12 col-md-12 q-pt-sm">
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

				<!-- <div class="col-12 col-md-12 q-pt-sm text-center">
					<q-btn
						color="secondary"
						class="full-width"
						label="Contact Form"
						@click="onContact"
					/>
				</div> -->
				<!-- <div class="col-12 col-md-12 q-pt-sm text-center">
					<q-btn
						class="full-width"
						color="secondary"
						label="Virtual Card"
						@click="onProfile"
					/>
				</div> -->
				<div class="col-12 col-md-12 q-pt-sm">
					<div class="text-center">
						No account yet?
						<em class="text-primary">
							<a @click="register">Click here to Register</a>
						</em>
					</div>
				</div>
			</div>
		</div>
		<br />
	</div>
</template>
<script>
import EventBus from "./events";
import Resource from "@/api/resource";
export default {
	data() {
		return {
			params: {
				client_id:
					"990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com",
			},

			renderParams: {
				width: 250,
				height: 50,
				longtitle: true,
			},
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
					// alert("sad");
					// const authRes = this.$hello(network).getAuthResponse();
					// console.log(authRes);
					let par = {
						grant_type: "social",
						client_id: "5",
						client_secret: "K3Nzngxw3yHOfEs95qtfr2gawOH4ZY2xFM7BWJe2",
						provider: network,
						access_token: res.authResponse.access_token,
					};
					this.$q.loading.show();
					await new Resource("oauth/token").post(par).then(async (res) => {
						this.$store.dispatch("user/setTokenz", res).then(async () => {
							await this.$store.dispatch("user/getInfo").then(() => {
								this.$router.push("/");
								this.$q.loading.hide();
							});
						});
					});
				});
		},
		OnGoogleAuthSuccess(idToken) {
			console.log(idToken);
			// Receive the idToken and make your magic with the backend
		},
		OnGoogleAuthFail(error) {
			console.log(error);
		},
		onFailure(googleUser) {
			console.log(googleUser);

			// This only gets the user information: id, name, imageUrl and email
		},
		onSuccess(googleUser) {
			console.log(googleUser.wc);

			// This only gets the user information: id, name, imageUrl and email
			// console.log(googleUser.getBasicProfile());
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
							this.$router.push("/home");
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
	background-color: #39aecf;
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