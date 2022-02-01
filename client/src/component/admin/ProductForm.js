import React, {useEffect, useState} from 'react';
import MetaData from '../../MetaData';
import Input from '../user/Input';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import "../../styles/admin/ProductForm.css";
import { createProduct, updateProduct } from "../../service/adminService";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import Alert from '@mui/material/Alert';
import { selectAdmin, CLEAR_EDIT_PRODUCT } from '../../slices/adminSlice';

function ProductForm() {
   
   const { editProduct, products } = useSelector(selectAdmin);
   const dispatch = useDispatch();
   const [product, setProduct] = useState({
      name:"",
      price:0,
      description:"",
      category:"",
      stock:0,
   });
   const [files, setFiles] = useState([]);
   const [imagesPreview, setImagesPreview] = useState([]);
   const [loading, setLoading] = useState(false);
   const [validationError, setValidationError] = useState(false);
   const [status, setStatus] = useState({
      success:null,
      err: null,
   });
   const {info} = useSelector(selectUser);

   function handleInvalid(e){
      setValidationError(err => {
         if(err){
             return err + ` and Invalid ${e.target.name}`;
         }
         return `Invalid ${e.target.name}`;
     })
   }

   function handleChange(e){
      if(e.target.name === "images"){
         const files = Array.from(e.target.files);
         files.forEach(image => {
            const reader = new FileReader();
            setFiles(prev => [...prev, image])
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
              }
            };
      
            reader.readAsDataURL(image);
         });

      }else{
         setProduct(prevState =>({
            ...prevState,
            [e.target.name]:e.target.value
         }));
      }

      setValidationError(null);
   }

   async function handleSubmit(e){
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();

      formData.set("name", product.name);
      formData.set("price",product.price);
      formData.set("description", product.description);
      formData.set("category", product.category);
      formData.set("stock", product.stock);
      files.forEach(image =>{
         formData.append("files", image);
      })
      formData.set("user", info._id);

      let response;
      if(editProduct){
         response = await updateProduct(editProduct, formData);
      }else{
         response = await createProduct(formData);
      }

      if(response.success){
         setStatus({
            success:`product ${editProduct?"eddited":"added"} successfully`,
            err:null,
         });
         setProduct({
            name:"",
            price:0,
            description:"",
            category:"",
            stock:0,
         });
         setFiles([]);
         setImagesPreview([]);
      }else{
         setStatus({
            success:null,
            err:response
         })
      }

      setLoading(false);
      dispatch(CLEAR_EDIT_PRODUCT());
   }

   useEffect(() =>{
      if(editProduct){
         products?.forEach(pduct => {
            if(pduct._id === editProduct){
               setProduct({
                  name:pduct.name,
                  price:pduct.price,
                  description:pduct.description,
                  category: pduct.category,
                  stock: pduct.stock
               })

               setImagesPreview(pduct.images.map(image => image.url));
               setFiles(pduct.images.map(image => image.url));
            }
         })
      }else{
         setProduct({
            name:"",
            price:0,
            description:"",
            category:"",
            stock:0,
         });
         setFiles([]);
         setImagesPreview([]);
      }
   }, [editProduct, products]);

   function handleCloseError(){
      setValidationError(null);
      setStatus({
         success:null,
         err:null,
      });
   }

   function handleCloseSuccess(){
      setStatus({
         success:null,
         err:null,
      });
   }

    return (
        <div>
            <MetaData title={(editProduct? "Edit":"Create")+"--product"} />
            <Sidebar />
            <div className='form_container'>
                <form onSubmit={handleSubmit}>
                   <h1>{(editProduct? "Edit":"Create")+" Product"}</h1>
                   <Input
                      type="text"
                      name="name"
                      placeHolder="Product name"
                      handleInvalid={handleInvalid}
                      handleChange={handleChange}
                      value={product.name}
                   />
                    <Input
                      type="number"
                      name="price"
                      placeHolder="Product price"
                      handleInvalid={handleInvalid}
                      handleChange={handleChange}
                      value={product.price}
                   />
                   <div className='description_container'>
                       <textarea
                          name='description'
                          placeholder='Product description'
                          onInvalid={handleInvalid}
                          onChange={handleChange}
                          value={product.description}
                          className='product_description'
                       ></textarea>
                   </div>
                   <Input
                      type="text"
                      name="category"
                      placeHolder="Product category"
                      handleInvalid={handleInvalid}
                      handleChange={handleChange}
                      value={product.category}
                   />
                   <Input
                      type="number"
                      name="stock"
                      placeHolder="Product stock"
                      handleInvalid={handleInvalid}
                      handleChange={handleChange}
                      value={product.stock}
                   />
                   <div className='input_container'>
                     <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onInvalid={handleInvalid}
                        onChange={handleChange}
                        multiple
                     />
                   </div>
                   <div id="createProductFormImage">
                        {imagesPreview?.map((image, index) => (
                           <div key={index} className='image_container'>
                              <img key={index} src={image} alt="Product Preview" />
                           </div>
                        ))}
                  </div>
                  <Button
                     disabled={loading}
                     variant="contained"
                     type="submit"
                  >Submit product</Button>
                </form>
            </div>

            {(validationError || status.err) && (
               <Alert
                  onClose={handleCloseError}
                  className="alert_form" 
                  severity="error">{ validationError ?? status.err }</Alert>
            )}

            {status.success && (
               <Alert
                  onClose={handleCloseSuccess}
                  className="alert_form" 
                  severity="success">{status.success }</Alert>
            )}
        </div>
    )
}

export default ProductForm;
