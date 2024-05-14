import React from 'react';
import ReactDOM from 'react-dom';

const Header = () => {
    return (
        <header>
            <div className="navbar">
                <div className="logo">Kitchen bass</div>
                <div className="city">г.Самара, Самарская область</div>
                <div>
                    <img src="vk.png" alt="" className="vk" width={25} height={25}></img>
                    <img src="wapp.png" alt="" className="wapp" width={25} height={25}></img>
                </div>
                <div className="number">+7 (999) 333 25 56</div>
            </div>
        </header>
    )
}

export default Header;