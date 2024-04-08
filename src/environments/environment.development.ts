export const environment = {
	api: "https://api-3592ecc12fb0.asia-southeast1.edgeflare.dev",
	oidcConfig: {
		authority: "https://iam-3592ecc12fb0.asia-southeast1.edgeflare.dev",
		client_id: "261857785778602529@farmos",
		redirect_uri: "http://localhost:4200/signin/callback",
		response_type: "code",
		scope: "openid profile email",
		post_logout_redirect_uri: "http://localhost:4200",
		automaticSilentRenew: true,
		silentRequestTimeoutInSeconds: 30,
		// silent_redirect_uri: "http://localhost:4200/src/assets/silent-refresh.html",
	},
  mqtt: {
		hostname: "mqtt-3592ecc12fb0.asia-southeast1.edgeflare.dev",
		port: 443,
		path: "/mqtt",
		protocol: "wss",
		username: "public",
		password: "public",
	},
	cloudflare: {
		imageUploadUrl: "https://img.edgeflare.workers.dev",
		accountHash: "JANQz1aoc0j0z4-hBEPBbg",
	},
	// configURL: `http://localhost:8080/config.json`,
	// adminAPI: "https://admin-3592ecc12fb0.asia-southeast1.edgeflare.dev",
};
