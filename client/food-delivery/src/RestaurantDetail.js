import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// 假設數據
const PopularMenu = [
  {
    id: 1,
    name: '招牌碳烤豬肉飯【獨家餐點】',
    price: '149',
    description: '',
    image: 'https://images.deliveryhero.io/image/fd-tw/Products/67515070.jpg',
  },
  {
    id: 2,
    name: '招牌碳烤牛肉飯【獨家餐點】',
    price: '169',
    description: '',
    image: 'https://images.deliveryhero.io/image/fd-tw/Products/67515073.jpg',
  },
  {
    id: 3,
    name: '碳烤牛肉飯拼烤雞腿【獨家餐點】',
    price: '179',
    description: '肉品原產地：牛肉原產地：澳洲/巴拉圭/美國',
    image: 'https://images.deliveryhero.io/image/fd-tw/Products/67515081.jpg',
  }
];

const SingleMenu = [
  {
    id: 1,
    name: '味噌湯',
    price: '30',
    description: '溫暖且複合蛋白質的味噌熱湯',
    image: '',
  },
  {
    id: 2,
    name: '白飯',
    price: '30',
    description: '',
    image: '',
  },
  {
    id: 3,
    name: '麻辣米血',
    price: '40',
    description: '',
    image: '',
  },
  {
    id: 4,
    name: '溏心蛋',
    price: '30',
    description: '單吃或配飯都好吃',
    image: '',
  }
]

const Menulist = ({ id, name, price, description, image }) => {
  return (
    <div className="menu-list">
      <img src={image} alt={name} />
      <div className="menu-info">
        <h2>{name}</h2>
        <p className="price">NT${price}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

const RestaurantDetail = () => {
  return (
        <div className="restaurant1">
            <main>
                <div className="listtitle">
                  <h3>Popular Menu</h3>
                </div>
                <section className="menu-list">
                    {PopularMenu.map((menu) => (
                        <Menulist key={menu.id} {...menu} />
                    ))}
                </section>
                <div className="listtitle">
                  <h3>Single Menu</h3>
                </div>
                <section className="menu-list">
                    {SingleMenu.map((menu) => (
                        <Menulist key={menu.id} {...menu} />
                    ))}
                </section>
            </main>
        </div>
  );
}

export default RestaurantDetail;