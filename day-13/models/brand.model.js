const { pgTable, uuid, varchar } = require('drizzle-orm/pg-core');

const brandTable = pgTable("brands", {
    id: uuid().primaryKey().defaultRandom(),
    brandName: varchar({ length: 55 }).notNull(),
    supportEmail: varchar({ length: 55 }).notNull().unique(),
});
module.exports = brandTable;