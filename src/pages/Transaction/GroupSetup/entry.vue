<template>
	<div class="row">
		<div class="col-12">
			<r-input v-model="form.description" label="Name"></r-input>
		</div>
		<div class="col-12">
			<q-select
				:dense="$q.screen.lt.md"
				v-model="form._category"
				:options="['GROUP', 'INFLUENCER']"
				label="Type"
			/>
		</div>
		<div class="col-12">
			<q-input label="Color" v-model="form._color" class="my-input">
				<template v-slot:append>
					<q-icon name="colorize" class="cursor-pointer">
						<q-popup-proxy transition-show="scale" transition-hide="scale">
							<q-color v-model="form._color" />
						</q-popup-proxy>
					</q-icon>
				</template>
			</q-input>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			form: {
				dtl_id: 0,
				description: "",
				_group: "",
				_category: "",
				_color: "",
			},
		};
	},
};
</script>