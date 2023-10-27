import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header';
import { Container, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { Check2, X } from 'react-bootstrap-icons';


function CheckByTitle() {
  document.title = 'News Guardian | Check news by title';
  let stage = 2;
  const [inputNewsTitle, setNewsTitle] = useState('');
  const [predictedValue, setPredictedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = {
      user_news: inputNewsTitle,
    };

    Axios.post('http://127.0.0.1:8000/api/usercheck/title/', dataToSend)
      .then((response) => {
        if (response.data.prediction === true) {
          setPredictedValue('True');
          toast.success("Real news!");
        } else {
          setPredictedValue('False');
          toast.error("Fake news!", {icon: <X style={{color: 'white', backgroundColor: 'red'}}/>});
        }
      })
      .catch((error) => {
        console.error('Error submitting data: ', error);
        handleErrors(); // Call handleErrors to display the error toast
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const length_error = () => toast.error('Enter some text!');

  const handleErrors = () => {
    if (inputNewsTitle.length < 1) {
      console.log(inputNewsTitle.length);
      length_error(); // Call length_error to display the length error toast
    }
  };

  return (
    <>
      <Header activeContainer={stage} />
      <Container fluid="lg" className="check-by-title-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className='frm-opalq'>News Title</Form.Label>
            <Form.Control
              className='frm-moqpa'
              type="text"
              placeholder="Enter news title..."
              as="textarea"
              rows={5}
              onChange={(e) => setNewsTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='button-17'>
            {isLoading ? 'Checking...' : 'Check'}
          </Button>
        </Form>
      </Container>

      <Container className='prediction-result-container'>

        {predictedValue === 'True' ? (
            <div className='true'><div ><Check2 className='true-news-icon' /></div>Predicted as real news!</div>
        ) : predictedValue === 'False' ? (
            <div className='false'><div ><X className='fake-news-icon' /></div>Predicted as fake news!</div>
        ) : null}

      </Container>
      

      <ToastContainer />
    </>
  );
}

export default CheckByTitle;
