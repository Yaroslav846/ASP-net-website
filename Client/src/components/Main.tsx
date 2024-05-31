import { Visitcard }from './Visitcard'
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import Carousel from './Carousel'
import { Step } from './step'
import Quiz from './Quiz'
import '../styles/Main.css';
import { Content } from './content';

function Main() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };
  return (
    <div className="flex flex-col items-center">
        <div className="text-6xl font-light mt-16">Кухня вашей мечты</div>
        <div className="flex justify-between mt-10">
            <div className="w-3/5 text-lg font-light">Бесплатно составим 3D модель кухни с полным расчетом стоимости уже на следующий день</div>
            <button className="w-1/3 py-3 border-2 border-black rounded-full text-black bg-white font-medium">Заказать замерщика</button>
        </div>
        <img src="image1.png" className="mt-8" alt="Картинка"></img>
        <div className="mt-10">
            <Content></Content>
        </div>
        <div className="mt-10">
            <div className="text-4xl font-light">ПРЕИМУЩЕСТВА</div>
            <div className="mt-6">
                <div className="text-lg font-light">Для нас важно, чтобы каждому клиенту было просто и комфортно работать с нами</div>
                <Visitcard></Visitcard>
            </div>
        </div>
        <img src="image1.png" className="mt-8" alt="Картинка"></img>
        <Step></Step>
        <div className="mt-10">
            <div className="text-4xl font-light">НАШИ РАБОТЫ</div>
            <div className="mt-6">
                <div className="text-2xl font-semibold">За X лет работы мы изготовили более x кухонь</div>
                <div className="text-lg font-light">Внимание к деталям и воплощение уникальных дизайн-проектов основа нашей работы</div>
            </div>
        </div>
        <Carousel></Carousel>
        <div className="flex flex-col items-center">
            <div className="half-screen-block flex">
            <CSSTransition
              in={quizStarted}
              timeout={1000}
              classNames="quiz"
              unmountOnExit
            >
              <Quiz />
            </CSSTransition>
            {!quizStarted ? (
              <>
                <div className="right-half bg-gray-300">
                  <button className="w-full py-4 border-2 border-black rounded-full text-black bg-white font-medium hover:bg-gray-700 hover:text-white" onClick={startQuiz}>Start Quiz</button>
                </div>
                <div className="left-half">
                  <img src="image1.png" alt="Your Image"></img>
                </div>
              </>
            ) : null}
          </div>
        </div>
    </div>
  );
}

export default Main;