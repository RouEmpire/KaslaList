import {Elysia} from "elysia";

const app = new Elysia().get("/", () => "Hello Kasla! 💎").listen(3000);

console.log(
    `💎 Kasla is running at ${app.server?.hostname}:${app.server?.port}`);
