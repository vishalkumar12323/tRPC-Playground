import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from "./tRPC/trpc.js";
import { appRouter } from "./tRPC/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.get("/api/items/:itemId", async (req, res) => {
    try {
        const caller = appRouter.createCaller({});
        const item = await caller.getItemById({ itemId: req.params.itemId });

        res.status(200).json(item);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
})

app.use("/trpc/api/items", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
}))

app.get("/api/health", (req, res) => {
    res.json({ msg: "Api server is up and running." });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));