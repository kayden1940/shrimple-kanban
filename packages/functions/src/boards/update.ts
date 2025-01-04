import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const data = JSON.parse(event.body || "{}");

    const params = {
        TableName: Resource.Kanban.name,
        Key: {
            // The attributes of the item to be created
            prop: "board",
            adr: event?.pathParameters?.adr,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET content = :content",
        ExpressionAttributeValues: {
            ":content": data.content || null,
        },
    };

    await dynamoDb.send(new UpdateCommand(params));

    return JSON.stringify({ status: true });
});