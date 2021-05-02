<template>
	<div>
		<q-select
			class="q-pa-none"
			v-model="optionModel"
			clearable
			:options="option"
			option-value="id"
			option-label="fullname"
			:label="optionLabel"
			:dense="dense ? true : $q.screen.lt.md"
			emit-value
			:readonly="readonly"
			map-options
			use-input
			input-debounce="0"
			@filter="filterQSelect"
			:rules="rules"
			:disable="disable"
		>
			<!-- :error="$v.main.Vendor_id.$error" -->

			<!-- <template v-slot:before-options>
				<q-item
					clickable
					class="text-positive"
					@click="dlgEntry = true"
					v-ripple
				>
					<q-item-section> Add New </q-item-section>
					<q-item-section avatar>
						<q-avatar
							icon="add"
							font-size="30px"
							size="30px"
							text-color="positive"
						></q-avatar>
					</q-item-section>
				</q-item>
			</template> -->
		</q-select>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	props: {
		optionLabel: { type: String, default: "Supplier *" },
		selected: { type: [String, Number], default: null },
		readonly: { type: Boolean, default: false },
		disable: { type: Boolean, default: false },
		rules: Array,
	},
	data() {
		return {
			dlgEntry: false,
			search: "",
		};
	},
	methods: {
		...mapActions(["GET_SUPPLIERS"]),
		async getData() {
			try {
				await this.GET_SUPPLIERS();
			} catch (error) {}
		},
		addNew() {
			this.$refs.entry.saveData();
		},
		closeentry() {
			this.dlgEntry = false;
			this.getData();
		},
		cancelwindow() {
			this.dlgEntry = false;
		},
		ClearSearch() {
			this.search = "";
		},

		filterQSelect(val, update, abort) {
			setTimeout(() => {
				update(
					() => {
						if (val === "") {
							this.search = "";
						} else {
							const needle = val.toLowerCase();
							this.search = needle;
						}
					},
					(ref) => {
						if (val !== "" && ref.options.length > 0) {
							ref.setOptionIndex(-1);
							ref.moveOptionSelection(1, true);
						}
					}
				);
			}, 300);
		},
	},
	mounted() {},
	computed: {
		...mapGetters(["GETSUPPLIERS_ACTIVE"]),
		option: {
			get() {
				return this.GETSUPPLIERS_ACTIVE.filter(
					(v) => v.fullname.toLowerCase().indexOf(this.search) > -1
				);
				return data;
			},
		},
		optionModel: {
			get() {
				return this.selected;
			},
			set(v) {
				this.search = "";
				this.$emit("selected", v);
			},
		},
	},
};
</script>

<style></style>
