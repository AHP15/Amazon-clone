import "../../styles/Product/ReviewForm.css";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Rating, Alert } from '@mui/material';
import { submitReview } from "../../service/productService";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

function ReviewForm({close, id, addReview}){
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [validationErr, setValidationErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        success:null,
        err:null,
    });

    const { info } = useSelector(selectUser);

    async function handleSubmit(e){
        e.preventDefault();
        
        setLoading(true);
        if(!rating || !comment){
            setValidationErr("Please Enter both rating and comment !!")
        }else{
            const review = {
                rating,
                comment,
                name:info?.name,
                id
            }

            const response = await submitReview(review);

            if(response.success){
                addReview(review);
                setStatus({
                    success:"Review submited successfully",
                    err:null
                });
                setComment("");
                setRating(0);
            }else{
                setStatus({
                    success:null,
                    err:response
                }); 
            }
        }

        setLoading(false);
        close();
    }

    return (
        <div className="review_form">
            <form onSubmit={handleSubmit}>
                <h1>Submit Review</h1>
                <div onClick={close} className="close">
                    <CloseIcon fontSize="large" />
                </div>

                <div>
                <Rating
                    onChange={(e) => {
                        setRating(e.target.value)
                        setValidationErr(null)
                    }}
                    value={rating}
                    size="large"
                />
                </div>
                <textarea 
                    value={comment}
                    cols="30"
                    rows="5"
                    onChange={(e) =>{
                        setComment(e.target.value)
                        setValidationErr(null)
                    }}
                ></textarea>
                <button disabled={loading}>Submit</button>
            </form>

            { (validationErr || status.err) && (
               <Alert
                  onClose={() =>{
                      setValidationErr(null)
                      setStatus(prev => ({
                          ...prev,
                          err:null,
                      }))
                  }}
                  severity="error"
                  className="alert_form" 
                >{validationErr ?? status.err}</Alert>
            )}

            {status.success && (
                <Alert
                   onClose={() =>{
                       setStatus(prev =>({
                           ...prev,
                           success:null,
                       }))
                   }}
                   severity="success"
                   className="alert_form"
                >{status.success}</Alert>
            )}
        </div>
    );
}

export default ReviewForm;