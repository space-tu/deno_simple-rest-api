import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  findProductsList,
  findOneProduct,
  addOneProduct,
  updateOneProduct,
  delteOneProduct,
} from "./controllers/products.ts";
const router = new Router();
router
  .get("/api/deno/product/list", findProductsList)
  .get("/api/deno/product/findOne/:id", findOneProduct)
  .post("/api/deno/product/addOne", addOneProduct)
  .put("/api/deno/product/updateOne/:id", updateOneProduct)
  .delete("/api/deno/product/deleteOne/:id", delteOneProduct);

export default router;
