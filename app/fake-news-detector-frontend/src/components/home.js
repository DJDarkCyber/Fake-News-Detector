import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header';
import { Check2, X } from 'react-bootstrap-icons';
import Axios from 'axios';

function Home() {
  document.title = 'News Guardian | Home';
  let stage = 1;

  const [liveNewsData, setLiveNewsData] = useState([]);
  const [mustSeeNews, setMustSeeNews] = useState([]);
  const [allNews, setAllNews] = useState([]);

  const categories = ['Sport', 'Lifestyle', 'Arts', 'News'];

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

  let newsData = [];
  newsData = liveNewsData;

  return (
    <>
      <Header activeContainer={stage} />
      <Container className="home-container">
        <div className="live-news-container-header">
          <img src={process.env.PUBLIC_URL + '/live.gif'} height={30} className="logo-image" alt="Live News" />
        </div>
        { liveNewsData.length >= 10 ? (
          <Container className='new-news-container'>
            <Row className='news-row'>
              <Col xs={12} md={8}>
                <Row className='nr-fkmwq'>
                  <div className='div-oakpq'>
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
                  </div>
                  <div className='div-kjpql'>
                    <div>
                      { new Date(liveNewsData[0].publication_date).getDay()}/{new Date(liveNewsData[0].publication_date).getMonth()}/{new Date(liveNewsData[0].publication_date).getFullYear()} {new Date(liveNewsData[0].publication_date).getHours()}:{new Date(liveNewsData[0].publication_date).getMinutes() }
                      
                    </div>
                    <div className='div-kpqsa'>

                      { liveNewsData[0].prediction === true ? 
                        <div className='real-news-prediction'>
                          <Check2 /> Predicted as Real News
                        </div> : 
                        <div className='fake-news-prediction'>
                          <X /> Predicted as Fake News
                        </div>
                      }

                    </div>
                  </div>
                </Row>
              </Col>
              <Col>
                <div>
                  <div className='div-ipsdf'>
                    { liveNewsData[1].img_url === 'None' ? null : (
                      <Row>
                        <img src={liveNewsData[1].img_url} width={500} height={200}></img>
                        </Row>
                    ) }
                    <Row>
                        <h5>{liveNewsData[1].title}</h5>
                    </Row>
                  </div>
                  <div className='div-kjpql'>
                    <div>
                      { new Date(liveNewsData[1].publication_date).getDay()}/{new Date(liveNewsData[1].publication_date).getMonth()}/{new Date(liveNewsData[1].publication_date).getFullYear()} {new Date(liveNewsData[1].publication_date).getHours()}:{new Date(liveNewsData[1].publication_date).getMinutes() }
                    </div>
                    <div className='div-kpqsa'>
                      { liveNewsData[1].prediction === true ? 
                          <div className='real-news-prediction'>
                            <Check2 /> Predicted as Real News
                          </div> : 
                          <div className='fake-news-prediction'>
                            <X /> Predicted as Fake News
                          </div>
                      }
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            
            <Row className="news-row-2">
              {liveNewsData.slice(2, 6).map((news, index) => (
                <Col sm key={index}>
                  <div className="div-olapq">
                    {news.img_url !== 'None' && (
                      <Row>
                        <img src={news.img_url} width={300} height={150} alt={`News ${index + 2} Image`} />
                      </Row>
                    )}
                    <Row>
                      <h5>{news.title}</h5>
                    </Row>
                  </div>
                  <div className="div-kjpql">
                    <div>
                      {`${new Date(news.publication_date).getDay()}/${new Date(news.publication_date).getMonth()}/${new Date(news.publication_date).getFullYear()} ${new Date(news.publication_date).getHours()}:${new Date(news.publication_date).getMinutes()}`}
                    </div>
                    <div className="div-kpqsa">
                      {news.prediction ? (
                        <div className="real-news-prediction">
                          <Check2 /> Predicted as Real News
                        </div>
                      ) : (
                        <div className="fake-news-prediction">
                          <X /> Predicted as Fake News
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <hr />

            <Row className="news-row-3">
              {liveNewsData.slice(6, 10).map((news, index) => (
                <Col sm key={index}>
                  <div className="div-olapq">
                    {news.img_url !== 'None' && (
                      <Row>
                        <img src={news.img_url} width={300} height={150} alt={`News ${index + 6} Image`} />
                      </Row>
                    )}
                    <Row>
                      <h5>{news.title}</h5>
                    </Row>
                  </div>
                  <div className="div-kjpql">
                    <div>
                      {`${new Date(news.publication_date).getDay()}/${new Date(news.publication_date).getMonth()}/${new Date(news.publication_date).getFullYear()} ${new Date(news.publication_date).getHours()}:${new Date(news.publication_date).getMinutes()}`}
                    </div>
                    <div className="div-kpqsa">
                      {news.prediction ? (
                        <div className="real-news-prediction">
                          <Check2 /> Predicted as Real News
                        </div>
                      ) : (
                        <div className="fake-news-prediction">
                          <X /> Predicted as Fake News
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

          </Container>
          )
          : 
          "Not enough data to display :("
        }

        <div className='heading-title'>
          <h3 className='heading-word'>Must See</h3>
          <hr></hr>
        </div>

        {
          mustSeeNews.length >= 4 ? (
            <Container>
              <Row>
                {mustSeeNews.slice(0, 4).map((news, index) => (
                  <Col sm key={index}>
                    <div className="div-olapq">
                      {news.img_url !== "None" ? (
                        <Row>
                          <img src={news.img_url} width={300} height={150} alt={`Must-See News ${index} Image`} />
                        </Row>
                      ) : null}
                      <Row>
                        <h5>{news.title}</h5>
                      </Row>
                    </div>
                    <div className="div-kjpql">
                      <div>
                        {`${new Date(news.publication_date).getDay()}/${new Date(news.publication_date).getMonth()}/${new Date(news.publication_date).getFullYear()} ${new Date(news.publication_date).getHours()}:${new Date(news.publication_date).getMinutes()}`}
                      </div>
                      <div className="div-kpqsa">
                        {news.prediction ? (
                          <div className="real-news-prediction">
                            <Check2 /> Predicted as Real News
                          </div>
                        ) : (
                          <div className="fake-news-prediction">
                            <X /> Predicted as Fake News
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            "Not enough data to display"
          )
        }

        <div className='heading-title'>
          <h3 className='heading-word'>All news</h3>
          <hr></hr>
        </div>

        <Container>
          {allNews.length >= 4 ? (
            <Container>
              <Row>
                {allNews.slice(0, 4).map((news, index) => (
                  <Col sm key={index}>
                    <div className="div-olapq">
                      {news.img_url !== "None" ? (
                        <Row>
                          <img
                            src={news.img_url}
                            width={300}
                            height={150}
                            alt={`All News ${index} Image`}
                          />
                        </Row>
                      ) : null}
                      <Row>
                        <h5>{news.title}</h5>
                      </Row>
                    </div>
                    <div className="div-kjpql">
                      <div>
                        {`${new Date(news.publication_date).getDay()}/${
                          new Date(news.publication_date).getMonth()
                        }/${new Date(news.publication_date).getFullYear()} ${new Date(
                          news.publication_date
                        ).getHours()}:${new Date(news.publication_date).getMinutes()}`}
                      </div>
                      <div className="div-kpqsa">
                        {news.prediction ? (
                          <div className="real-news-prediction">
                            <Check2 /> Predicted as Real News
                          </div>
                        ) : (
                          <div className="fake-news-prediction">
                            <X /> Predicted as Fake News
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            "Not enough data to display"
          )}
        </Container>

      </Container>
    </>
  );
}

export default Home;
