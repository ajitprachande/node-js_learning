import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

const authorTable = pgTable("authors", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 55 }).notNull(),
    email: varchar({ length: 55 }).unique().notNull(),
});

export default authorTable;