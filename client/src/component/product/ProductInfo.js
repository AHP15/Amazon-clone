import React, { useEffect, useState } from 'react';
import Header from '../home/Header';
import { useParams } from "react-router-dom";
import { getproductDetails } from "../../service/productService";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Rating, Skeleton } from '@mui/material';
import "../../styles/Product/ProductInfo.css";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { ADD_ITEM, selectBasket } from "../../slices/basketSilce";

function ProductInfo() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const { isLoggedIn, info } = useSelector(selectUser);
    const dispatch = useDispatch();
    const { items } = useSelector(selectBasket);
    const [added, setAdded] = useState(false);


    function handleAddReview(newReview){
        
        let userAleardyReviewed = false;
        let newReviews = product.reviews.map(review => {
            if(review.user === info._id){
                userAleardyReviewed = true;
                return {
                    ...newReview,
                    user:review.user
                }
            }
            return review
        });

        if(!userAleardyReviewed){
            newReviews.push({
                ...newReview,
                user:info._id
            });
        }

        setProduct(prev =>({
            ...prev,
            reviews:newReviews
        }));
    }

    useEffect(() =>{
        async function fetchData(){
            const response = await getproductDetails(params.id);

            if(response.success){
                setProduct(response.product)
            }

            setLoading(false);
        }

        fetchData();
    }, [params]);

    useEffect(() =>{
        if(product){
            let alreadyAdded = items.find(item => item._id === product._id);
            if(alreadyAdded){
                setAdded(true)
            }
        }
    }, [items, product])

    const options = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
          },
          tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 1
          },
          mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };
    const options2 = {
        value: product?.rating,
        readOnly: true,
        precision: 0.5,
    };

    function handleAddToBasket(){

        dispatch(ADD_ITEM({
            ...product,
            quantity,
        }));
    }

    if(loading){
        return (
            <div>
                <Header />
                <div className='product_skeleton'>
                <Skeleton
                    animation="wave"
                    sx={{ bgcolor: 'white', margin:"10px", borderRadius:"5px" }}
                    variant="rectangular"
                    width="40%"
                    height={400}
                />
                <Skeleton
                    animation="wave"
                    sx={{ bgcolor: 'white', margin:"10px", borderRadius:"5px" }}
                    variant="rectangular"
                    width="40%"
                    height={400}
                />
                </div>
            </div>
        );
    }
    
    return <div className='productInfo'>
       <Header />

       <div className='productDetails_container'>
           <section className='carousel_container'>
               <Carousel responsive={options}>
                   {
                       product.images.map(image => (
                           <div key={image.public_id} className='product_image_container'>
                               <img src={image.url} alt={product.name} />
                           </div>
                       ))
                   }
               </Carousel>
           </section>
           <section className='productinfo_container'>
               <h1 className='product_name'>{product.name}</h1>
               <div className='product_rating'>
                   <Rating {...options2} />{" "}
                   <span className="productCardSpan">
                   {" "}
                   ({product.numOfReviews} Reviews)
                   </span>
                </div>
                <h2>${product.price}</h2>
                <div className='product_add_to_cart'>
                    <div className='product_quantity'>
                        <button onClick={() =>{
                            setQuantity(prev => prev === 1?prev: prev-=1)
                        }}>-</button>
                        <input
                           type="number"
                           value={quantity} 
                           onChange={(e) =>setQuantity(e.target.value)}
                        />
                        <button onClick={() =>{setQuantity(prev => prev+=1)}}>+</button>
                    </div>
                    {
                        added? (<p className='product_added'>item has been added</p>):(
                            <button onClick={handleAddToBasket}>Add to Cart</button>
                        )
                    }
                </div>

                <p className='product_status'>
                    Status: <span className='product_stock' style={{
                        color:product.stock > 1?"green":"red",
                    }}>{product.stock > 1?"InStock":"OutOfStock"}</span>
                </p>
                <div className='product_description'>
                    <h3>description</h3>
                    <p>{product.description}</p>
                </div>

                <button
                   disabled={!isLoggedIn}
                   onClick={() =>{setShowForm(true)}} className='submit_review'
                >{!isLoggedIn? "Login To ":""}Submit Review</button>
           </section>
       </div>

       <div className='product_reviews_container'>
           <h2>REVIEWS</h2>
           <div className='product_reviews'>
            {product && product.reviews[0] && product.reviews.map(review => (
               <ReviewCard key={review._id} review={review} />
            ))}
           </div>
       </div>

       { showForm && (
           <ReviewForm
                addReview={handleAddReview}
                id={params.id}
                close={() =>{setShowForm(false)}}
            />
        )}

    </div>;
}

export default ProductInfo;
