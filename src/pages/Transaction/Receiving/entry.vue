<template>
	<div class="q-pa-sm">
		<q-form ref="form" autofocus>
			<q-card flat bordered>
				<toolbar title="Receiving Entry" @back="goHome"> </toolbar>
				<div class="row q-pt-md">
					<div class="col-4 col-md-4">
						<q-input
							class="q-pa-none"
							v-model="main.reference"
							readonly
							dense
							label="Ref No."
							:rules="[(v) => !!v || 'Required']"
						/>
					</div>
					<div class="col-4 col-md-4">
						<q-input
							class="q-pa-none"
							v-model="main.date"
							mask="date"
							label="Date"
							dense
							:error="$v.main.date.$error"
						>
							<template v-slot:append>
								<q-icon dense name="event" class="cursor-pointer">
									<q-popup-proxy
										dense
										ref="qDateProxy2"
										transition-show="scale"
										transition-hide="scale"
									>
										<q-date
											color="primary"
											minimal
											v-model="main.date"
											@input="() => $refs.qDateProxy2.hide()"
										/>
									</q-popup-proxy>
								</q-icon>
							</template>
						</q-input>
					</div>
					<div class="col-3 col-md-4">
						<div>
							<q-input
								autofocus
								v-model="main.po_number"
								label="P.O. #"
								dense
							/>
						</div>
					</div>

					<div class="col-12 col-md-12">
						<SelectSupplier
							ref="select_supplier"
							@selected="supplierSelected"
							:disable="disable"
							:selected="main.Vendor_id"
							:rules="[(v) => !!v || 'required']"
						/>
					</div>
					<div class="col-12 col-md-12">
						<q-input
							class="q-pa-none q-pt-sm"
							v-model="main.Address"
							label="Address"
							dense
						/>
					</div>
					<div class="col-12 col-md-4">
						<keep-alive>
							<SelectStorage
								ref="select_storage"
								@selected="storageSelected"
								:selected="main.Storageid"
								:rules="[(v) => !!v || 'required']"
							/>
						</keep-alive>
					</div>
					<div class="col-12 col-md-4">
						<q-input
							v-model="main.DR_Number"
							label="DR #"
							:dense="$q.screen.lt.md"
						/>
					</div>
					<div class="col-12 col-md-4">
						<q-input
							v-model="main.INV_Number"
							label="INV #"
							:dense="$q.screen.lt.md"
						/>
					</div>
					<!-- <div class="col-12 col-md-6">
						<q-input v-model="main.DueDate" mask="date" label="Due Date" dense>
							<template v-slot:append>
								<q-icon dense name="event" class="cursor-pointer">
									<q-popup-proxy
										dense
										ref="qDateProxy1"
										transition-show="scale"
										transition-hide="scale"
									>
										<q-date
											dense
											v-model="main.DueDate"
											@input="() => $refs.qDateProxy1.hide()"
										/>
									</q-popup-proxy>
								</q-icon>
							</template>
						</q-input>
					</div> -->
					<div class="col-12 q-pt-sm">
						<q-table
							title="Items"
							:data="data"
							:columns="columns"
							row-key="name"
						/>
					</div>
					<div class="col-12">
						<q-separator spaced inset vertical dark />
					</div>

					<q-separator />
					<div class="col-12 q-pa-sm">
						<command
							@save="saveData"
							:labelSave="main.id > 0 ? 'Update' : 'Save'"
							@clear="clearData"
						/>
					</div>
					<dlg
						title="Items"
						v-model="dlgItem"
						:showToolBar="true"
						:showCommand="false"
					>
						<items ref="entry" @send="send" />
					</dlg>
				</div>
			</q-card>
		</q-form>
	</div>
</template>
<script>
import EventBus from "./events";
import toolbar from "#/Toolbar";
import command from "#/Command";
import Resource from "src/api/resource";

import items from "#/items";
import dlg from "#/dlg";
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import SelectStorage from "#/selection/SelectStorage";
import SelectSupplier from "#/selection/SelectSupplier";

export default {
	components: {
		toolbar,
		command,
		items,
		dlg,
		SelectSupplier,
		SelectStorage,
	},
	data: () => ({
		text: null,
		dlgItem: false,
		showOpenPo: false,
		productItem: [],
		main: {
			id: 0,
			receiverId: 0,
			date: date.formatDate(new Date().toLocaleString(), "YYYY-MM-DD"),
			reference: null,
			POBatchGUID: null,
			Vendor_id: null,
			Storageid: null,
			addressType: "",
			Address: null,
			DR_Number: null,
			INV_Number: null,
			DueDate: date.formatDate(new Date().toLocaleString(), "YYYY-MM-DD"),
			IsBilled: false,
			po_number: null,
		},
		loading: false,
		disable: false,
		valid: false,
		vendor: [],
	}),
	validations: {
		main: {
			Vendor_id: { required },
			Storageid: { required },
			date: { required },
			reference: { required },
		},
	},
	watch: {
		// "productItem.item_qty"(val) {
		//   alert(val);
		// },
		"main.Vendor_id": {
			handler(newid) {
				if (newid != 0 && newid != null) {
					this.main.Address = "";
					this.main.addressType = "";
					const buz = this.GETSUPPLIER(newid);
					const def = buz.Addresses.filter((x) => x.isDefault == 1);
					if (def.length > 0) {
						this.main.addressType = "";
						this.main.Address = def[0]["full_address"];
						this.main.addressType = def[0]["address_type"];
					} else {
						if (buz.Addresses.length > 0) {
							buz.Addresses.forEach((element) => {
								this.main.Address = element["full_address"];
								this.main.Address = element["address_type"];
							});
						}
					}
				}
			},
		},
	},
	created() {
		this.disable = false;
		EventBus.$on("add", () => {
			this.getRef();
			this.productItem = [];
			this.productItem.push({
				description: null,
				Total: 0,
				price: 0,
				item_qty: 0,
				id: null,
			});
		});
		EventBus.$on("edit", (data) => {
			this.disable = true;
			this.main = data.main[0];
			this.main.IsBilled = data.main[0].IsBilled == 1 ? true : false;
			this.productItem = data.details;
		});
	},
	mounted() {
		this.disable = false;
	},
	methods: {
		changeObserver(item) {
			item.Total = item.item_qty * item.price;
		},
		getPostList(id) {
			this.showOpenPo = !this.showOpenPo;
		},
		supplierSelected(val) {
			try {
				this.main.Vendor_id = val;
			} catch (error) {
				this.$q.loading.hide();
			}
		},
		async select_po(po) {
			try {
				this.showOpenPo = false;
				this.main.po_number = po.poInfo.reference;
				this.main.POBatchGUID = po.poInfo.id;
				this.main.Vendor_id = po.poInfo.supplier_id;
				this.productItem = await [];
				po.items.forEach(async (item) => {
					const data = {
						description: item.description,
						Total: item.Price * 1 * item.Qty,
						price: item.Price * 1,
						item_qty: item.Qty,
						id: item.product_id,
					};
					await this.productItem.push(data);
				});
				this.$q.loading.hide();
			} catch (error) {
				this.$q.loading.hide();
			}
		},
		close_po() {
			this.showOpenPo = false;
		},
		storageSelected(val) {
			this.main.Storageid = val;
			if (val > 0) {
				const d = this.$store.getters.getStorage(val);
				this.main.receiverId = d[0].user_id;
			}
		},
		sumField(key) {
			return this.productItem.reduce(
				(a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
				0
			);
		},
		send(datax) {
			if (datax != null || datax != undefined) {
				const data = {
					description: datax.description,
					Total: datax.qty * datax.po_price * 1,
					price: datax.po_price * 1,
					item_qty: datax.qty,
					id: datax.id,
				};
				this.productItem.push(data);
			}
			const prod = this.products.filter((p) => p.id == datax.container_id);
			if (prod.length > 0) {
				const data = {
					description: prod[0].description,
					Total: datax.qty * prod[0].po_price * 1,
					price: prod[0].po_price * 1,
					item_qty: datax.qty,
					id: prod[0].id,
				};
				this.productItem.push(data);
			}
			this.dlgItem = false;
		},
		removeItem(item) {
			const index = this.productItem.indexOf(item);
			this.productItem.splice(index, 1);
		},
		async getRef() {
			const par = { date: this.main.date };
			const datax = new Resource("Receiving/ref");
			datax
				.list(par)
				.then(({ data }) => {
					this.main.reference = data[0].Ref;
				})
				.catch((err) => {
					console.log(er);
				});
		},
		fixDate(event) {
			return moment(event).format("YYYY-MM-DD hh:mm:ss");
		},
		goHome() {
			this.clearData();
			this.$refs.select_supplier.ClearSearch();
			this.$refs.select_storage.ClearSearch();
			// this.$router.push("Receiving Report");
			EventBus.$emit("list");
		},

		async validate() {
			if (this.main.Storageid == null || this.main.Storageid == "") {
				this.$q.notify({
					position: "top",
					color: "red-5",
					textColor: "white",
					icon: "warning",
					message: "Select storage",
				});
				this.$q.loading.hide();
				return (this.valid = false);
			}
			if (this.main.Vendor_id == null || this.main.Vendor_id == "") {
				this.$q.notify({
					position: "top",
					color: "red-5",
					textColor: "white",
					icon: "warning",
					message: "Select Supplier",
				});
				this.$q.loading.hide();
				return (this.valid = false);
			}
			if (this.main.IsBilled) {
				if (this.main.INV_Number == null || this.main.INV_Number == "") {
					this.$q.notify({
						position: "top",
						color: "red-5",
						textColor: "white",
						icon: "warning",
						message: "Enter Invoice #",
					});
					this.$q.loading.hide();
					return (this.valid = false);
				}
				if (this.main.DueDate == null || this.main.DueDate == "") {
					this.$q.notify({
						position: "top",
						color: "red-5",
						textColor: "white",
						icon: "warning",
						message: "Enter Due Date",
					});
					this.$q.loading.hide();
					return (this.valid = false);
				}
			}
			// if (this.main.po_number == null || this.main.po_number == "") {
			//   this.$q.notify({
			//     position: "top",
			//     color: "red-5",
			//     textColor: "white",
			//     icon: "warning",
			//     message: "Enter PO #"
			//   });
			//   this.$q.loading.hide();
			//   return (this.valid = false);
			// }

			if (this.productItem.length == 0) {
				this.$q.notify({
					position: "top",
					color: "red-5",
					textColor: "white",
					icon: "warning",
					message: "select item(s)",
				});
				this.$q.loading.hide();
				return (this.valid = false);
			}

			this.$v.main.$touch();
			if (this.$v.main.$error) {
				this.$q.notify({
					position: "top",
					color: "red-5",
					textColor: "white",
					icon: "warning",
					message: "You need to fill the required fields",
				});
				this.$q.loading.hide();
				return (this.valid = false);
			} else {
				return (this.valid = true);
			}
		},
		async saveData() {
			let details = [];
			this.productItem.forEach((item) => {
				if (item.id !== null && item.Total > 0) {
					details.push(item);
				}
			});

			if (details.length == 0) {
				this.$q.notify(
					"either item is not selected or total is equal to zero(0)."
				);
				return;
			}

			this.$q.loading.show();
			if (this.main.id === 0) {
				await this.getRef();
			}
			this.validate();
			try {
				if (this.valid) {
					this.main.IsBilled = this.main.IsBilled == true ? 1 : 0;
					const parameter = {
						main: this.main,
						dtls: details,
					};
					const datax = new Resource("Receiving/store");
					await datax
						.store(parameter)
						.then(({ data }) => {
							this.$q.notify(data.Message);
							this.clearData();
							// this.sendNotif();
							EventBus.$emit("refresh", data.data);
							this.$q.loading.hide();
							this.$router.push("Receiving Report");
							// EventBus.$emit("list", data.data);
							// EventBus.$emit("refresh");
						})
						.catch((er) => {
							this.$q.notify("something went wrong");
						});
				}
			} catch (error) {
				this.$q.loading.hide();
				this.$q.notify("error");
			}
		},
		sendNotif() {
			try {
				this.$store.dispatch("global/getAppRR");
				this.$socket.client.emit("on_ApprovedRR");
			} catch (err) {}
		},
		clearData() {
			this.disable = false;
			this.main.date = date.formatDate(
				new Date().toLocaleString(),
				"YYYY-MM-DD"
			);
			this.main.reference = null;
			this.main.Storageid = null;
			this.main.DueDate = date.formatDate(
				new Date().toLocaleString(),
				"YYYY-MM-DD"
			);
			this.main.IsBilled = false;
			this.main.id = 0;
			this.main.Vendor_id = null;
			this.main.Address = null;
			this.main.IsBilled = false;
			this.main.POBatchGUID = null;
			this.main.DR_Number = null;
			this.main.INV_Number = null;
			this.main.po_number = null;
			this.productItem = [];
			this.productItem.push({
				description: null,
				Total: 0,
				price: 0,
				item_qty: 0,
				id: null,
			});
			this.$refs.form.reset();
			this.getRef();
		},
	},
	computed: {
		...mapGetters(["GETSUPPLIERS_ACTIVE", "products", "GETSUPPLIER"]),
	},
};
</script>
<style lang="sass" scoped>
.row > div
  padding-right: 10px
  padding-left: 10px
</style>
