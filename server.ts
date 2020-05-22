import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("服务器启动成功！");
await app.listen({ port: 8000 });
