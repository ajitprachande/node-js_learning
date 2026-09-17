import { pgTable, uuid, varchar, text, timestamp} from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    password: text().notNull(),
    salt: text().notNull(),
});

export const userSessions = pgTable('uesr_sessions', {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid().references(() =>  userTable.id).notNull(),       //FOREIGN KEY
    createdAt: timestamp().defaultNow().notNull(),

});
