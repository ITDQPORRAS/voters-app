<template>
	<div>
		<q-select
			v-model="optionModel"
			:options="option"
			option-value="id"
			option-label="sub_name"
			:label="optionLabel"
			:dense="$q.screen.lt.md"
			emit-value
			:readonly="readonly"
			:rules="rules"
			map-options
			use-input
			input-debounce="0"
			@filter="filterQSelect"
		>
			<!-- :error="$v.main.Storageid.$error" -->

			<!-- <template v-slot:no-option>
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
			</template> -->
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
		optionLabel: { type: String, default: "Sub Category *" },
		readonly: { type: Boolean, default: false },
		rules: Array,
		categoryID: [String, Number],
	},
	data() {
		return {
			dlgEntry: false,
			search: "",
			storageDescription: "",
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		...mapActions(["GET_SUBCATEGORIES"]),
		async getData() {
			try {
				await this.GET_SUBCATEGORIES(0);
			} catch (error) {
				console.log(error);
			}
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
		...mapGetters(["itemSubCategories"]),
		option: {
			get() {
				return this.itemSubCategories.filter(
					(v) => v.sub_name.toLowerCase().indexOf(this.search) > -1
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
	watch: {
		categoryID(val) {
			this.GET_SUBCATEGORIES(val);
		},
	},
};
</script>

<style></style>
