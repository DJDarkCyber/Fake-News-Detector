import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Check2, X } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';



import Axios from 'axios';

import Header from './header';

const CategoryContainer = () => {
  const { category } = useParams();

  const [newsData, setNewsData] = useState([]);

  const fetchNewsData = () => {

    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    Axios.get('http://127.0.0.1:8000/api/category/' + capitalizedCategory + '/')
      .then((response) => {

        console.log('API response:', response);
        setNewsData(response.data);
        console.log('News data:', response.data);
        console.log(response.data.length);
        
        if (response.data.length < 10) {

          toast.error("Not enough data");

        }    

      })
      .catch((error) => {

        console.error('Error', error);

      }
    );

  }
  
  useEffect(() => {
    console.log('Category:', category);
    fetchNewsData();
    
  }, [category]);

  


  return (
    <>
      <Header activeContainer={1}/>
      { newsData.length > 9 ? (
        <Container className='new-news-container'>
          
          <Row className='news-row'>
            <Col xs={12} md={8}>
              <Row className='nr-fkmwq'>
                <div className='div-oakpq'>
                  <Col xs={6} md={4} className='cl-ksmao'>
                    <h4 className='h-fowjs'>{newsData[0].title}</h4>
                  </Col>
                  { newsData[0].img_url === 'None' ? 
                  null :
                    (
                      <Col>
                        <img src={newsData[0].img_url}/>
                      </Col>
                    )
                  }
                </div>
                <div className='div-kjpql'>
                  <div>
                    { new Date(newsData[0].publication_date).getDay()}/{new Date(newsData[0].publication_date).getMonth()}/{new Date(newsData[0].publication_date).getFullYear()} {new Date(newsData[0].publication_date).getHours()}:{new Date(newsData[0].publication_date).getMinutes() }
                  </div>
                  <div className='div-kpqsa'>
                    { newsData[0].prediction === true ? 
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
                  { newsData[1].img_url === 'None' ? null : (
                  <Row>
                    <img src={newsData[1].img_url} width={500} height={200}></img>
                    </Row>
                  ) }
                  <Row>
                    <h5>{newsData[1].title}</h5>
                  </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                    { new Date(newsData[1].publication_date).getDay()}/{new Date(newsData[1].publication_date).getMonth()}/{new Date(newsData[1].publication_date).getFullYear()} {new Date(newsData[1].publication_date).getHours()}:{new Date(newsData[1].publication_date).getMinutes() }
                  </div>
                  <div className='div-kpqsa'>
                    { newsData[1].prediction === true ? 
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

          <Row className='news-row-2'>
            {newsData.slice(2, 6).map((news, index) => (
              <Col sm key={index}>
                <div className='div-olapq'>
                  {news.img_url !== 'None' && (
                    <Row>
                      <img src={news.img_url} width={300} height={150} alt={`News ${index} Image`} />
                    </Row>
                  )}
                  <Row>
                    <h5>{news.title}</h5>
                  </Row>
                </div>
                <div className='div-kjpql'>
                  <div>
                    {`${new Date(news.publication_date).getDay()}/${new Date(news.publication_date).getMonth()}/${new Date(news.publication_date).getFullYear()} ${new Date(news.publication_date).getHours()}:${new Date(news.publication_date).getMinutes()}`}
                  </div>
                  <div className='div-kpqsa'>
                    {news.prediction ? (
                      <div className='real-news-prediction'>
                        <Check2 /> Predicted as Real News
                      </div>
                    ) : (
                      <div className='fake-news-prediction'>
                        <X /> Predicted as Fake News
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="news-row-3">
            {newsData.slice(6, 10).map((news, index) => (
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
        ):
        "Not Enough news to display"
      }

      <ToastContainer />
    </>
  );
};

export default CategoryContainer;
