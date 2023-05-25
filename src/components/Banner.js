import React from 'react';
import { Dimmer, Image, Segment } from 'semantic-ui-react';
import main_img from './test.jpeg'

const Banner = () => {
  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '15px',
        marginTop: '20px',
      }}
    >
        <div style={{
            "background-color": "black",
            "border-radius": "35px",
        }}>
            <Image src={main_img} alt="Main Image" style={{
                "border-radius": "35px",
                "min-height": "140px",
                "opacity": "0.9",
                "brightness": "0.5"
            }} />
        </div>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%'
        }}>
                <p>Make your own <span style={{color: 'red'}}>NFT</span> coupon!</p>
        </div>
    </div>
  );
};

export default Banner;