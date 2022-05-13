import React from 'react';
import Banner from './Banner';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <main>
            <Banner />
            <Info />
            <Services />
            <MakeAppointment />
            <Testimonials />
        </main>
    );
};

export default Home;