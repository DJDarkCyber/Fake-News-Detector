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
        <div className='div-iqyla'>
          <h4>{newsForQuiz.news_title}</h4>
        </div>
        <div className='div-iqpls'>
          <p>{newsForQuiz.news_description}</p>
        </div>

        <div className="radiogroup">
          <div className='div-oqapl'>
              <div className='div-ioalp'>
                <div className="wrapper">
                  <input
                  className='state'
                    type='radio'
                    value='True'
                    name="app"
                    id="a"
                    checked={selectedAnswer === 'True'}
                    onChange={handleOptionChange}
                  />
                  <label className="label" for="a">
                    <div className="indicator"></div>
                    <span className="text">Real News</span>
                  </label>
                </div>
              <div className="wrapper">
                  <input
                  className='state'
                    type='radio'
                    value='False'
                    name="app"
                    id="b"
                    checked={selectedAnswer === 'False'}
                    onChange={handleOptionChange}
                  />
                  <label className="label" for="b">
                    <div className="indicator"></div>
                    <span className="text">Fake News</span>
                  </label>
              </div>
            </div>
            <div className='div-oapql'>
              <Button variant='primary' type='submit' onClick={checkAnswer} className='button-17'>
                Ok
              </Button>
              <Button onClick={getNewQuiz} variant='light' style={{ marginLeft: '10px' }} className='button-17'>
                Get New Quiz
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <ToastContainer />
    </>
  );
}

export default NewsQuiz;
