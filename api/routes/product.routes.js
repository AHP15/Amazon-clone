import express from "express";
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct, 
    getProductDetails,
    createReview,
    getAllReviews,
    deleteReview,
    getAllProductsAdmin,
    downloadProductImages,
    getAllReviewsForAdmin
} from "../controllers/product.controller.js";
import { isAdmin, verifyToken } from "../middleware/authJwt.js";
import uploadImages from "../middleware/uploadproductImages.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(verifyToken, isAdmin, getAllProductsAdmin);
router.route("/admin/product/new").post(verifyToken,isAdmin,uploadImages, createProduct);
router.route("/admin/product/:id")
.put(verifyToken,isAdmin,uploadImages, updateProduct)
.delete(verifyToken,isAdmin, deleteProduct);
router.route("/admin/reviews").get(verifyToken,isAdmin, getAllReviewsForAdmin);


router.route("/product/:id").get(getProductDetails);
router.route("/product/files/:name").get(downloadProductImages);

router.route("/review").put(verifyToken, createReview);

router
  .route("/reviews")
  .get(getAllReviews)
  .delete(verifyToken, deleteReview);

export default router;