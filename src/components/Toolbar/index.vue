<template>
	<div>
		<q-toolbar>
			<q-btn flat round dense icon="arrow_back_ios" @click="back" />
			<q-toolbar-title>{{title}}</q-toolbar-title>
			<slot />
		</q-toolbar>
		<q-separator />
	</div>
</template>
<script>
export default {
	props: {
		title: { type: String, default: "Title" },
	},
	methods: {
		back() {
			this.$emit("back");
		},
	},
};
</script>