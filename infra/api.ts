import { table } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  // cors: {
  //   allowMethods: ["GET", "POST"],
  //   allowOrigins: ["https://example.com"]
  // },
  // tbu
  // https://guide.sst.dev/chapters/handle-cors-in-serverless-apis.html
  transform: {
    route: {
      handler: {
        link: [table],
      },
    }
  }
});

api.route("POST /boards", "packages/functions/src/boards/create.main");
api.route("GET /boards/{adr}", "packages/functions/src/boards/get.main");
api.route("GET /boards", "packages/functions/src/boards/list.main");// filter the fields
api.route("PUT /boards/{adr}", "packages/functions/src/boards/update.main");
api.route("DELETE /boards/{adr}", "packages/functions/src/boards/delete.main");

api.route("POST /meta", "packages/functions/src/meta/create.main");
api.route("GET /meta", "packages/functions/src/meta/list.main");
api.route("PUT /meta/{adr}", "packages/functions/src/meta/update.main");
api.route("DELETE /meta/{adr}", "packages/functions/src/meta/delete.main");