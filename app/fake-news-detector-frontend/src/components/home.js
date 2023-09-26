import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Header from './header';
import { Check2, X } from 'react-bootstrap-icons';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  document.title = 'FND | Home';
  let stage = 1;

  const initialState = {
    id: null,
    news_category: '',
    prediction: false,
    publication_date: '',
    section_id: '',
    title: '',
    type: '',
    web_url: ''
  }

  const [liveNewsData, setLiveNewsData] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [selectedNewsData, setSelectedNewsData] = useState(initialState);

  // Function to fetch live news data
  const fetchLiveNewsData = () => {
    Axios.get('http://127.0.0.1:8000/api/live/')
      .then((response) => {
        setLiveNewsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  // Fetch initial live news data on component mount
  useEffect(() => {
    fetchLiveNewsData();

    const intervalId = setInterval(() => {
      fetchLiveNewsData();

    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const infoAboutNews = (newsId) => {
    Axios.get('http://127.0.0.1:8000/api/live/' + newsId + "/")
      .then((response) => {
        console.log(response.data);
        setSelectedNewsId(newsId);
        setSelectedNewsData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const clearSelectedNews = () => {
    setSelectedNewsId(null);
  };

  return (
    <>
      <Header activeContainer={stage} />
      <Container className="home-container">
        <div className="live-news-container-header">
          <img src={process.env.PUBLIC_URL + '/live.gif'} height={30} className="logo-image" alt="Live News" />
        </div>

        <Container className="live-news-container">
            {liveNewsData.map((item) => (
              <div
              className={`live-news-title-container ${
                selectedNewsId === item.id ? 'selected-news' : ''
              }`}
              key={item.id}
              onClick={() => {
                if (selectedNewsId === item.id) {
                  clearSelectedNews();
                } else {
                  infoAboutNews(item.id);
                }
              }}
            >
                <div className="live-news-title">{item.title}</div>
                <div className="live-news-prediction">
                  {item.prediction === true ? (
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div>
                  ) : (
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>
                  )}
                  {selectedNewsId === item.id ? (
                        <div className='selected-news-additional-info'>
                            <table>
                                <tr>News Category: 
                                    <td>{selectedNewsData.news_category}</td>
                                </tr>
                                <tr>Publication Date: 
                                    <td>{selectedNewsData.publication_date}</td>
                                </tr>
                                <tr>Section ID: 
                                    <td>{selectedNewsData.section_id}</td>
                                </tr>
                                <tr>Title: 
                                    <td>{selectedNewsData.title}</td>
                                </tr>
                                <tr>Type: 
                                    <td>{selectedNewsData.type}</td>
                                </tr>
                                <tr>Web Url:
                                    <td><a href={selectedNewsData.web_url} target='_blank' rel="noreferrer">{selectedNewsData.web_url}</a></td>
                                </tr>
                            </table>
                        </div>
                   
                ) : null}


                </div>
              </div>
            ))}
        </Container>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Home;
