<template>
	<div>
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
		</q-table>
	</div>
</template>
<script>
import Resource from "src/api/resource";
export default {
	data() {
		return {
			datax: [],
			loading: false,
			pagination: {
				sortBy: "brgy_name",
				descending: false,
				page: 1,
				rowsPerPage: 15,
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
			},
			columns: [
				{
					name: "client_guid",
					label: "HH No.",
					field: "client_guid",
					align: "left",
					// sortable: true,
				},
				{
					name: "Barangay",
					label: "Barangay",
					field: "brgy_name",
					align: "left",
					// sortable: true,
				},
				{
					name: "rep_address",
					label: "Purok",
					field: "rep_address",
					align: "left",
					// sortable: true,
				},

				{
					name: "firstName",
					label: "First name",
					field: "firstName",
					align: "left",
					// sortable: true,
				},
				{
					name: "middleName",
					label: "Middle name",
					field: "middleName",
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
				{
					name: "age",
					label: "Age",
					field: "age",
					align: "left",
					// sortable: true,
				},
				{
					name: "member_type",
					label: "Position",
					field: "member_type",
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
				this.pagination.rowsNumber = await this.getRowsNumberCount(filter);
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
			const { data } = await new Resource("Dashboard/showPopulationList").list(
				par
			);
			return data;
		},
		async getRowsNumberCount(filter) {
			const par = {
				filter: filter,
				type: this.type,
			};
			const { data } = await new Resource("Dashboard/showPopulationCount").list(
				par
			);
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
};
</script>