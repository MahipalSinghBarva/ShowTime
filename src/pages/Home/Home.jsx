import React from 'react';
import './Home.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './tranding/tranding';
import Papular from './papular/Papular';
import TopRated from './topRated/Topated';


const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <Papular />
      <TopRated />
      {/* <div style={{height:1000}}></div> */}
    </div>
  )
}

export default Home;
