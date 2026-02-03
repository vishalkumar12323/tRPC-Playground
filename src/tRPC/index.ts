import { router, publicProcedure } from './trpc.js';
import { z } from "zod";
import { ItemResponseOutput } from "../models/item.model.js"
import {
    getAllItems as redisGetAll,
    createItem as redisCreate,
    getItemById as redisGetById,
    updateItem as redisUpdate,
    deleteItem as redisDelete
} from "../handlers/handlers.js"

export const appRouter = router({
    getAllItems: publicProcedure
        .input(z.undefined())
        .output(ItemResponseOutput)
        .query(async () => {
            const items = await redisGetAll();
            return {
                items
            }
        }),

    createItem: publicProcedure
        .input(z.object({ title: z.string() }))
        .output(z.object({
            id: z.string().optional(),
            title: z.string()
        }))
        .mutation(async (options) => {
            const { input } = options;
            const item = await redisCreate(input);
            return item;
        }),
    getItemById: publicProcedure
        .input(z.object({ itemId: z.string() }))
        .output(z.object({ id: z.string(), title: z.string() }))
        // @ts-ignore
        .query(async (options) => {
            const { input } = options;
            return await redisGetById(input.itemId);
        }),

    updateItem: publicProcedure
        .input(z.object({ itemId: z.string(), title: z.string() }))
        .output(z.object({ id: z.string(), title: z.string() }))
        .mutation(async (options) => {
            const { input } = options;
            const item = await redisUpdate(input.itemId, { title: input.title });
            return {
                id: item?.id || input.itemId,
                title: item?.title || ''
            }
        }),
    deleteItem: publicProcedure
        .input(z.object({ itemId: z.string() }))
        .output(z.object({ success: z.boolean() }))
        .mutation(async (options) => {
            const { input } = options;
            const isSuccess = await redisDelete(input.itemId);
            return {
                success: isSuccess
            }
        })
});

export type AppRouter = typeof appRouter;