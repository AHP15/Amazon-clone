import { Rating } from "@mui/material";
import Profilepng from "../../images/Profile.png";
import "../../styles/Product/ReviewCard.css";

function ReviewCard({review}){

    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="reviewCard">
            <div className="review_user">
               <p className="image"><img src={Profilepng}  alt="User"/></p>
               <p>{review.name}</p>
            </div>

            <div>
                <Rating {...options} />
                <p>{review.comment}</p>
            </div>
        </div>
    );
}

export default ReviewCard;