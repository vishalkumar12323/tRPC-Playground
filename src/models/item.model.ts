import { z } from "zod";


const itemModel = z.object({
    id: z.string().optional(),
    title: z.string()
});

export const ItemResponseOutput = z.object({
    items: z.array(itemModel)
})

export type Item = z.infer<typeof itemModel>;
export type ItemResponse = z.infer<typeof ItemResponseOutput>;