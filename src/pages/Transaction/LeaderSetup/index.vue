<template>
	<div class="q-pa-sm">
		<q-table title="Leader List" :data="data" :columns="columns" row-key="name">
			<template v-slot:top-right>
				<!-- <q-input
					dense
					rounded
					debounce="500"
					style="width: 150px"
					v-model="search"
					placeholder="Search"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input> -->
				<q-btn round color="primary" icon="check" @click="onClick" />
			</template>
		</q-table>
		<q-voters></q-voters>
	</div>
</template>

<script>
export default {
	data() {
		return {
			search: "",
		};
	},
};
</script>