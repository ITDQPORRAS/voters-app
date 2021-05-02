<template>
	<div>
		<skelProfile v-if="showLoading" />
		<q-layout v-if="!showLoading" view="lHh lpR fFf">
			<q-header elevated flat class="bg-white text-grey-8">
				<div class="row">
					<q-toolbar class="col-10 GPLAY__toolbar text-black">
						<q-btn
							flat
							dense
							round
							@click="leftDrawerOpen = !leftDrawerOpen"
							aria-label="Menu"
							icon="menu"
							class="q-mx-md"
							color="primary"
						/>

						<q-avatar>
							<img src="icons/banner.png" />
						</q-avatar>
						<q-toolbar-title>eVoter's Survey</q-toolbar-title>
					</q-toolbar>
					<q-toolbar class="col-2 bg-primary text-white">
						<q-space />
						<q-btn round flat>
							<q-icon name="settings" />
							<q-tooltip>Settings</q-tooltip>
							<q-menu>
								<div class="row no-wrap q-pa-sm">
									<div class="column items-center">
										<q-avatar size="72px">
											<img :src="avatar || this.infox.avatar" />
										</q-avatar>
										<div class="text-caption q-mt-md q-mb-xs text-center">
											{{ this.name || this.infox.name }}
										</div>
										<q-btn
											@click="logout"
											color="primary"
											label="Logout"
											push
											size="sm"
											v-close-popup
										/>
									</div>
								</div>
							</q-menu>
						</q-btn>
					</q-toolbar>
				</div>
			</q-header>
			<q-header v-if="fixedHeader" elevated class="bg-white text-grey-8">
				<q-toolbar class="col-12 bg-white text-white">
					<q-btn
						color="primary"
						dense
						flat
						round
						icon="menu"
						@click="leftDrawerOpen = !leftDrawerOpen"
					/>
					<router-link
						to="/"
						exact
						tag="div"
						class="item item-link drawer-closer cursor-pointer"
					>
						<q-btn flat no-caps no-wrap class="btnpad">
							<div class="text-subtitle1 text-primary">
								Young Builders Corporation
							</div>
						</q-btn>
					</router-link>
					<q-space />
					<div class="q-pl-sm q-gutter-sm row">
						<q-btn
							color="primary"
							dense
							flat
							@click="right = !right"
							icon="group"
						>
							<q-badge color="red" text-color="white" floating>{{
								ActiveList.length
							}}</q-badge>
							<q-tooltip>Online</q-tooltip>
						</q-btn>

						<q-btn color="primary" round flat>
							<q-icon name="settings" />
							<q-tooltip>Settings</q-tooltip>
							<q-menu>
								<div class="row no-wrap q-pa-md">
									<div class="column">
										<div class="text-h6 q-mb-md">Settings</div>
										<q-btn
											class="glossy"
											rounded
											color="primary"
											label="Themes"
											@click="dlgthemes = true"
										/>
										<q-toggle
											:label="`Fixed Header (white background)`"
											v-model="fixedHeader"
										/>
										<q-toggle
											:label="`Dark Mode`"
											v-model="Dark"
											@click="Dark = !Dark"
										/>
									</div>

									<q-separator vertical inset class="q-mx-lg" />

									<div class="column items-center">
										<q-avatar size="72px">
											<img :src="avatar || this.infox.avatar" />
										</q-avatar>

										<div class="text-caption q-mt-md q-mb-xs text-center">
											{{ this.name || this.infox.name }}
										</div>

										<q-btn
											@click="logout"
											color="primary"
											label="Logout"
											push
											size="sm"
											v-close-popup
										/>
									</div>
								</div>
							</q-menu>
						</q-btn>
					</div>
				</q-toolbar>
			</q-header>
			<q-drawer v-model="leftDrawerOpen" show-if-above bordered elevated>
				<!-- <q-pull-to-refresh @refresh="refresh"> -->
				<div class="absolute-top" style="height: 130px">
					<div class="row">
						<div class="col-10 absolute-bottom bg-transparent q-pa-sm">
							<q-avatar size="56px" class="q-mb-sm">
								<img :src="avatar || this.infox.avatar" />
							</q-avatar>
							<div class="text-subtitle1" @click="profile = true">
								{{ this.name || this.infox.name }}
							</div>
						</div>
					</div>
				</div>
				<q-scroll-area
					style="
						height: calc(95% - 130px);
						margin-top: 130px;
						border-right: 1px solid #ddd;
					"
				>
					<q-list>
						<div class="bg-primary text-white"></div>
						<q-separator />
						<q-expansion-item
							group="somegroup"
							v-for="(item, i) in Menux"
							:key="i"
							color="negative"
							expand-separator
							v-show="item.meta.hidden !== true && item.children.length > 0"
							:default-opened="item.meta.open"
						>
							<template v-slot:header>
								<q-item-section avatar>
									<q-icon color="primary" :name="item.meta.icon" />
								</q-item-section>
								<q-item-section class="q-pl-sm">{{
									item.meta.title
								}}</q-item-section>
							</template>
							<q-list
								v-for="(child, c) in item.children"
								:key="c"
								class="q-pl-md"
							>
								<router-link
									:to="child.path"
									exact
									tag="div"
									class="item item-link drawer-closer cursor-pointer"
								>
									<q-item
										clickable
										v-ripple
										:header-inset-level="1"
										active-class="my-menu-link"
										:active="link === child.meta.title"
										@click="link = child.meta.title"
									>
										<q-item-section avatar>
											<q-icon color="primary" :name="child.meta.icon" />
										</q-item-section>
										<q-item-section>{{ child.meta.title }}</q-item-section>
									</q-item>
								</router-link>
							</q-list>
						</q-expansion-item>
					</q-list>
				</q-scroll-area>

				<div class="absolute-bottom">
					<q-separator />
					<q-banner v-if="fixedHeader" dense inline-actions class="text-center">
						Ⓒ 2020
					</q-banner>
					<q-banner v-else dense inline-actions class="text-center">
						Ⓒ 2020
					</q-banner>
				</div>
				<!-- </q-pull-to-refresh> -->
			</q-drawer>

			<q-page-container>
				<transition
					appear
					enter-active-class="animated fadeIn"
					leave-active-class="animated fadeOut"
				>
					<router-view />
				</transition>
			</q-page-container>
			<q-dlg v-model="profile" :showCommand="false">
				<info ref="info" :user_id="userId" :infos="infos" />
			</q-dlg>
			<!-- <q-dlg v-model="dlgthemes" title="Themes" :showCommand="false">
				<themes ref="themes" />
			</q-dlg> -->
		</q-layout>
	</div>
</template>

<script>
import info from "@/components/Profile";
import { mapGetters } from "vuex";
import { asyncRoutes } from "@/router";
import { getInfo } from "src/utils/auth";
import store from "src/store";
import Resource from "@/api/resource";
import skelProfile from "#/q-skeleton/profile";
import { Dark } from "quasar";
export default {
	name: "MainLayout",
	components: { skelProfile, info },
	data() {
		return {
			showLoading: false,
			fixedHeader: this.$q.localStorage.getItem("fixedHeader") || false,
			dlgthemes: false,
			profile: false,
			loading: false,
			infos: [],
			link: "",
			showChat: false,
			filter: "",
			search: "",
			routeNames: "",
			tab: "home",
			right: false,
			leftDrawerOpen: !this.$q.platform.is.mobile,
			routess: [],
			ModuleName: [],
			ModuleGroup: this.$q.localStorage.getItem("ModuleGroup") || [],
			userlist: [],
			title: this.$q.localStorage.getItem("ModuleGroupTitle") || "Modules",
			form: {
				name: null,
				email: null,
				old: null,
				new: null,
				newcon: null,
				id: null,
			},
			islogin: "",
			routers: [],
			finalRouter: [],
			newRoute: [],
			infox: getInfo() || [],
			Dark: false,
			Menux: [],
		};
	},
	async mounted() {
		this.showLoading = true;
		this.$router.addRoutes(asyncRoutes);
		this.loadRoutes();
	},
	methods: {
		async refresh(done) {
			this.loadRoutes();
			this.ModuleGroup = this.$q.localStorage.getItem("ModuleGroup") || [];
			this.showMenu();
			await this.chechAuth()
				.then(() => {
					this.islogin = this.userId;
					this.showLoading = false;
				})
				.catch(() => {
					this.showLoading = false;
				});

			done();
		},
		loadRoutes() {
			this.newRoute = JSON.parse(JSON.stringify(asyncRoutes));
			// console.log(this.newRoute);
			this.newRoute.forEach((element) => {
				element.children.forEach((el) => {
					console.log(el.children.length);
					let i = 0;
					for (i = 0; i < el.children.length; ++i) {
						if (this.checkAccess(el.children[i]["path"]) === false) {
							el.children.splice(i, 1);
							--i;
						}
					}
				});
			});
			this.ModuleName = [];
			this.newRoute.forEach((element) => {
				let count = 0;
				element.children.forEach((el) => {
					el.children.forEach((el) => {
						count += 1;
					});
				});
				if (count > 0) {
					this.ModuleName.push(element.meta);
				}
			});
		},
		async chechAuth() {
			await this.$store
				.dispatch("user/access")
				.then(async (res) => {
					if (!hasToken) {
						this.$router.push("/login");
					} else {
						try {
							await this.$store.dispatch("user/getInfo");
							this.showLoaded();
						} catch (error) {}
					}
				})
				.catch(() => {});
		},
		async setLogout(email) {
			await new Resource("userMonitoring/logout").get(email);
		},
		async getUsers() {
			const { data } = await new Resource("userMonitoring/users").list();
			this.userlist = data;
		},
		async showLoaded() {
			this.setProfile();
		},
		async logout() {
			this.$q.loading.show();
			this.$store.dispatch("user/logout");
			this.$router.push(`/login`);
			this.$q.loading.hide();
			this.$q.localStorage.remove("ModuleGroup");
			this.$q.localStorage.remove("ModuleGroupTitle");
			this.$q.localStorage.remove("router");
			this.$q.localStorage.remove("routes");
			this.$socket.client.emit("out", this.userName);
		},
		showMenu() {
			this.Menux = this.newRoute.find(
				(x) => x.meta.title === "WareHouse"
			).children;
			this.ModuleGroup = this.newRoute.find(
				(x) => x.meta.title === "WareHouse"
			);
			this.$q.localStorage.set("ModuleGroup", this.ModuleGroup);

			// this.update_route();
		},
		async setProfile() {},

		async saveInfo() {
			try {
				this.loading = true;
				const { data } = await new Resource("profileUpdate").store(
					this.$refs.info.getData()
				);
				this.loading = false;
				this.$message({ message: data.Message, type: data.status });
				this.setProfile();
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async update_route() {
			let content = [];
			console.log(asyncRoutes);
			asyncRoutes.forEach((element) => {
				// this.ModuleName.push(element.meta);
				let modules = element.meta;
				let grouping = "";
				element.children.forEach((el) => {
					grouping = el.name;
					el.children.forEach((ch) => {
						if (ch.meta.access) {
							if (ch.meta.access.length > 0) {
								ch.meta.access.forEach((access) => {
									const y = {
										module: modules.title,
										grouping: grouping,
										form_name: ch.meta.title,
										file_route: ch.path,
										access: access,
									};
									content.push(y);
								});
							}
						}
					});
				});
			});
			this.$q.localStorage.set("router", content);
			this.routers = content;
			const datax = new Resource("Access/insertform");
			const par = { main: content };
			await datax.store(par).then(() => {});
		},
		checkAccess(path) {
			if (this.isAdmin || 0 == 1) {
				return true;
			}
			let data = this.initiate.find((el) => el["file_route"] === path);
			if (data) {
				console.log("ok " + path);
				return true;
			} else {
				console.log("not ok " + path);
				return false;
			}
		},
		onProfile() {
			this.$router.push("/profile");
		},
		onHome() {
			this.$router.push("/");
		},
	},
	watch: {
		islogin: {
			async handler(newVal) {
				// alert(newVal);
				// this.loadRoutes();
				if (!newVal) {
					await store.dispatch("user/getInfo");
					this.showLoaded();
					this.form.name = name;
					this.form.email = name;
					this.$socket.client.emit("join", { email: this.userName });
					this.loadRoutes();
				}
				if (newVal > 0) {
					await store.dispatch("user/getInfo");
					this.showLoaded();
					this.form.name = name;
					this.form.email = name;
					this.$socket.client.emit("join", { email: this.userName });
					this.loadRoutes();
				}
			},
			immediate: true,
		},
		fixedHeader(val) {
			this.$q.localStorage.set("fixedHeader", val);
		},
		Dark(val) {
			Dark.set(val);
		},
	},
	async created() {
		await this.chechAuth()
			.then(() => {
				this.loadRoutes();
				this.showMenu();
				this.islogin = this.userId;
				this.showLoading = false;
			})
			.catch(() => {
				this.showLoading = false;
			});

		// alert("creaded");
		window.addEventListener(
			"beforeunload",
			async () => {
				this.$socket.client.emit("out", this.userName);
				await this.$store.dispatch("user/logout");
			},
			false
		);
	},
	computed: {
		...mapGetters([
			"sidebar",
			"name",
			"avatar",
			"device",
			"userId",
			"userName",
			"access",
			"isAdmin",
		]),

		initiate() {
			let datax = this.$q.localStorage.getItem("routes") || [];
			return datax.filter((x) => {
				return x.access === "initiate";
			});
		},
		ActiveList() {
			return this.userlist.filter((x) => {
				return x.isLogin === "1";
			});
		},
	},
};
</script>

<style scoped>
.mybanner {
	background: linear-gradient(145deg, #1976d2 11%, #0f477e 75%);
}
.my-menu-link {
	color: black;
	background: #eaeef1;
	border-top-left-radius: 0px;
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 0px;
}
.GPLAY__toolbar {
	height: 30px;
}
.GPLAY__logo {
	width: 120px;
	height: 30px;
}
.GPL__toolbar-input {
	width: 35%;
}
</style>
