import { type Item } from "../models/item.model.js"

export const data: Item[] = [{ id: "U3458973458999", name: "Read a book." }, { id: "U898764980556", name: "Go to market." }];

export const db = {
    items: {
        getAllItems: () => {
            return data
        },
        create: (item: Item) => {
            const newItem: Item = {
                ...item,
                id: `U${Date.now().toString()}`,
            }
            data.push(newItem)
        },
        getItemById: (itemId: string) => {
            const item = data.find((item) => item.id === itemId);
            if (!item) throw new Error("Item not found");
            return item;
        }
    }
};