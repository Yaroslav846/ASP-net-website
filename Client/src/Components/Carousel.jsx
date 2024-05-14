import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/Carousel.css'; // Подключаем файл стилей для кастомизации карточек

const Carousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
  
    const products = [ // Список продуктов с изображением, ценой и текстом
      { image: 'image1.png', price: '$99.99', text: 'Продукт 1' },
      { image: 'image1.png', price: '$49.99', text: 'Продукт 2' },
      { image: 'image1.png', price: '$79.99', text: 'Продукт 3' },
      // Добавьте больше продуктов при необходимости
    ];
  
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index}>
              <div className="cards">
                <img src={product.image} alt={`Slide ${index + 1}`} />
                <div className="content">
                  <div className="price">{product.price}</div>
                  <div className="text">{product.text}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;