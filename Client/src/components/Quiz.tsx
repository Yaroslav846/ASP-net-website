import { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Slider } from "./ui/slider"

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
      answers: [{ option: 'Плита' }, { option: 'Духовой шкаф' }, { option: 'Вытяжка' }, { option: 'Холодильник' }],
      type: 'checkbox',
    },
    {
      question: 'Выберите тип столешницы',
      answers: [
        { option: 'Искусственный камень', image: 'Stone.png' },
        { option: 'Пластик', image: 'plastic.jpeg' },
        { option: 'Натуральный камень', image: 'natural_stone.png' }
      ],
      type: 'image'
    },
    {
      question: 'Укажите длину Вашей кухни',
      answers: [{ option: '1,5-2,4' }, { option: '2,5-3,4' }, { option: '3,5-4,0' }, { option: 'Больше 4м' }],
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
  const [value, setValue] = useState<number[]>([50000])
  const [wchbox] = useState();
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

  const handleNextQuestion = () => {
    if (selectedAnswer || questions[currentQuestionIndex].type === 'slider') {
      if (currentQuestionIndex === 2 && !dimensions) {
        setShowNotification(true);
        return;
      }
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] =
        questions[currentQuestionIndex].type === 'slider' ? value.toString() : selectedAnswer as string;
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
        <div className='flex flex-col items-center'>
          <h3 className="text-xl md:text-2xl font-normal mb-5">{question.question}</h3>
          <div className="checkbox-answers">
            {question.answers?.map((answer, answerIndex) => (
              <div key={answerIndex} className="checkbox-label">
                <Checkbox
                  checked={wchbox}
                  onCheckedChange={() => handleAnswer(answer.option)} 
                />
                {answer.option}
              </div>
            ))}
          </div>
          <Button className="mt-4 text-x md:text-xl text-black" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    } else if (question.type === 'image') {
      return (
        <div className='flex flex-col items-center'>
          <h3 className="text-xl md:text-2xl font-normal mb-5">{question.question}</h3>
          <div className="image-answers flex flex-wrap justify-center sm:gap-8 md:gap-12">
            {question.answers?.map((answer, answerIndex) => (
              <div className='img-block flex flex-col items-center' key={answerIndex}>
                <img
                  src={answer.image}
                  alt={answer.option}
                  onClick={() => handleAnswer(answer.option)}
                  className={`image-option ${selectedAnswer === answer.option ? 'selected' : ''}`}
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '300px', height: '300px' }}
                />
                <h5 className="text-x md:text-xl font-bold" style={{ marginTop: 15 + 'px' }}>{answer.option}</h5>
                {selectedAnswer === answer.option && question.question === 'Выберите форму вашей кухни' && (
                  <div className="dimensions-input mt-5">
                    <Input
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
          <Button className="mt-4 text-x md:text-xl text-black" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    }
    else if (question.type === 'text') {
      return (
        <div className='flex flex-col items-center '>
          <h3 className="text-xl md:text-2xl font-normal mb-5">{question.question}</h3>
          <ul className="text-x md:text-xl font-normal">
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
          <Button className="mt-4 text-x md:text-xl text-black" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    } else if (question.type === 'slider') {
      return (
        <div className="flex flex-col items-center" key={index}>
          <h3 className="text-xl md:text-2xl font-normal mb-5">{question.question}</h3>
          <Slider
              id="maxlength"
              max={200000}
              min={50000}
              defaultValue={value}
              step={1000}
              onValueChange={(newValue) => {
                setValue(newValue); // Update slider value state
                setSelectedAnswer(newValue.toString()); // Update selectedAnswer as string
            }} 
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Maximum Length"
              
            />
          <span><h5>{value}</h5></span>
          <Button className="mt-4 text-x md:text-xl text-black" onClick={handleNextQuestion}>Следующий</Button>
        </div>
      );
    }

    return null;
  };

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Выбери свою кухню</h1>
      <div className="mb-5 h-2.5 rounded-md bg-[hsl(var(--progress))] w-full">
        <div style={{ width: `${progress}%` }} className="h-full rounded-md bg-[hsl(var(--primary))]"></div>
      </div>
      <h1 className="flex flex-wrap justify-center">
        {questions.map((question, index) => renderQuestion(question, index))}
      </h1>
      {emailSent && (
        <div>
          <h4>Уведомления: Спасибо за прохождени опроса. Мы с вами скоро свяжимся!</h4>
        </div>
      )}
      {showNotification && (
        <h4>Пожалуйста заполните поля</h4>
      )}
      {currentQuestionIndex === questions.length && (
        <div className='flex flex-col'>
          <h3>Контактная информация</h3>
          <form className='form_label flex flex-col items-center'>
            <div className="form-row flex flex-col items-center">
              <label htmlFor="name"><h5>Имя:</h5></label>
              <Input
                type="text"
                id="name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-row flex flex-col items-center">
              <label htmlFor="phone"><h5>Телефон:</h5></label>
              <Input
                type="text"
                id="phone-input"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </div>
            <div className="form-row flex flex-col items-center">
              <label htmlFor="email"><h5>Почта:</h5></label>
              <Input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
          <Button className="mt-4" onClick={handleSubmit}>Отправить</Button>
        </div>
      )}
    </div>
  );
};


export default Questionnaire;
