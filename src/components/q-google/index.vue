<template>
	<g-signin-button
		:params="googleSignInParams"
		@success="onSignInSuccess"
		@error="onSignInError"
	>
		Sign in with Google
	</g-signin-button>
</template>

<script>
export default {
	data() {
		return {
			/**
			 * The Auth2 parameters, as seen on
			 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
			 * As the very least, a valid client_id must present.
			 * @type {Object}
			 */
			googleSignInParams: {
				clientId:
					"990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com",
			},
		};
	},
	methods: {
		onSignInSuccess(googleUser) {
			alert("success");
			// `googleUser` is the GoogleUser object that represents the just-signed-in user.
			// See https://developers.google.com/identity/sign-in/web/reference#users
			const profile = googleUser.getBasicProfile(); // etc etc
		},
		onSignInError(error) {
			alert("error");
			// `error` contains any error occurred.
			console.log("OH NOES", error);
		},
	},
};
</script>

<style>
.g-signin-button {
	/* This is where you control how the button looks. Be creative! */
	display: inline-block;
	padding: 4px 8px;
	border-radius: 3px;
	background-color: #3c82f7;
	color: #fff;
	box-shadow: 0 3px 0 #0f69ff;
}
</style>