import Visitcard from './Visitcard'
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import Carousel from './Carousel'
import Quiz from './Quiz'
import '../styles/Main.css';

function Main() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [flexDisplay, setFlexDisplay] = useState('flex'); // Состояние для управления стилем display

  const startQuiz = () => {
    setQuizStarted(true);
    setFlexDisplay(''); // Убираем стиль display: flex;
  };
  return (
    <div className="parent">
      <div className="head">Кухня вашей мечты</div>
      <div className="mid">
        <div className="paragraph">Бесплатно составим 3D модель кухни с полным расчетом стоимости уже на следующий день</div>
        <button className="button">Заказать замерщика</button>
      </div>
      <img src='image1.png' className="image1" alt="Картинка" />
      <div className="section">
        <div className="block">
          <div className="line"></div>
          <div className="underblock">
            <img src='arrow1.png' alt="Стрелка" />
            <div className="textblock">Бесплатно приедет замерщик на дом в удобное для вас время</div>
            <div className="lineh"></div>
          </div>
        </div>
        <div className="block">
          <div className="line"></div>
          <div className="underblock">
            <img src='arrow1.png' alt="Стрелка" />
            <div className="textblock">Бесплатно приедет замерщик на дом в удобное для вас время</div>
            <div className="lineh"></div>
          </div>
        </div>
        <div className="block">
          <div className="line"></div>
          <div className="underblock">
            <img src='arrow1.png' alt="Стрелка" />
            <div className="textblock">Бесплатно приедет замерщик на дом в удобное для вас время</div>
            <div className="lineh"></div>
          </div>
        </div>
        <div className="block">
          <div className="line"></div>
          <div className="underblock">
            <img src='arrow1.png' alt="Стрелка" />
            <div className="textblock">Бесплатно приедет замерщик на дом в удобное для вас время</div>
            <div className="lineh"></div>
          </div>
        </div>
        {/* Повторяйте блоки .block для каждого элемента */}
      </div>
      <div className="section">
        <div className="top_he">ПРЕИМУЩЕСТВА</div>
        <div className="jk">
          <div className="heading">Для нас важно, чтобы каждому клиенту было просто и комфортно работать с нами</div>
          <div className="booxvisit">
            <Visitcard></Visitcard>
            <Visitcard></Visitcard>
            <Visitcard></Visitcard>
            <Visitcard></Visitcard>
            <Visitcard></Visitcard>
            <Visitcard></Visitcard>
          </div>
        </div>
      </div>
      <img src='image1.png' className="image1" alt="Картинка" />
      <div className="section">
        <div className="top_he">НАШИ РАБОТЫ</div>
        <div className="jk">
          <div className="heading">За X лет работы мы изготовили более x кухонь</div>
          <div className="underheading">Внимание к деталям и воплощение уникальных дизайн-проектов основа нашей работы</div>
        </div>
      </div>
      <Carousel></Carousel>
      <div className="parent">
      {/* Ваш остальной JSX код */}
      <div className="half-screen-block" style={{ display: flexDisplay }}>
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
            <div className="right-half" style={{ backgroundColor: '#736A5E' }}>
              <button className="quiz-button" onClick={startQuiz}>Start Quiz</button>
            </div>
            <div className="left-half">
              <img src="image1.png" alt="Your Image" />
            </div>
          </>
        ) : null}
      </div>
    </div>
    </div>
  );
}

export default Main;