import { useState } from 'react';
import axios from 'axios';
import '../styles/Quiz.css'; // Import CSS Modules
import PhoneInput from './PhoneInput';
import { Button } from './ui/button';


interface Question {
  question: string;
  answers?: {
    option: string;
    image?: string; // Make image optional if not all answers have images
  }[];
  type: "text" | "checkbox" | "image" | "slider"; // Specify allowed types
  minValue?: number; // Optional properties for specific types
  maxValue?: number; // Optional properties for specific types
}

const Questionnaire = () => {
  const questions: Question[] = [
    {
      question: 'Выберите стиль вашей кухни',
      answers: [
        { option: 'Лофт', image: 'loft.jpeg' },
        { option: 'Хайтек', image: 'heightteck.jpeg' },
        { option: 'Классика', image: 'classic.jpeg' },
        { option: 'Модерн', image: 'modern.jpeg' }
      ],
      type: 'image'
    },
    {
      question: 'Какой тип фартука предпочитаете?',
      answers: [
        { option: 'Плитка', image: 'ceramic.jpeg' },
        { option: 'Стекло с фотопечатью', image: 'glass.jpeg' },
        { option: 'Стеновая панель', image: 'woll.jpeg' },
      ],
      type: 'image'
    },
    {
      question: 'Выберите форму вашей кухни',
      answers: [
        { option: 'Прямая', image: 'line.jpeg' },
        { option: 'С отстровком', image: 'island.jpeg' },
        { option: 'Угловая', image: 'angle.jpeg' },
        { option: 'П образная', image: 'p.jpeg' }
      ],
      type: 'image'
    },
    {
      question: 'Учесть встраиваемую технику?',
      answers: [{option: 'Плита'}, {option:'Духовой шкаф'}, {option:'Вытяжка'}, {option:'Холодильник'}],
      type: 'checkbox',
    },
    {
      question: 'Выберите тип столешницы',
      answers: [
        {option: 'Искусственный камень', image: 'Stone.png'},
        {option: 'Пластик', image: 'plastic.jpeg'}, 
        {option: 'Натуральный камень', image: 'natural_stone.png'}
      ],
      type: 'image'
    },
    {
      question: 'Укажите длину Вашей кухни',
      answers: [{option:'1,5-2,4'}, {option:'2,5-3,4'}, {option:'3,5-4,0'}, {option:'Больше 4м'}],
      type: 'text'
    },
    {
      question: 'На какой бюджет рассчитываете?',
      minValue: 50000,
      maxValue: 200000,
      type: 'slider'
    }
  ];
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [dimensions, setDimensions] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleAnswer = (answer: string) => {
    if (questions[currentQuestionIndex].type === 'checkbox') {
      const updatedSelectedAnswers = [...(selectedAnswer as string[])];
      if (updatedSelectedAnswers.includes(answer)) {
        updatedSelectedAnswers.splice(updatedSelectedAnswers.indexOf(answer), 1);
      } else {
        updatedSelectedAnswers.push(answer);
      }
      setSelectedAnswer(updatedSelectedAnswers);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    const roundedValue = Math.round(value / 1000) * 1000;
    setSliderValue(roundedValue);
    setSelectedAnswer(roundedValue.toString());
  };

  const handleNextQuestion = () => {
    if (selectedAnswer || questions[currentQuestionIndex].type === 'slider') {
      if (currentQuestionIndex === 2 && !dimensions) {
        setShowNotification(true);
        return;
      }
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] =
        questions[currentQuestionIndex].type === 'slider' ? sliderValue.toString() : selectedAnswer as string;
      setResponses(updatedResponses);
      setSelectedAnswer('');
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      setShowNotification(true);
      return;
    }

    if (!validateEmail(email)) {
      setShowNotification(true);
      return;
    }

    setShowNotification(false);

    const questionAnswers = questions.map((question, index) => {
      if (index === 2 && question.question === 'Выберите форму вашей кухни') {
        return {
          question: question.question,
          answer: responses[index],
          dimensions: dimensions,
        };
      } else {
        return {
          question: question.question,
          answer: responses[index],
        };
      }
    });

    const formData = {
      name,
      phone,
      email,
      questions: questionAnswers,
    };

    axios
      .post('/api/submitdata', formData)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error: any) => {
        console.error(error);
        // Handle error
      });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const renderQuestion = (question: Question, index: number): React.ReactNode => {
    
    if (index !== currentQuestionIndex) return null;

    if (question.type === 'checkbox') {
      return (
        <div className='flex items-center flex-col'> 
          <h3>{question.question}</h3>
          <div className="checkbox-answers">
            {question.answers?.map((answer, answerIndex) => (
              <label key={answerIndex} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedAnswer.includes(answer.option)}
                  onChange={() => handleAnswer(answer.option)}
                  className="blue-checkbox" 
                />
                {answer.option}
              </label>
            ))}
          </div>
            <Button className="" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    } else if (question.type === 'image') {
      return (
        <div className='flex items-center flex-col'>
          <h3>{question.question}</h3>
          <div className="image-answers">
            {question.answers?.map((answer, answerIndex) => (
              <div className='img-block' key={answerIndex}>
                <img
                  src={answer.image}
                  alt={answer.option}
                  onClick={() => handleAnswer(answer.option)}
                  className={`image-option ${selectedAnswer === answer.option ? 'selected' : ''}`}
                />
                <h5 style={{marginTop: 15 + 'px'}}>{answer.option}</h5>
                {selectedAnswer === answer.option && question.question === 'Выберите форму вашей кухни' && (
                  <div className="dimensions-input">
                    <input
                      type="text"
                      placeholder="Укажите длинну кухни"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
            <Button className="" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    }
     else if (question.type === 'text') {
      return (
        <div className='flex items-center flex-col'>
          <h3>{question.question}</h3>
          <ul className="text-answers">
            {question.answers?.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                onClick={() => handleAnswer(answer.option)}
                className={selectedAnswer === answer.option ? 'selected' : ''}
              >
                {answer.option}
              </li>
            ))}
          </ul>
            <Button className="" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    } else if (question.type === 'slider') {
      return (
        <div className="flex items-center flex-col" key={index}>
          <h3>{question.question}</h3>
          <input
            type="range"
            min={question.minValue}
            max={question.maxValue}
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <span><h5>{sliderValue}</h5></span>
            <Button className="" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    } 

    return null;
  };

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className='container bg-muted/50 border rounded-lg py-121 flex items-center flex-col'>
        <h2>Выбери свою кухню</h2>
        <div className="progres">
          <div style={{ width: `${progress}%` }} className="progres__inner"></div>
        </div>
        {questions.map((question, index) => renderQuestion(question, index))}
        {emailSent && (
          <div>
            <h4>Уведомления: Спасибо за прохождени опроса. Мы с вами скоро свяжимся!</h4>
          </div>
        )}
        {showNotification && (
          <h4>Пожалуйста заполните поля</h4>
        )}
        {currentQuestionIndex === questions.length && (
          <div>
            <h3>Контактная информация</h3>
            <form className='form_label'>
              <div className="form-row">
                <label htmlFor="name"><h5>Имя:</h5></label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="phone"><h5>Телефон:</h5></label>
                <PhoneInput
                  type="text"
                  id="phone-input"
                  className="input-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email"><h5>Почта:</h5></label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
            <Button className="" onClick={handleSubmit}>Отправить</Button>
        </div> 
        )}
    </div>
  );
};

export default Questionnaire;