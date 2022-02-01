import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo() {

  const navigate = useNavigate();
    return (
        <div onClick={() =>{ navigate("/") }} className="logo">
          <img
          src='https://logos-marques.com/wp-content/uploads/2021/03/Amazon-logo.png'
          alt="amazon logo"
          />
        </div>
    )
}

export default Logo
