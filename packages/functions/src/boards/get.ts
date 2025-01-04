import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {

    const params = {
        TableName: Resource.Kanban.name,
        Key: {
            prop: 'board',
            adr: event?.pathParameters?.adr,
        },
    };

    const result = await dynamoDb.send(new GetCommand(params));
    if (!result.Item) {
        throw new Error("Item not found.");
    }

    // Return the retrieved item
    return JSON.stringify(result.Item);
});