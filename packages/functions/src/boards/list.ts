import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params = {
        TableName: Resource.Kanban.name,
        "KeyConditionExpression": "prop = :prop",
        "ExpressionAttributeValues": {
            ":prop": "board"
        }
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    // Return the matching list of items in response body
    return JSON.stringify(result.Items);
});