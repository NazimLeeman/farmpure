import { environment as env } from "src/environments/environment";

export const cfImageURL = (id: string) =>
	`https://imagedelivery.net/${env.cloudflare.accountHash}/${id}/public`;
