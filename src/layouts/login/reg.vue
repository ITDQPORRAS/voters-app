<template>
	<div>
		<div>
			<q-tlbr title="Register" @back="login"></q-tlbr>
			<div class="row">
				<div class="col-12 col-md-12 q-pt-md">
					<q-card flat class="column items-center">
						<div class="row">
							<div class="col-12 text-center">
								<img src="icons/banner.png" alt style="height: 100px" />
							</div>
						</div>
					</q-card>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-md-12">
					<q-input
						dense
						stack-label
						ref="email"
						color="primary"
						v-model="loginForm.name"
						label="Full Name"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type fullname',
						]"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						dense
						stack-label
						ref="email"
						color="primary"
						type="text"
						v-model="loginForm.email"
						label="Email"
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please type email']"
					></q-input>
				</div>
				<div class="col-6 col-md-6">
					<q-input
						dense
						stack-label
						ref="password"
						color="primary"
						v-model="loginForm.password"
						:rules="[
							(val) => (val && val.length > 0) || 'Please input password',
						]"
						type="password"
						lazy-rules
						label="Password"
					></q-input>
				</div>
				<div class="col-6 col-md-6">
					<q-input
						dense
						stack-label
						ref="password2"
						color="primary"
						v-model="loginForm.password2"
						:rules="[
							(val) => (val && val.length > 0) || 'Please retry password',
						]"
						type="password"
						lazy-rules
						label="Repeat Password"
					></q-input>
				</div>
				<div class="col-12 col-md-12 q-pb-md">
					<q-btn
						rounded
						@click="handleLogin"
						:loading="loading"
						style="width: 100%"
						color="primary"
						label="Register"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import EventBus from "./events";
export default {
	data() {
		return {
			tab: "login",
			card: true,
			facility: [],
			loginForm: {
				name: "",
				email: "",
				password: "",
				password2: null,
			},
			isPwd: true,
			isPwd1: true,
			redirect: null,
			loading: false,
			valid: true,
		};
	},

	methods: {
		validate() {
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
						this.loading = true;
						const datax = new Resource("register");
						const { data } = await datax.store(this.loginForm);
						// this.$message({ message: data.Message, type: data.status });
						this.$q.notify(JSON.stringify(data.Message));
						this.loading = false;
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
	},
};
</script>
<style lang="sass" scoped>
.row > div
  padding-left: 15px
  padding-right: 15px
</style>
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