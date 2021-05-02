<template>
	<div>
		<div class="content">
			<transition appear enter-active-class="animated fadeOut">
				<keep-alive>
					<component :is="component" />
				</keep-alive>
			</transition>
		</div>
	</div>
</template>
<script>
import tabList from "./list";
import entry from "./entry";
export default {
	name: "Package",
	components: {
		tabList,
		entry,
	},
	data() {
		return {
			tab: "entry",
			activetab: 1,
			loading: true,
			listData: [],
			component: "entry",
		};
	},
	mounted() {
		this.component = "tabList";
		EventBus.$on("entry", (data) => {
			this.component = "entry";
		});
		EventBus.$on("list", (data) => {
			this.component = "tabList";
		});
	},
	methods: {
		process(item) {
			this.activetab = 2;
		},
	},
};
</script>
<style scoped>
.q-tab-panel {
	padding: 0px;
}
</style>
