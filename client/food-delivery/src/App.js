import React, { useState, useEffect } from 'react';
import './App.css'; // 假設你有一個App.css文件來添加CSS樣式
// import laoShiLinImage from './images/lao-shi-lin-kao-rou-fan.png';
// import pizzaHutImage from './images/pizzahut.png';
// import dominosImage from './images/dominos.png';
// import grazieImage from './images/grazie.png';
// import wooteaImage from './images/wootea.png';
// import yuImage from './images/yu.png';
import adsImage from './images/ads.gif';
import logo_word from './images/logo_word.png';
import logo_pic from './images/logo_pic.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Like from './Like';
import Order from './Order';
// import { Router } from 'express';
// import { Routes } from 'react-router-dom';

// 假設數據
// const restaurants = [
//   {
//     id: 1,
//     name: '老士林烤肉飯 (新店中正店)',
//     rating: '4.7',
//     reviews: '2000+',
//     category: 'Taiwanese',
//     offer: '🎉 $300折$30',
//     image: laoShiLinImage,
//   },
//   {
//     id: 2,
//     name: 'Pizza Hut 必勝客 (新北北新店)',
//     rating: '4.9',
//     reviews: '3000+',
//     category: 'American',
//     offer: '🎉 $349打85折',
//     image: pizzaHutImage,
//   },
//   {
//     id: 3,
//     name: "達美樂Domino's (新店北新店)",
//     rating: '4.6',
//     reviews: '100+',
//     category: 'American',
//     offer: '🎉 全尺寸披薩買一送一',
//     image: dominosImage,
//   },
//   {
//     id: 4,
//     name: '古拉爵Grazie (新北新店家樂福店)',
//     rating: '4.6',
//     reviews: '1000+',
//     category: 'American',
//     offer: '🎉 $免外送服務費',
//     image: grazieImage,
//   },
//   {
//     id: 5,
//     name: '五桐號 WooTEA (文山景美店)',
//     rating: '4.9',
//     reviews: '1000+',
//     category: 'Drinks',
//     offer: '🎉 $100打9折',
//     image: wooteaImage,
//   },
//   {
//     id: 6,
//     name: '郁 日式炸豬排 (新店中正店)',
//     rating: '4.8',
//     reviews: '1000+',
//     category: 'Japanese',
//     offer: '🎉 $免外送服務費',
//     image: yuImage,
//   },
//   // ... 其他餐廳數據
// ];

const RestaurantCard = ({ name, rating, reviews, category, offer, image }) => {
  // 状态钩子用于跟踪爱心是否被点击
  const [isFavorite, setIsFavorite] = useState(false);

  // 点击处理函数切换爱心状态
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="restaurant-card">
      <img src={image} alt={name} />
      <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite} title='Add to Favorite Restaurant'>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" data-testid="favorite-unselected">
          <path d="M16 5c2.5 0 4 1.9 4 4.2 0 1.2-.6 2.3-1.3 3.1C17.5 13.5 12 18 12 18s-5.5-4.5-6.7-5.7C4.5 11.5 4 10.4 4 9.2 4 6.9 5.5 5 8 5c1.7 0 3.3 1.6 4 3 .7-1.4 2.3-3 4-3zm0-3c-1.5 0-2.9.6-4 1.4C10.9 2.5 9.5 2 8 2 4 2 1 5.1 1 9.2c0 1.9.8 3.7 2.2 5.2 1.4 1.5 8.8 7.5 8.8 7.5s7.4-6 8.8-7.5c1.4-1.5 2.2-3.3 2.2-5.2C23 5.1 20 2 16 2z">
          </path>
        </svg>
      </button>
      <div className="restaurant-info">
        <h2>{name}</h2>
        <p className="offer">{offer}</p>
        <p className="category">{category}</p>
        <div className="rating">
          <span>{rating}</span>
          <span>({reviews})</span>
        </div>
      </div>
    </div>
  );
};

// 應用主組件
const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <title>Gourmet Go Xindian</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <nav>
            <ul>
              <li><img src={logo_pic} alt={'logopic'}></img></li>
              <li><img src={logo_word} alt={'logoname'}></img></li>
              <li><Link to="/like">Like</Link></li>
              <li><Link to="/order">My Order</Link></li>
            </ul>
          </nav>
          <Routes>
                  {/* <li><img src={logo_pic} alt={'logopic'}></img></li>
                  <li><img src={logo_word} alt={'logoname'}></img></li>
                  <li><a href="/">Home</a></li> */}
            <Route path="/like" element={<Like />} />
            <Route path="/order" element={<Order />} />
                  {/* <li><a href="/">Home</a></li> 
                  <li><a href="/Like">Like</a></li> */}
                  {/* <li><a href="/">My Order</a></li> */}
          </Routes>
            
          {/* <hr></hr> */}
        </header>
        <main>
          <div className="ads">
            <img src={adsImage} alt={'ads'}></img>
          </div>
          <div className="listtitle">
            <h3>Restaurant List</h3>
          </div>
          <section className="restaurant-list">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
            {/* <ul>
              {restaurants.map(restaurant => (
                <li key={restaurant.id}>{restaurant.name}</li>
              ))}
            </ul> */}
          </section>
          <footer>
              <p>GitHub <a href="https://github.com/chihyu0917">@chihyu0917</a></p>
          </footer>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
