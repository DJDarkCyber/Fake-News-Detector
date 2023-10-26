import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Check2, X } from 'react-bootstrap-icons';


import Axios from 'axios';

import Header from './header';

const CategoryContainer = () => {
  const { category } = useParams();

  const [newsData, setNewsData] = useState([]);

  

  const fetchNewsData = () => {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)
    Axios.get('http://127.0.0.1:8000/api/category/' + capitalizedCategory + '/')
      .then((response) => {
        console.log('API response:', response);
        setNewsData(response.data);
        console.log('News data:', response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  
  useEffect(() => {
    console.log('Category:', category);
    fetchNewsData();
  }, [category]);


  return (
    <>
        <Header activeContainer={1}/>
        {newsData.length > 9 ? (
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
                   {new Date(newsData[0].publication_date).getDay()}/{new Date(newsData[0].publication_date).getMonth()}/{new Date(newsData[0].publication_date).getFullYear()} {new Date(newsData[0].publication_date).getHours()}:{new Date(newsData[0].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[0].prediction === true ? 
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
                  {newsData[1].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[1].img_url} width={500} height={200}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[1].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[1].publication_date).getDay()}/{new Date(newsData[1].publication_date).getMonth()}/{new Date(newsData[1].publication_date).getFullYear()} {new Date(newsData[1].publication_date).getHours()}:{new Date(newsData[1].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[1].prediction === true ? 
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
                   {newsData[2].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[2].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[2].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[2].publication_date).getDay()}/{new Date(newsData[2].publication_date).getMonth()}/{new Date(newsData[2].publication_date).getFullYear()} {new Date(newsData[2].publication_date).getHours()}:{new Date(newsData[2].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[2].prediction === true ? 
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
                   {newsData[3].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[3].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[3].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[3].publication_date).getDay()}/{new Date(newsData[3].publication_date).getMonth()}/{new Date(newsData[3].publication_date).getFullYear()} {new Date(newsData[3].publication_date).getHours()}:{new Date(newsData[3].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[3].prediction === true ? 
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
                   {newsData[4].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[4].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[4].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[4].publication_date).getDay()}/{new Date(newsData[4].publication_date).getMonth()}/{new Date(newsData[4].publication_date).getFullYear()} {new Date(newsData[4].publication_date).getHours()}:{new Date(newsData[4].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[4].prediction === true ? 
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
                   {newsData[5].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[5].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[5].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[5].publication_date).getDay()}/{new Date(newsData[5].publication_date).getMonth()}/{new Date(newsData[5].publication_date).getFullYear()} {new Date(newsData[5].publication_date).getHours()}:{new Date(newsData[5].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[5].prediction === true ? 
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
                   {newsData[6].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[6].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[6].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[6].publication_date).getDay()}/{new Date(newsData[6].publication_date).getMonth()}/{new Date(newsData[6].publication_date).getFullYear()} {new Date(newsData[6].publication_date).getHours()}:{new Date(newsData[6].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[6].prediction === true ? 
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
                   {newsData[7].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[7].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[7].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[7].publication_date).getDay()}/{new Date(newsData[7].publication_date).getMonth()}/{new Date(newsData[7].publication_date).getFullYear()} {new Date(newsData[7].publication_date).getHours()}:{new Date(newsData[7].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[7].prediction === true ? 
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
                   {newsData[8].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[8].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[8].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[8].publication_date).getDay()}/{new Date(newsData[8].publication_date).getMonth()}/{new Date(newsData[8].publication_date).getFullYear()} {new Date(newsData[8].publication_date).getHours()}:{new Date(newsData[8].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[8].prediction === true ? 
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
                   {newsData[9].img_url === 'None' ? null : (
                   <Row>
                     <img src={newsData[9].img_url} width={300} height={150}></img>
                     </Row>
                  )}
                  <Row>
                     <h5>{newsData[9].title}</h5>
                  </Row>
                  </div>
                  <div className='div-kjpql'>
                   <div>
                   {new Date(newsData[9].publication_date).getDay()}/{new Date(newsData[9].publication_date).getMonth()}/{new Date(newsData[9].publication_date).getFullYear()} {new Date(newsData[9].publication_date).getHours()}:{new Date(newsData[9].publication_date).getMinutes()}
                     
                   </div>
                   <div className='div-kpqsa'>
                     {newsData[9].prediction === true ? 
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
        ):
        "Not Enough news to display"
        }
    </>
  );
};

export default CategoryContainer;
