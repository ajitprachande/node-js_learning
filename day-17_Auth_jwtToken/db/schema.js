import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN'])

export const userTable = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    role: userRoleEnum().notNull().default('USER'),
    password: text().notNull(),
    salt: text().notNull(),
    registeredAt: timestamp().defaultNow().notNull(),

    //bydefault it is false; when user login success it gets "true":
    isverified: boolean().default(false).notNull(),
});