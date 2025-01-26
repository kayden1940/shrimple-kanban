/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "shrimple-kanban",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/storage");
    await import("./infra/api");
    await import("./infra/web");
  },
});
// sst secret set Password h407 --stage=production
// tsc -b && 