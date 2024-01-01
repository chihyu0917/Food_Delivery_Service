import React, { useState, useEffect } from 'react';
// import './App.css'; // 假設你有一個App.css文件來添加CSS樣式
// import adsImage from './images/ads.gif';

const RestaurantCard = ({ name, rating, reviews, category, offer, image, like }) => {
    // 状态钩子用于跟踪爱心是否被点击
    const [isFavorite, setIsFavorite] = useState(like === 'True');
  
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

async function fetchRestaurants() {
	try {
	  const response = await fetch('http://localhost:3001/api/restaurants');
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error("Error fetching data:", error);
	  return []; // 返回一个空数组以避免进一步的错误
	}
}
  

const Like = () => {
	const [likedRestaurants, setLikedRestaurants] = useState([]);

	useEffect(() => {
		// 假设 fetchRestaurants() 是一个获取所有餐厅数据的函数
		fetchRestaurants().then(data => {
		const filteredData = data.filter(restaurant => restaurant.like === 'True');
		setLikedRestaurants(filteredData);
		});
	}, []);

	return (
		<div className="like">
			<main>
				<div className="listtitle">
					<h3>Like List</h3>
				</div>
				<section className="restaurant-list">
					{/* {restaurants.map((restaurant) => (
						<RestaurantCard key={restaurant.id} {...restaurant} />
					))} */}
					{likedRestaurants.map(restaurant => (
						<RestaurantCard key={restaurant.id} {...restaurant} />
					))}
				</section>
			</main>
		</div>
	);
};

export default Like;
