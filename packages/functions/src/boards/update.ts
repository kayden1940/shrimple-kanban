import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {

    const data = JSON.parse(event.body || "{}")
    const { pathParameters } = event
    if (!pathParameters?.adr) return JSON.stringify({ status: false });
    const { adr } = pathParameters
    const { columnsR, statusR, title } = data
    let params
    if (columnsR) {
        params = {
            TableName: Resource.Kanban.name,
            Key: {
                prop: "board",
                adr: String(adr).replace("--", "#"),
            },
            UpdateExpression: `SET columnsR = :columnsR, lastUpdated = :lastUpdated`,
            ExpressionAttributeValues: {
                ":columnsR": data.columnsR || null,
                ":lastUpdated": new Date().toISOString()
            },
        };
    }
    if (statusR || title) {
        params = {
            TableName: Resource.Kanban.name,
            Key: {
                prop: "board",
                adr: String(adr).replace("--", "#"),
            },
            UpdateExpression: `SET statusR = :statusR, title = :title, lastUpdated = :lastUpdated`,
            ExpressionAttributeValues: {
                ":statusR": data.statusR || null,
                ":title": data.title || null,
                ":lastUpdated": new Date().toISOString()
            },
        };
    }

    if (!params) return JSON.stringify({ status: false });
    await dynamoDb.send(new UpdateCommand(params));
    return JSON.stringify({ status: true });
});