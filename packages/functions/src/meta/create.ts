import * as uuid from "uuid";
import { Resource } from "sst";
import { Util } from "@shrimple-kanban/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    let data = null;

    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const { title } = data

    if (!title) {
        throw new Error("title not found.");
    }

    const params = {
        TableName: Resource.Kanban.name,
        Item: {
            prop: `board`,
            adr: `bd#${uuid.v1()}`,
            title
        },
    };

    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify(params.Item);
});