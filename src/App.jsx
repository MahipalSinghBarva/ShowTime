import { useState, useEffect } from 'react'
import {fetchDataFromApi} from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

import SearchResult from './pages/SearchResult/searchResult'
import Explore from './pages/Explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/Details/Details'


function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home )
    console.log(url);

    useEffect(()=>{
      fetchAppiConfig();
      genresCall();
    }, []);

  const fetchAppiConfig = () =>{
    fetchDataFromApi('/configuration')
    .then((res)=>{
      console.log(res);

      const url ={
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      }

      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((url)=>{
       promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
  
    const data = await Promise.all(promises)
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
    <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:mediaType/:id' element={<Details />} />
            <Route path='/search/:query' element={<SearchResult />} />
            <Route path='/explore/:mediaType' element={<Explore />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
      
    
  )
}

export default App
