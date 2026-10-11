import { ne } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
  
    firstname: varchar('first_name', { length: 55 }).notNull(),
    lastname: varchar('last_name', { length: 55 }),
  
    email: varchar({ length: 255}).unique().notNull(),
  
    password: text('Hashed_password').notNull(),
    salt: text().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),  
});