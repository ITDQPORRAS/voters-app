<template>
	<div class="q-col-gutter-sm">
		<div class="row q-col-gutter-sm">
			<div class="col-12">
				<q-input v-model="form.profile_name" type="text" label="Profile Name" />
			</div>
			<div class="col-12 text-right">
				<q-btn icon="clear" label="Clear" @click="onClear" />
				<q-btn
					color="primary"
					icon="check"
					:label="form.id > 0 ? 'Update' : 'Save'"
					@click="onSave"
				/>
			</div>
		</div>
		<div class="row q-col-gutter-sm">
			<div class="col-12">
				<q-table
					:loading="loading"
					:data="data"
					:columns="columns"
					row-key="id"
				>
					<template v-slot:body-cell-actions="props">
						<q-td :props="props">
							<q-info @edit="edit(props.row)" @cancel="cancel(props.row)">
							</q-info>
						</q-td>
					</template>
				</q-table>
			</div>
		</div>
	</div>
</template>
<script>
import Resource from "src/api/resource";
export default {
	data() {
		return {
			form: {
				id: 0,
				profile_name: null,
			},
			data: [],
			columns: [
				{ label: "Profile name", field: "profile_name", align: "left" },
				{ name: "actions", label: "Actions", field: "actions", align: "right" },
			],
			loading: false,
		};
	},
	methods: {
		onClear() {
			this.form = {
				id: 0,
				profile_name: null,
			};
		},
		edit(item) {
			this.form.id = item.id;
			this.form.profile_name = item.profile_name;
		},
		cancel() {},
		async onSave() {
			this.loading = true;
			const parameter = { form: this.form };
			const datax = new Resource("Access/profileStore");
			await datax
				.store(parameter)
				.then(({ data }) => {
					this.$q.notify(data.Message);
					this.loading = false;
					this.getProfile();
					this.$emit("save");
				})
				.catch(() => {
					this.loading = false;
				});
		},
		async getProfile() {
			try {
				this.loading = true;
				const datax = new Resource("Access/formProfile");
				const { data } = await datax.list();
				this.data = data;
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
	},
	mounted() {
		this.getProfile();
	},
};
</script>