<template>
	<div>
		<q-btn-group spread>
			<q-btn color="primary" flat :label="labelSave" icon="save" @click="save" />
			<q-btn flat style="color: #FF0080" label="Clear" @click="clear" icon="settings_backup_restore" />
		</q-btn-group>
	</div>
</template>

<script>
export default {
	props: {
		labelSave: { type: String, default: "Save" },
		disable: { type: Boolean, default: false },
	},
	methods: {
		save() {
			this.$emit("save");
		},
		clear() {
			this.$emit("clear");
		},
	},
};
</script>

<style>
</style>