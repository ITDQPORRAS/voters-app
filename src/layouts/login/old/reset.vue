<template>
	<div>
		<div>
			<q-tlbr title="Forgot Password" @back="login"></q-tlbr>
			<div class="row">
				<div class="col-12 col-md-12 q-pt-md text-center">
					<div class="text-h6">Young Builders Corporation</div>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						ref="email"
						color="primary"
						type="text"
						v-model="email"
						label="Email"
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please type email']"
					></q-input>
				</div>
				<div class="col-12 col-md-12 q-pb-md">
					<q-btn
						@click="handlereset"
						:loading="loading"
						style="width: 100%"
						rounded
						no-caps
						color="primary"
						label="Send Email"
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
		validate() {
			this.$refs.email.validate();
		},
		login() {
			EventBus.$emit("login");
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