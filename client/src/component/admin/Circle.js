import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/admin/Circle.css";

function Circle({title, number, background, link}) {
    return (            
        <div className='circle' style={{backgroundColor:background}}>
            <Link to={link}>
                <p>{title && title}</p>
                <p>{number && number}</p>
            </Link>
        </div>
    )
}

export default Circle;
