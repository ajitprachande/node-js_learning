
import { error } from 'node:console';
import { db } from '../db/index.js';
import { urlsTable } from '../models/index.js';
import { and, eq } from 'drizzle-orm';

export async function createUrl(url, shortCode, userId) {

    const existingShortcode = await db.select().from(urlsTable).where(eq(urlsTable.shortCode, shortCode));

    if (existingShortcode.length > 0) {
        return { error: `ShortCode already exists` }
    }
    const [result] = await db.insert(urlsTable).values({
        shortCode,
        targetUrl: url,
        userId: userId
    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
    });
    return result;
}

export async function getUserUrls(userId) {
    const result = await db.select({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
        userId: urlsTable.userId
    }).from(urlsTable).where(eq(urlsTable.userId, userId));

    return result;
}

export async function getTargetUrl(code) {

    const [result] = await db.select({
        targetUrl: urlsTable.targetUrl,
        userId: urlsTable.userId
    }).from(urlsTable).where(eq(urlsTable.shortCode, code));

    if (!result) {
        return { error: `ShortCode doesn't Exist.` }
    }
    return result;
}

export async function deleteShortcode(urlId, userId) {

    const [result] = await db
        .delete(urlsTable)
        .where(and( eq(urlsTable.id, urlId), eq(urlsTable.userId, userId)))
        .returning({
            id: urlsTable.id,
            code: urlsTable.shortCode
        });

    if (!result) {
        return { error: `Id Doesn't Exist.` };
    }
    return result;
}