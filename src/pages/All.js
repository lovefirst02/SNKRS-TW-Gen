import React, { useState, useEffect } from 'react';
import Time from '../componet/time';
import { Link } from 'react-router-dom';
import { Card, Accordion, Button } from 'react-bootstrap';
import '../social.css';

const api =
  'https://api.nike.com/product_feed/threads/v2/?anchor=0&count=50&filter=marketplace%28TW%29&filter=language%28zh-Hant%29&filter=upcoming%28true%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29';

function Products() {
  const [allPd, setAllPd] = useState([]);
  const [sku, setSku] = useState();

  const getSnkrs = () => {
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        setAllPd(json.objects);
      });
  };

  useEffect(() => {
    getSnkrs();
  }, []);

  const All = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) => (
          <Link
            to={{ pathname: `/${item.merchProduct.id}`, state: { modal: true } }}
            target='_self'
            style={item.merchProduct.styleColor === '136064-140' ? { display: 'none' } : {}}
          >
            <Card id={item.merchProduct.styleColor} className='box'>
              <Card.Img id={item.merchProduct.styleColor} src={item.imageUrls.productImageUrl} to />
              <Card.Body>
                <Card.Title style={{ color: 'black' }}>{item.merchProduct.labelName}</Card.Title>
                <Card.Text>
                  <p>{item.merchProduct.styleColor}</p>
                  <Time props={item.merchProduct.id} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))
      )}
    </>
  );

  return (
    <>
      <div className='row bgh'>
        <All s={allPd} />
      </div>
      <div className='col-4 offset-4'>
        <Card className='text-center text-white' style={{ margin: '50px', background: '#5f5f64' }}>
          <Card.Header as='h5'>說明</Card.Header>
          <Card.Body style={{ margin: '10px' }}>
            <Card.Text>點擊產品即可進入產品庫存與抽籤連結頁面</Card.Text>
            <footer style={{ margin: '10px', fontSize: '10px' }}>Made by Cody#3850</footer>
            <a class='btn btn-icon btn-twitter' href='https://twitter.com/jiouhaowang' target='_blank'>
              <i class='fa fa-twitter'></i>
              <span>Twitter</span>
            </a>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Products;
