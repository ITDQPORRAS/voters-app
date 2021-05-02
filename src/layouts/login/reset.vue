<template>
	<div>
		<div>
			<q-tlbr title="Reset Password" @back="login"></q-tlbr>
			<div class="row">
				<div class="col-12 col-md-12 q-pt-md">
					<q-card flat class="column items-center">
						<div class="row">
							<div class="col-12 text-center">
								<img
									src="icons/banner.jpg"
									alt
									style="height: 200px; max-width: 230px"
								/>
							</div>
						</div>
					</q-card>
				</div>
			</div>
			<div class="row">
				<!-- <div class="col-12 col-md-12">
					<div class="absolute-bottom text-subtitle2 text-center">
						Reset Password
					</div>
				</div> -->
				<div class="col-12 col-md-12">
					<q-input
						dense
						stack-label
						ref="email"
						color="primary"
						type="text"
						v-model="email"
						label="Email"
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please type email']"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-btn
						@click="handlereset"
						:loading="loading"
						style="width: 100%"
						outline
						color="primary"
						label="Forgot Password"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import { mapGetters } from "vuex";
import EventBus from "./events";
export default {
	data() {
		return {
			tab: "login",
			card: true,
			redirect: null,
			loading: false,
			valid: true,
			email: null,
		};
	},
	methods: {
		login() {
			EventBus.$emit("login");
		},
		validate() {
			this.$refs.email.validate();
		},
		async handlereset() {
			try {
				this.valid = true;
				await this.validate();
				if (this.$refs.email.hasError) {
					this.formHasError = true;
				} else {
					if (this.valid) {
						this.loading = true;
						const datax = new Resource("reset-password");
						const { data } = await datax.store({ email: this.email });
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
  padding: 5px 5px
</style>
