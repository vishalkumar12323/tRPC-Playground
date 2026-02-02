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
    // getItemById: publicProcedure
    //     .input()
    //     .output()
    //     .query(() => {

    //     })
});

export type AppRouter = typeof appRouter;