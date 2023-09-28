import React, { useState, useEffect } from 'react';
import Header from './header';
import Axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function NewsQuiz() {
  document.title = 'News Guardian | News Quiz';
  let stage = 3;

  const quizData = {
    id: null,
    news_title: '',
    news_description: '',
    label: null,
  };

  const [newsForQuiz, setNewsForQuiz] = useState(quizData);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    fetchQuizData();
  }, []); // Fetch initial quiz data on component mount

  const fetchQuizData = () => {
    Axios.get('http://127.0.0.1:8000/api/quiz/')
      .then((response) => {
        setNewsForQuiz(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (selectedAnswer === '') {
      toast.error('Please select an answer!');
    } else if (newsForQuiz.label === true && selectedAnswer === 'True') {
      toast.success("You've predicted correctly!");
    } else if (newsForQuiz.label === false && selectedAnswer === 'False') {
      toast.success("You've predicted correctly!");
    } else {
      toast.warn("You've predicted wrongly");
    }
  };

  const getNewQuiz = () => {
    fetchQuizData(); // Fetch a new quiz when the button is clicked
    setSelectedAnswer(''); // Reset the selected answer
  };

  return (
    <>
      <Header activeContainer={stage} />
      <Container className='news-quiz-container'>
        <h4>{newsForQuiz.news_title}</h4>
        <p>{newsForQuiz.news_description}</p>

        <div>
          <label>
            <input
              type='radio'
              value='True'
              checked={selectedAnswer === 'True'}
              onChange={handleOptionChange}
            />
            Real News
          </label>
        </div>
        <div>
          <label>
            <input
              type='radio'
              value='False'
              checked={selectedAnswer === 'False'}
              onChange={handleOptionChange}
            />
            Fake News
          </label>
        </div>

        <Button variant='primary' type='submit' onClick={checkAnswer}>
          Ok
        </Button>
        <Button onClick={getNewQuiz} variant='light' style={{ marginLeft: '10px' }}>
          Get New Quiz
        </Button>
      </Container>

      <ToastContainer />
    </>
  );
}

export default NewsQuiz;
