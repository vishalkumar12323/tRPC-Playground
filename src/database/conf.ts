import Redis from "ioredis";

const db = new Redis.default({ host: "localhost", port: 6379 });
export { db };