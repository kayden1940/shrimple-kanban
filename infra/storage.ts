// export const bucket = new sst.aws.Bucket("MyBucket");

export const table = new sst.aws.Dynamo("Kanban", {
    fields: {
        prop: "string",   // board, meta
        adr: "string",    // bd#1/cn#1, bd#1/cd#1, bd#1/md#
        // title: "string", // Title of the column, card or board
        // //@ts-expect-error
        // columns: "sets", // Set of column IDs
        // //@ts-expect-error
        // hcolumns: "sets", // Set of hidden column IDs
        // //@ts-expect-error
        // cards: "sets",   // Set of card IDs
        // color: "number", // Color code for cards
        // data:
    },
    primaryIndex: { hashKey: "prop", rangeKey: "adr" },  // Partition and sort key configuration
});
