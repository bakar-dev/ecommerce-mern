import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";
import QueryHandler from "../utils/queryHanlder.js";

//Create Product : ADMIN
export const createProduct = asyncErrorHandler(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//List All Products
export const getAllProducts = asyncErrorHandler(async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const queryHandler = new QueryHandler(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await queryHandler.query;
  res.status(200).json({ success: true, products, productCount });
});

//Get Single Product
export const getProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({ success: true, product });
});

//Update Product : ADMIN
export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

//Delete Product : ADMIN
export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  await product.remove();

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully." });
});
