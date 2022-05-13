import React from 'react';
import Banner from './Banner';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';

const Home = () => {
    return (
        <main>
            <Banner />
            <Info />
            <Services />
            <MakeAppointment />
        </main>
    );
};

export default Home;