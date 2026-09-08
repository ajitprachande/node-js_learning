import { integer, pgTable, text, uuid, varchar, index } from 'drizzle-orm/pg-core';
import authorTable from './author.model.js';
// import { Tab } from 'bootstrap';
import { table } from 'node:console';
import { sql } from 'drizzle-orm';
// import { from } from 'node:stream/iter';

const bookTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 55 }).notNull(),
    description: text().notNull(),
    price: integer().notNull(),
    authorId: uuid().references(() => authorTable.id).notNull(),
}, (table) => ({
    SearchIndexOnTitle: index('title_index').using('gin', sql`to_tsvector('english', ${table.title})`),

    SearchIndexOnPrice: index('price_index').using('gin', sql`to_tsvector('english', ${table.price})`),
    
})
);


export default bookTable;
