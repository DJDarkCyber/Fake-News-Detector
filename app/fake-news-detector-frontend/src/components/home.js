import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Header from './header';
import { Check2, X } from 'react-bootstrap-icons';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  document.title = 'News Guardian | Home';
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
  const [mustSeeNews, setMustSeeNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  const categories = ['Sport', 'Lifestyle', 'Arts'];

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
    
    Axios.get('http://127.0.0.1:8000/api/category/News/')
    .then((response) => {
      setMustSeeNews(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error', error);
    });

    const fetchPromises = categories.map((category) => {
      return Axios.get(`http://127.0.0.1:8000/api/category/${category}/`)
        .then((response) => {
          if (response.data.length > 0) {
            return response.data[0]; // Return the news data
          }
        })
        .catch((error) => {
          console.error('Error', error);
        });
    });
    
    // Use Promise.all to handle all promises
    Promise.all(fetchPromises)
      .then((newsData) => {
        // Filter out undefined values (failed requests)
        const filteredNewsData = newsData.filter((data) => data !== undefined);
        setAllNews(filteredNewsData);
        console.log('All news fetched and added.');
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

  let newsData = [];
  newsData = liveNewsData;

  return (
    <>
      <Header activeContainer={stage} />
      <Container className="home-container">
      { liveNewsData.length > 0 ? (
         <Container className='new-news-container'>
           <Row className='news-row'>
             <Col xs={12} md={8}>
               <Row className='nr-fkmwq'>
                 <Col xs={6} md={4} className='cl-ksmao'>
                   <h4 className='h-fowjs'>{liveNewsData[0].title}</h4>
                 </Col>
                 { liveNewsData[0].img_url === 'None' ? 
                 null :
                    (
                      <Col>
                        <img src={liveNewsData[0].img_url}/>
                      </Col>
                    )
                 }

                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[0].publication_date).getDay()}/{new Date(liveNewsData[0].publication_date).getMonth()}/{new Date(liveNewsData[0].publication_date).getFullYear()} {new Date(liveNewsData[0].publication_date).getHours()}:{new Date(liveNewsData[0].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[0].prediction === true ? "Predicted as Real News" : "Predicted as Fake News"}
                  </div>
                 </div>

                 
                 
               </Row>
             </Col>
             <Col>
                 {liveNewsData[1].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[1].img_url} width={500} height={200}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[1].title}</h5>
                 </Row>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[1].publication_date).getDay()}/{new Date(liveNewsData[1].publication_date).getMonth()}/{new Date(liveNewsData[1].publication_date).getFullYear()} {new Date(liveNewsData[1].publication_date).getHours()}:{new Date(liveNewsData[1].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[1].prediction === true ? "Predicted as Real News" : "Predicted as Fake News"}
                  </div>
                 </div>
                 
             </Col>
           </Row>
           <Row>
                  <Col sm>
                  {liveNewsData[2].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[2].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[2].title}</h5>
                 </Row>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[2].publication_date).getDay()}/{new Date(liveNewsData[2].publication_date).getMonth()}/{new Date(liveNewsData[2].publication_date).getFullYear()} {new Date(liveNewsData[2].publication_date).getHours()}:{new Date(liveNewsData[2].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[2].prediction === true ? "Predicted as Real News" : "Predicted as Fake News"}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  {liveNewsData[3].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[3].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[3].title}</h5>
                 </Row>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[3].publication_date).getDay()}/{new Date(liveNewsData[3].publication_date).getMonth()}/{new Date(liveNewsData[3].publication_date).getFullYear()} {new Date(liveNewsData[3].publication_date).getHours()}:{new Date(liveNewsData[3].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[3].prediction === true ? "Predicted as Real news" : "Predicted as Fake news"}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  {liveNewsData[4].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[4].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[4].title}</h5>
                 </Row>
                  </Col>
                  <Col sm>
                  {liveNewsData[5].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[5].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[5].title}</h5>
                 </Row>
                  </Col>
           </Row>
           <Row>
                  <Col sm>
                  {liveNewsData[6].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[6].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[6].title}</h5>
                 </Row>
                  </Col>
                  <Col sm>
                  {liveNewsData[7].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[7].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[7].title}</h5>
                 </Row>
                  </Col>
                  <Col sm>
                  {liveNewsData[8].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[8].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[8].title}</h5>
                 </Row>
                  </Col>
                  <Col sm>
                  {liveNewsData[9].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[9].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[9].title}</h5>
                 </Row>
                  </Col>
           </Row>
         </Container>
         )
         : 
         null
      }

      <div className='heading-title'>
        <h3 className='heading-word'>Must See</h3>
        <hr></hr>
      </div>

      { mustSeeNews.length > 0 ?

        <Container>
          <Row>
                <Col sm>
                {mustSeeNews[0].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[0].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[0].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {mustSeeNews[1].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[1].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[1].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {mustSeeNews[2].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[2].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[2].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {mustSeeNews[3].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[3].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[3].title}</h5>
                </Row>
                </Col>
          </Row>
        </Container>

          : null 
        }

      <div className='heading-title'>
        <h3 className='heading-word'>All news</h3>
        <hr></hr>
      </div>

      <Container>
      { allNews.length > 0 ?

        <Container>
          <Row>
                <Col sm>
                {allNews[0].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[0].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[0].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {allNews[1].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[1].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[1].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {allNews[2].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[2].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[2].title}</h5>
                </Row>
                </Col>
                <Col sm>
                {mustSeeNews[3].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[3].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[3].title}</h5>
                </Row>
                </Col>
          </Row>
        </Container>

          : null 
        }
      </Container>
     
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
