import { db } from "../database/conf.js";

export async function getAllItems() {
    const ids = await db.smembers('items:ids');
    const items = [];
    for (const id of ids) {
        const data = await db.hgetall(`item:${id}`);
        if (Object.keys(data).length > 0) {
            items.push({ id: data.id ?? id, title: data.title ?? '' });
        }
    }
    return items;
}

export async function getItemById(id: string) {
    const data = await db.hgetall(`item:${id}`);
    if (!data || Object.keys(data).length === 0) return null;
    return { id: data.id ?? id, title: data.title ?? '' };
}

export async function createItem(payload: { title: string }) {
    const id = Date.now().toString();
    await db.hset(`item:${id}`, { id, title: payload.title });
    await db.sadd('items:ids', id);
    return { id, title: payload.title };
}


export async function updateItem(id: string, payload: { title: string }) {
    const exists = await db.exists(`item:${id}`);
    if (!exists) return null;
    await db.hset(`item:${id}`, { title: payload.title });
    return { id, title: payload.title };
}

export async function deleteItem(id: string) {
    const deleted = await db.del(`item:${id}`);
    if (deleted) {
        await db.srem('items:ids', id);
        return true;
    }
    return false;
}