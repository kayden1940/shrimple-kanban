// export const bucket = new sst.aws.Bucket("MyBucket");

export const table = new sst.aws.Dynamo("Kanban", {
    fields: {
        bid: "string",   // Board ID
        id: "string",    // Column, Card, or metadata
        // title: "string", // Title of the column, card or board
        // //@ts-expect-error
        // columns: "sets", // Set of column IDs
        // //@ts-expect-error
        // hcolumns: "sets", // Set of hidden column IDs
        // //@ts-expect-error
        // cards: "sets",   // Set of card IDs
        // color: "number", // Color code for cards
    },
    primaryIndex: { hashKey: "bid", rangeKey: "id" },  // Partition and sort key configuration
});
