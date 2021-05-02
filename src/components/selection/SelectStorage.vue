<template>
	<div>
		<q-select
			v-model="optionModel"
			class="q-pa-none"
			:options="option"
			option-value="id"
			option-label="description"
			:label="optionLabel"
			:dense="$q.screen.lt.md"
			emit-value
			:readonly="readonly"
			:rules="rules"
			:disable="disable"
			map-options
			use-input
			input-debounce="0"
			@filter="filterQSelect"
		>
			<!-- :error="$v.main.Storageid.$error" -->

			<template v-slot:no-option>
				<q-item clickable v-ripple>
					<q-item-section avatar>
						<q-avatar
							icon="add"
							font-size="30px"
							size="30px"
							text-color="positive"
						></q-avatar>
					</q-item-section>
					<q-item-section> No results, Add New? </q-item-section>
				</q-item>
			</template>
			<!-- <template v-slot:before-options v-if="canAddNew">
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
import { required } from "vuelidate/lib/validators";

export default {
	components: {},
	props: {
		selected: [String, Number],
		optionLabel: { type: String, default: "Storage *" },
		canAddNew: { type: Boolean, default: true },
		disable: { type: Boolean, default: false },
		readonly: { type: Boolean, default: false },
		rules: Array,
	},
	data() {
		return {
			dlgEntry: false,
			search: "",
			storageDescription: "",
		};
	},
	created() {},
	mounted() {},
	methods: {
		...mapActions(["GET_STORAGES"]),
		async getData() {
			try {
				await this.GET_STORAGES();
			} catch (error) {
				console.log(error);
			}
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
		ClearSearch() {
			this.search = "";
		},
	},
	computed: {
		...mapGetters(["GETSTORAGES"]),
		option: {
			get() {
				return this.GETSTORAGES.filter(
					(v) => v.description.toLowerCase().indexOf(this.search) > -1
				);
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
