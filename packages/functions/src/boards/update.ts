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

    if (data.status) {

    }

    const params = {
        TableName: Resource.Kanban.name,
        Key: {
            // The attributes of the item to be created
            prop: "board",
            adr: String(adr).replace("--", "#"),
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        // UpdateExpression: "SET columns = :columns, status = :status, title = :title",
        // ${data.status && `, statusR = :statusR`}${data.title && `, title = :title`}
        UpdateExpression: `SET columnsR = :columnsR`,
        ExpressionAttributeValues: {
            ":columnsR": data.columns || null,
            // ":statusR": data.status || null,
            // ":title": data.title || null,
        },
    };

    await dynamoDb.send(new UpdateCommand(params));

    return JSON.stringify({ status: true });
});