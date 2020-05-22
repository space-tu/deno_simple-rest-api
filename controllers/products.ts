import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
let productsList: Product[] = [
  { id: "1", name: "产品一", description: "我是产品一", price: 19.99 },
  { id: "2", name: "产品二", description: "我是产品二", price: 20.99 },
  { id: "3", name: "产品三", description: "我是产品三", price: 39.99 },
  { id: "4", name: "产品四", description: "我是产品四", price: 49.99 },
];

/**
 * @access public
 * @description 查询所有产品信息：/api/deno/product/list
 * @method GET
 */
const findProductsList = ({ response }: { response: Record<string, any> }) => {
  response.body = {
    data: productsList,
    success: true,
  };
};
/**
 * @access public
 * @description 查询单个产品信息：/api/deno/product/findOne/:id
 * @method GET
 */
const findOneProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: Record<string, any>;
}) => {
  const product: Product | undefined = productsList.find(
    (item) => item.id === params.id
  );
  if (product) {
    response.status = 200;
    response.body = {
      data: product,
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      msg: "抱歉，没有这个产品",
      success: false,
    };
  }
};

/**
 * @access public
 * @description 添加单个产品信息：/api/deno/product/addOne
 * @method POST
 */
const addOneProduct = async ({
  request,
  response,
}: {
  request: Record<string, any>;
  response: Record<string, any>;
}) => {
  const body = await request.body();
  const product: Product = body.value;
  const { name, description, price } = product;
  const isRequired = name && description && price;
  if (isRequired) {
    product.id = v4.generate();
    response.status = 200;
    response.body = {
      data: product,
      success: true,
    };
    productsList.push(product);
  } else {
    response.status = 400;
    response.body = {
      msg: "保存失败",
      success: false,
    };
  }
  // if (!request.hasBody) {
  //   response.status = 400;
  //   response.body = {
  //     msg: "保存失败",
  //     success: false,
  //   };
  // } else {
  // }
};
/**
 * @access public
 * @description 更新单个产品信息：/api/deno/product/updateOne/:id
 * @method PUT
 */
const updateOneProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Record<string, any>;
  response: Record<string, any>;
}) => {
  const product: Product | undefined = productsList.find(
    (item) => item.id === params.id
  );
  if (product) {
    const body = await request.body();
    const updateProduct: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;
    productsList = productsList.map((item) =>
      item.id === params.id ? { ...item, ...updateProduct } : item
    );
    response.status = 200;
    response.body = {
      data: product,
      success: true,
    };
  } else {
    response.status = 404;
    response.body = {
      msg: "抱歉，没有这个产品",
      success: false,
    };
  }
};
/**
 * @access public
 * @description 删除单个产品信息：/api/deno/product/delteOne/:id
 * @method DEL
 */
const delteOneProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Record<string, any>;
  response: Record<string, any>;
}) => {
  const product: Product | undefined = productsList.find(
    (item) => item.id === params.id
  );
  if (product) {
    const body = await request.body();
    productsList = productsList.filter((item) => item.id !== params.id);
    response.status = 200;
    response.body = {
      success: true,
      data: "删除成功",
    };
  } else {
    response.status = 404;
    response.body = {
      msg: "抱歉，没有这个产品",
      success: false,
    };
  }
};
export {
  findProductsList,
  findOneProduct,
  addOneProduct,
  updateOneProduct,
  delteOneProduct,
};
