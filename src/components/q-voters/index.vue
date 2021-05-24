<template>
	<div>
		<q-dialog
			v-model="show"
			:maximized="full === true ? true : $q.platform.is.mobile"
			:full-height="full === true ? true : $q.platform.is.mobile"
			:full-width="full === true ? true : $q.platform.is.mobile"
			persistent
			transition-show="slide-left"
			transition-hide="slide-right"
		>
			<q-card
				class="col-12"
				v-bind:style="$q.platform.is.mobile ? '' : 'width:600px'"
			>
				<toolbarx
					v-show="showToolBar"
					title="Household Profile"
					@back="show = false"
				/>
				<q-card-section style="max-height: 100vh" class="scroll">
					<q-table
						:data="datax"
						:columns="columns"
						:pagination.sync="pagination"
						:loading="loading"
						@request="onRequest"
						binary-state-sort
						row-key="id"
						dense
						flat
						@row-click="onRowClick"
					>
						<template v-slot:body-cell-lastName="props">
							<q-td :props="props"
								>{{ props.row.lastName }} {{ props.row.suffix }}</q-td
							>
						</template>
						<template v-slot:header-cell-client_guid="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.client_guid"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-Barangay="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.Barangay"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-rep_address="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.rep_address"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-firstName="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.firstName"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-middleName="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.middleName"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-lastName="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.lastName"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-age="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.age"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-member_type="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.member_type"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-groups="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.groups"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
					</q-table>
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import Resource from "src/api/resource";
import toolbarx from "#/Toolbar";
export default {
	components: { toolbarx },
	props: {
		value: Boolean,
		title: { type: String, default: null },
		showCommand: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: false,
		},
		showToolBar: {
			type: Boolean,
			default: true,
		},
		full: { type: Boolean, default: false },
	},
	data() {
		return {
			datax: [],
			loading: false,
			pagination: {
				sortBy: "brgy_name",
				descending: false,
				page: 1,
				rowsPerPage: 20,
				rowsNumber: 15,
			},
			listHeader: {
				client_guid: "",
				Barangay: "",
				rep_address: "",
				firstName: "",
				middleName: "",
				lastName: "",
				age: "",
				member_type: "",
				groups: "",
			},
			columns: [
				{
					name: "barangay",
					label: "Barangay",
					field: "barangay",
					align: "left",
					// sortable: true,
				},
				{
					name: "lastname",
					label: "last Name",
					field: "lastname",
					align: "left",
					// sortable: true,
				},

				{
					name: "firstName",
					label: "First name",
					field: "firstname",
					align: "left",
					// sortable: true,
				},
				{
					name: "middlename",
					label: "Middle name",
					field: "middlename",
					align: "left",
					// sortable: true,
				},
				{
					name: "lastName",
					label: "last name",
					field: "lastName",
					align: "left",
					// sortable: true,
				},
			],
			count: 0,
			countDown: 3,
		};
	},
	methods: {
		async onRequest(props) {
			if (this.countDown == 0) {
				this.loading = true;
				const { page, rowsPerPage, sortBy, descending } = props.pagination;
				const filter = this.listHeader;
				this.pagination.rowsNumber = 0;
				// this.pagination.rowsNumber = this.count;
				const fetchCount =
					rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
				const startRow = (page - 1) * rowsPerPage;
				const returnedData = await this.fetchFromServer(
					startRow,
					fetchCount,
					filter,
					sortBy,
					descending
				);
				this.loading = false;
				this.datax = returnedData;
				this.pagination.page = page;
				this.pagination.rowsPerPage = rowsPerPage;
				this.pagination.sortBy = sortBy;
				this.pagination.descending = descending;
			}
		},
		async fetchFromServer(startRow, count, filter, sortBy, descending) {
			const par = {
				startRow: startRow,
				count: count,
				filter: filter,
				sortBy: sortBy,
				descending: descending,
				type: this.type,
			};
			const { data } = await new Resource("Voters/show").list(par);
			return data;
		},
		async getRowsNumberCount(filter) {
			const par = {
				filter: filter,
				type: this.type,
			};
			const { data } = await new Resource("Voters/showCount").list(par);
			return data[0].count;
		},
		countDownTimer() {
			if (this.countDown > 0) {
				setTimeout(() => {
					this.countDown -= 1;
					this.countDownTimer();
				}, 1000);
			}
		},
		onRowClick(evt, row) {
			this.$emit("selected", row);
		},
	},
	watch: {
		listHeader: {
			handler(val) {
				this.countDown = 3;
				this.countDownTimer();
			},
			deep: true,
		},
		countDown(val) {
			if (val == 0) {
				const par = {
					pagination: this.pagination,
					filters: this.listHeader,
				};
				this.onRequest(par);
			}
		},
		populations: {
			handler(newVal, OldVal) {
				this.populationOld = OldVal;
			},
			deep: true,
		},
	},
	mounted() {
		this.countDownTimer();
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