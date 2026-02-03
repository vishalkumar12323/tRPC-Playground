import { router, publicProcedure } from './trpc.js';
import { z } from "zod";
import { ItemResponseOutput } from "../models/item.model.js"
import { db } from '../database/db.js';

export const appRouter = router({
    getAllItems: publicProcedure
        .input(z.undefined())
        .output(ItemResponseOutput)
        .query(() => {
            const items = db.items.getAllItems();
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
        .mutation((options) => {
            const { input } = options;
            const item = db.items.create(input);
            return item;
        }),
    getItemById: publicProcedure
        .input(z.object({ itemId: z.string() }))
        .output(z.object({ id: z.string().optional(), title: z.string() }))
        .query((options) => {
            const { input } = options;
            return db.items.getItemById(input.itemId);
        })
});

export type AppRouter = typeof appRouter;