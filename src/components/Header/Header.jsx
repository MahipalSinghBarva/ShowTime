import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import ContentWrapper from "../contentWrapper/contentWrapper";
// import logo from "../../assets/Images/movix-logo.svg";
// import logo from '../../assets/Images/myshow.png'
import logo from '../../assets/Images/showtime.png'

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const Location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[Location])

  const controlNavbar = () =>{
    // console.log(window.scrollY);
    if(window.scrollY >200){
      if(window.scrollY > lastScrolly && !mobileMenu){
        setShow('hide')
      } else{
        setShow('show')
      }
    } else {
      setShow('top')
  }
    setLastScrolly(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll', controlNavbar);
    return ()=>{
      window.removeEventListener('scroll',controlNavbar);
    };
  }, [lastScrolly]);

  const searchQueryHandler = (event) =>{
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(()=>{
        setShowSearch(false)
      }, 1000)
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigateonHandler = (type) =>{
    if(type === 'movie'){
      navigate('/explore/movie')
    }else{
      navigate('/explore/tv')
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=> navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItem">
          <li className="menuItem" onClick={()=> navigateonHandler('movie')}>Movies</li>
          <li className="menuItem"onClick={()=> navigateonHandler('tv')}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>
        <div className="mobileMenuItem">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
     
    { showSearch && (
      <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={()=> setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>
      )}
    </header>
  );
};

export default Header;
