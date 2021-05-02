<template>
	<q-dialog
		v-model="show"
		:maximized="full === true ? true : $q.platform.is.mobile"
		:full-height="full === true ? true : $q.platform.is.mobile"
		:full-width="full === true ? true : $q.platform.is.mobile"
		persistent
		transition-show="slide-left"
		transition-hide="slide-right"
	>
		<keep-alive>
			<q-card
				class="col-12"
				v-bind:style="$q.platform.is.mobile ? '' : 'width:600px'"
			>
				<toolbarx v-show="showToolBar" :title="title" @back="show = false" />
				<q-separator />
				<q-card-section>
					<slot />
				</q-card-section>
				<q-separator />
				<q-card-actions v-show="showCommand" align="right">
					<q-btn color="primary" @click="save" flat rounded outline>
						{{ btnText }}
					</q-btn>
					<q-btn
						color="negative"
						flat
						outline
						rounded
						v-close-popup
						@click="close"
						>Close</q-btn
					>
				</q-card-actions>
			</q-card>
		</keep-alive>
	</q-dialog>
</template>
<script>
import { Platform } from "quasar";
import toolbarx from "#/Toolbar";
export default {
	components: { toolbarx },
	props: {
		value: Boolean,
		title: { type: String, default: "" },
		showCommand: {
			type: Boolean,
			default: true,
		},
		showToolBar: {
			type: Boolean,
			default: true,
		},
		full: { type: Boolean, default: false },
	},
	data() {
		return {
			btnText: "Save",
		};
	},
	mounted() {},
	methods: {
		close() {
			this.$emit("close");
		},
		save() {
			this.$emit("save");
		},
	},
	computed: {
		show: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit("input", value);
			},
		},
	},
};
</script>
