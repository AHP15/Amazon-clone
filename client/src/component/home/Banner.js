import React from 'react';
import "../../styles/home/Banner.css";
import { useEffect, useState } from 'react';

const image1 = "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg";
const image2 = "https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg";
const image3 = "https://m.media-amazon.com/images/I/61CX1noQ8nL._SX3000_.jpg";

export default function Banner() {

    const [render, setRender] = useState(<Slide url={image1} />);

    useEffect(() => {
        const slider = document.querySelector(".slider");
        let imgUrls = [image2, image3, image1];
        let index = 0;
        let delay = 3000;

        const addImage = setInterval(() => {
            if(index >= imgUrls.length){
                setRender(<Slide url={image1}/>);
                index = 0;
            }else{
                setRender(prevState => {
                    return (
                        <>
                          {prevState}
                          <Slide url={imgUrls[index]} />
                        </>
                    );
                });
                slider.scrollBy(window.innerWidth,0);
                index++;
            }
        }, delay);

        return () => {
            clearInterval(addImage);
        }
    }, []);

    return (
        <div className='slider'>
            {render}
        </div>
    )
}


function Slide({url}) {
    return (
        <div className='slide'>
            <img src={url} alt='banner_image'/>
        </div>
    )
}