import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Header from './header';
import { Check2, X } from 'react-bootstrap-icons';
import Axios, { all } from 'axios';
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
      <div className="live-news-container-header">
          <img src={process.env.PUBLIC_URL + '/live.gif'} height={30} className="logo-image" alt="Live News" />
        </div>
      { liveNewsData.length > 0 ? (
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
                  {new Date(liveNewsData[0].publication_date).getDay()}/{new Date(liveNewsData[0].publication_date).getMonth()}/{new Date(liveNewsData[0].publication_date).getFullYear()} {new Date(liveNewsData[0].publication_date).getHours()}:{new Date(liveNewsData[0].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[0].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>

                 
                 
               </Row>
             </Col>
             <Col>
             <div>
              <div className='div-ipsdf'>
                 {liveNewsData[1].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[1].img_url} width={500} height={200}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[1].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[1].publication_date).getDay()}/{new Date(liveNewsData[1].publication_date).getMonth()}/{new Date(liveNewsData[1].publication_date).getFullYear()} {new Date(liveNewsData[1].publication_date).getHours()}:{new Date(liveNewsData[1].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[1].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
              </div>
             </Col>
           </Row>
           <Row className='news-row-2'>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[2].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[2].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[2].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[2].publication_date).getDay()}/{new Date(liveNewsData[2].publication_date).getMonth()}/{new Date(liveNewsData[2].publication_date).getFullYear()} {new Date(liveNewsData[2].publication_date).getHours()}:{new Date(liveNewsData[2].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[2].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[3].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[3].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[3].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[3].publication_date).getDay()}/{new Date(liveNewsData[3].publication_date).getMonth()}/{new Date(liveNewsData[3].publication_date).getFullYear()} {new Date(liveNewsData[3].publication_date).getHours()}:{new Date(liveNewsData[3].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[3].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[4].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[4].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[4].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[4].publication_date).getDay()}/{new Date(liveNewsData[4].publication_date).getMonth()}/{new Date(liveNewsData[4].publication_date).getFullYear()} {new Date(liveNewsData[4].publication_date).getHours()}:{new Date(liveNewsData[4].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[4].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[5].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[5].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[5].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[5].publication_date).getDay()}/{new Date(liveNewsData[5].publication_date).getMonth()}/{new Date(liveNewsData[5].publication_date).getFullYear()} {new Date(liveNewsData[5].publication_date).getHours()}:{new Date(liveNewsData[5].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[5].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
           </Row>
           <Row className='news-row-3'>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[6].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[6].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[6].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[6].publication_date).getDay()}/{new Date(liveNewsData[6].publication_date).getMonth()}/{new Date(liveNewsData[6].publication_date).getFullYear()} {new Date(liveNewsData[6].publication_date).getHours()}:{new Date(liveNewsData[6].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[6].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[7].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[7].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[7].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[7].publication_date).getDay()}/{new Date(liveNewsData[7].publication_date).getMonth()}/{new Date(liveNewsData[7].publication_date).getFullYear()} {new Date(liveNewsData[7].publication_date).getHours()}:{new Date(liveNewsData[7].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[7].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[8].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[8].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[8].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[8].publication_date).getDay()}/{new Date(liveNewsData[8].publication_date).getMonth()}/{new Date(liveNewsData[8].publication_date).getFullYear()} {new Date(liveNewsData[8].publication_date).getHours()}:{new Date(liveNewsData[8].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[8].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                  </Col>
                  <Col sm>
                  <div className='div-olapq'>
                  {liveNewsData[9].img_url === 'None' ? null : (
                  <Row>
                    <img src={liveNewsData[9].img_url} width={300} height={150}></img>
                    </Row>
                 )}
                 <Row>
                    <h5>{liveNewsData[9].title}</h5>
                 </Row>
                 </div>
                 <div className='div-kjpql'>
                  <div>
                  {new Date(liveNewsData[9].publication_date).getDay()}/{new Date(liveNewsData[9].publication_date).getMonth()}/{new Date(liveNewsData[9].publication_date).getFullYear()} {new Date(liveNewsData[9].publication_date).getHours()}:{new Date(liveNewsData[9].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {liveNewsData[9].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
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
                  <div className='div-olapq'>
                {mustSeeNews[0].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[0].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[0].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(mustSeeNews[0].publication_date).getDay()}/{new Date(mustSeeNews[0].publication_date).getMonth()}/{new Date(mustSeeNews[0].publication_date).getFullYear()} {new Date(mustSeeNews[0].publication_date).getHours()}:{new Date(mustSeeNews[0].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {mustSeeNews[0].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {mustSeeNews[1].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[1].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row className='row-lpapo'>
                  <h5>{mustSeeNews[1].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(mustSeeNews[1].publication_date).getDay()}/{new Date(mustSeeNews[1].publication_date).getMonth()}/{new Date(mustSeeNews[1].publication_date).getFullYear()} {new Date(mustSeeNews[1].publication_date).getHours()}:{new Date(mustSeeNews[1].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {mustSeeNews[1].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {mustSeeNews[2].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[2].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[2].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(mustSeeNews[2].publication_date).getDay()}/{new Date(mustSeeNews[2].publication_date).getMonth()}/{new Date(mustSeeNews[2].publication_date).getFullYear()} {new Date(mustSeeNews[2].publication_date).getHours()}:{new Date(mustSeeNews[2].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {mustSeeNews[2].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {mustSeeNews[3].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[3].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[3].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(mustSeeNews[3].publication_date).getDay()}/{new Date(mustSeeNews[3].publication_date).getMonth()}/{new Date(mustSeeNews[3].publication_date).getFullYear()} {new Date(mustSeeNews[3].publication_date).getHours()}:{new Date(mustSeeNews[3].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {mustSeeNews[3].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
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
                <div className='div-olapq'>
                {allNews[0].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[0].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[0].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(allNews[0].publication_date).getDay()}/{new Date(allNews[0].publication_date).getMonth()}/{new Date(allNews[0].publication_date).getFullYear()} {new Date(allNews[0].publication_date).getHours()}:{new Date(allNews[0].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {allNews[0].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {allNews[1].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[1].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[1].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(allNews[1].publication_date).getDay()}/{new Date(allNews[1].publication_date).getMonth()}/{new Date(allNews[1].publication_date).getFullYear()} {new Date(allNews[1].publication_date).getHours()}:{new Date(allNews[1].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {allNews[1].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {allNews[2].img_url === 'None' ? null : (
                <Row>
                  <img src={allNews[2].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{allNews[2].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(allNews[2].publication_date).getDay()}/{new Date(allNews[2].publication_date).getMonth()}/{new Date(allNews[2].publication_date).getFullYear()} {new Date(allNews[2].publication_date).getHours()}:{new Date(allNews[2].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {allNews[2].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
                <Col sm>
                <div className='div-olapq'>
                {mustSeeNews[3].img_url === 'None' ? null : (
                <Row>
                  <img src={mustSeeNews[3].img_url} width={300} height={150}></img>
                  </Row>
                )}
                <Row>
                  <h5>{mustSeeNews[3].title}</h5>
                </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                  {new Date(mustSeeNews[3].publication_date).getDay()}/{new Date(mustSeeNews[3].publication_date).getMonth()}/{new Date(mustSeeNews[3].publication_date).getFullYear()} {new Date(mustSeeNews[3].publication_date).getHours()}:{new Date(mustSeeNews[3].publication_date).getMinutes()}
                    
                  </div>
                  <div className='div-kpqsa'>
                    {mustSeeNews[3].prediction === true ? 
                    <div className='real-news-prediction'>
                      <Check2 /> Predicted as Real News
                    </div> : 
                    <div className='fake-news-prediction'>
                      <X /> Predicted as Fake News
                    </div>}
                  </div>
                 </div>
                </Col>
          </Row>
        </Container>

          : null 
        }
      </Container>
     
        
        
      </Container>
      <ToastContainer />
    </>
  );
}

export default Home;
