import DB from "../models/index.js";
import { handleError, handleAsyncError } from "../utils/errorHandler.js";

const Product = DB.product;
const GridFSBucket = DB.mongoose.mongo.GridFSBucket;

const downloadProductImages = async (req, res) => {
    try {
        await DB.mongoose.connect(process.env.CONNECTION_URL);
  
      const bucket = new GridFSBucket(DB.mongoose.connection, {
        bucketName: "productImages",
      });

  
      let downloadStream = bucket.openDownloadStreamByName(req.params.name);
      downloadStream.on("data", data => {
        res.write(data);
      });

      downloadStream.on("error", function (err) {
          console.log(err);
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
      
    
      downloadStream.on("end", () => {
        res.end();
      });

    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
};

// create product -> admin
// I have to verify if the product already exist (or may be not)
const createProduct = handleAsyncError(async (req, res) => {
    
    const baseUrl = "http://localhost:8080/api/v1/product/files/"
    const files = req.files.map(file => ({
        public_id:Math.random().toString(),
        url:baseUrl+file.filename
    }));
    req.body.user = req.userId;

    const product = await Product.create({
        ...req.body,
        images: files
    });
    res.status(201).send({
        success: true,
        product
    });
});

const getAllProductsAdmin = handleAsyncError(async (req, res) =>{
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// get all products
const getAllProducts = handleAsyncError(async (req, res) => { 
    
    const resultPerPage = 8;
    const currentPage = req.query.page? Number(req.query.page) : 1;
    const skip = resultPerPage * (currentPage - 1);

    const options = {
        name:{
            $regex:req.query.keyword ?? "",
            $options:"i"
        },
        price:{
            $gte: req.query.min_price? Number(req.query.min_price) : -Infinity,
            $lt: req.query.max_price? Number(req.query.max_price) : Infinity,
        }
    };

    if(req.query.category){
        options.category = req.query.category;
    }

    const products  = await Product
                            .find(options)
                            .limit(resultPerPage)
                            .skip(skip);
    res.status(200).send({
        success: true,
        products,
        length:products.length
    });
})

// get product details
const getProductDetails = handleAsyncError(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if(!product){
        return handleError(new Error("Product not found"), 404, res);
    }

    res.status(200).send({
        success: true,
        product,
    })
})

// update product -> admin
const updateProduct = handleAsyncError(async (req, res) => {
    
    const baseUrl = "http://localhost:8080/api/v1/product/files/"
    let files = req.files.map(file => ({
        public_id:Math.random().toString(),
        url:baseUrl+file.filename
    }));

    let product = await Product.findById(req.params.id);
    if(!product){
        return handleError(new Error("Product not found"), 404, res);
    }
    
    let images = product.images;
    images = req.body.files? [...images, ...files]:files;
    product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
        images
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).send({
        success: true,
        product
    })
})

// delete product -> admin

const deleteProduct = handleAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if(!product){
        return handleError(new Error("Product not found"), 404, res);
    }

    await product.remove();

    res.status(200).send({
        success: true,
        message: "Product deleted successfully"
    })
});

// create or update product review

const createReview = handleAsyncError(async (req, res) => {

    const {name, rating, comment, productId} = req.body;

    const product = await Product.findById(productId);
    const review = {
        user: req.userId,
        rating: Number(rating),
        comment,
        name,
    };
    
    
    // if the user is already reviewed this product and want to change it
    const isReviewed = product.reviews.find(
        rev => rev.user.toString() === req.userId.toString()
    );

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.userId.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    
    let sum = 0;
    product.reviews.forEach(rev =>{
        sum += rev.rating;
    })
    product.rating = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
});

// Get All Reviews of a product
const getAllReviews = handleAsyncError(async (req, res) =>{
    const product = await Product.findById(req.query.id);

    if (!product) {
        return handleError(new Error("Product not found", 404, res));
    }
    
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// delete Review
const deleteReview = handleAsyncError(async (req, res) =>{
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return handleError(new Error("Product not found", 404, res));
    }

    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    );

    let sum = 0;
    reviews.forEach(rev =>{
        sum += rev.rating;
    })

    product.reviews = reviews;
    product.rating = sum / reviews.length;
    product.numOfReviews = reviews.length;

    await product.save();

    res.status(200).json({
        success: true,
    });

});

const getAllReviewsForAdmin = handleAsyncError(async (req, res) =>{
    const products = await Product.find();

    let reviews = [];
    products.forEach(product =>{
        if(product.reviews.length > 0){
            reviews.push(product.reviews);
        }
    });
    res.status(200).send({
        success:true,
        reviews
    });
});

export {
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
    getAllReviewsForAdmin,
};