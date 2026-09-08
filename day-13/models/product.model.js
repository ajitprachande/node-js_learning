// db schema:
const { pgTable, uuid, varchar, integer, text, index } = require('drizzle-orm/pg-core');
const { sql } = require('drizzle-orm');

const brandTable = require('./brand.model.js');
const { table } = require('node:console');

const productTable = pgTable("products", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 100 }).notNull(),
    price: integer().notNull(),
    description: text(),
    brandId: uuid().references(() => brandTable.id).notNull(),
}, (table) => ({
    searchIndexOnName: index('product_name_index')
        .using(
            'gin',
            sql`to_tsvector('english', ${table.name})`
        ),
    searchIndexOnPrice: index('product_price_index')
        .on(table.price),
})
);

module.exports = productTable;
