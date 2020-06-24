import React, { useState, useEffect } from 'react';
import Time from '../componet/time';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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

  const handleClick = (e) => {
    setSku(e.target.id);
    const c = [...allPd];
    c.map((item) => {
      item.productInfo.map((i) => {
        if (i.merchProduct.styleColor === sku) {
          setAllPd([item]);
        }
      });
    });
  };

  useEffect(() => {
    getSnkrs();
  }, []);

  const All = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) => (
          <Link to={{ pathname: `/${item.merchProduct.id}`, state: { modal: true } }} target='_self'>
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

  return <All s={allPd} />;
}

export default Products;
