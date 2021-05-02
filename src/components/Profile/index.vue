<template>
	<div>
		<q-card>
			<div class="row">
				<div class="col-sm-4 col-md-4">
					<div class="row">
						<div class="col-sm-12">
							<image-cropper
								v-show="imagecropperShow"
								:key="imagecropperKey"
								:width="100"
								:height="100"
								url="porfileUpload"
								lang-type="en"
								@close="close"
								@crop-upload-success="cropSuccess"
							/>
						</div>
						<div class="col-sm-12">
							<pan-thumb :image="avatar" />
							<q-btn
								icon="upload"
								style="position: absolute; bottom: 15px; margin-left: 40px"
								@click="imagecropperShow = true"
								>Change Avatar</q-btn
							>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<q-list>
						<q-item>
							<div class="row"></div>
						</q-item>
					</q-list>
				</div>
			</div>
		</q-card>
	</div>
</template>
<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { mapGetters } from "vuex";
export default {
	name: "AvatarUploadDemo",
	components: { ImageCropper, PanThumb },
	data() {
		return {
			imagecropperShow: false,
			imagecropperKey: 0,
		};
	},
	created() {
		this.image = this.avatar;
	},
	methods: {
		cropSuccess(resData) {
			this.$store.dispatch("user/getInfo");
			this.imagecropperShow = false;
			this.imagecropperKey = this.imagecropperKey + 1;
		},
		close() {
			this.imagecropperShow = false;
		},
	},
	computed: {
		...mapGetters(["avatar"]),
	},
};
</script>

<style scoped>
.avatar {
	width: 200px;
	height: 200px;
	border-radius: 50%;
}
</style>
