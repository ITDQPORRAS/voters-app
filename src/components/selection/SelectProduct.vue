<template>
	<div>
		<q-select
			class="q-pa-none"
			v-model="optionModel"
			:options="option"
			option-value="id"
			option-label="description"
			:label="optionLabel"
			dense
			emit-value
			:readonly="readonly"
			map-options
			use-input
			input-debounce="0"
			@filter="filterQSelect"
			:rules="rules"
		>
			<!-- :error="$v.main.Vendor_id.$error" -->

			<template v-slot:before-options>
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
			</template>
		</q-select>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	props: {
		optionLabel: { type: String, default: "Product" },
		selected: [String, Number],
		position: [Number],
		readonly: { type: Boolean, default: false },
		rules: Array,
	},
	data() {
		return {
			dlgEntry: false,
			search: "",
		};
	},
	methods: {
		...mapActions(["getProductInfo"]),
		async getData() {
			try {
				await this.getProductInfo();
			} catch (error) {
				console.log(error);
			}
		},
		getProduct(product_id) {
			return this.products.filter(
				(v) => v.id == product_id && v.status == "Active"
			);
		},
		getPartnerContainer(container_id) {
			return this.products.filter(
				(v) => v.id == container_id && v.status == "Active"
			);
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
		...mapGetters(["products"]),
		option: {
			get() {
				return this.products.filter(
					(v) =>
						v.description.toLowerCase().indexOf(this.search) > -1 &&
						v.status == "Active"
				);
			},
		},
		optionModel: {
			get() {
				return this.selected;
			},
			set(v) {
				this.search = "";
				var product = this.getProduct(v);
				// var partner_container = this.getPartnerContainer(v);
				this.$emit("selected", {
					product: product,
					position: this.position,
				});
			},
		},
	},
};
</script>

<style></style>
