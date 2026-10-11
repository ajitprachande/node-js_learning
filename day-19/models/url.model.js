import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { userTable } from './user.model.js';


export const urlsTable = pgTable('urls', {

    id: uuid().primaryKey().defaultRandom(),

    shortCode: varchar('code', { length: 155 }).notNull().unique(),
    targetUrl: text().notNull(),
    
    userId: uuid('user_id').references(() => userTable.id).notNull(),


    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

});