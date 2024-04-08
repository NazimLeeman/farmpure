import { environment } from "@env";
import { UserManagerSettings } from "oidc-client-ts";

export const oidcConfig: UserManagerSettings = environment.oidcConfig;
