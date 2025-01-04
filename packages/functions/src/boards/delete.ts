import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params = {
        TableName: Resource.Kanban.name,
        Key: {
            prop: "board", // The id of the author
            adr: event?.pathParameters?.adr, // The id of the note from the path
        },
    };

    await dynamoDb.send(new DeleteCommand(params));

    return JSON.stringify({ status: true });
});