import { api } from "./api";
import { secret } from "./storage";
// import { userPool, identityPool, userPoolClient } from "./auth";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("Frontend", {
    path: "packages/frontend",
    build: {
        output: "dist",
        command: "npm run build",
    },
    // link: [secret],
    environment: {
        VITE_REGION: region,
        VITE_API_URL: api.url,
        VITE_PASSWORD: secret.value
        // VITE_BUCKET: bucket.name,
        // VITE_USER_POOL_ID: userPool.id,
        // VITE_IDENTITY_POOL_ID: identityPool.id,
        // VITE_USER_POOL_CLIENT_ID: userPoolClient.id,
    },
});