import React from 'react';
import chair from '../../assets/images/chair.png';
// import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="w-6/12 rounded-lg shadow-2xl" />
                {/* <img src={chair} className="max-w-sm rounded-lg shadow-2xl" /> */}
                <div>
                    <div className='w-10/12 mx-auto'>
                    <h1 className="text-5xl font-bold w-9/12">Your New Smile Starts Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {/* <PrimaryButton>Get Started</PrimaryButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;