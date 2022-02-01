import React from 'react';
import "../../styles/user/Input.css";

function Input({icon, type,name, placeHolder, handleInvalid, handleChange, value}) {
    return (
        <div className='input_container'>
            <p>{icon}</p>
            <input
               type={type}
               name={name || type}
               value={value}
               placeholder={placeHolder}
               onInvalid={handleInvalid}
               onChange={handleChange}
               required
            />
        </div>
    )
}

export default Input
