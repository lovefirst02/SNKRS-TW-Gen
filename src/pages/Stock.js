import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Time from '../componet/time';
import StockLevel from '../componet/level';
import { v4 as uuid4 } from 'uuid';
import { Button, Card, ButtonGroup } from 'react-bootstrap';
import useLaunhId from '../componet/launchId';

const api =
  'https://api.nike.com/product_feed/threads/v2/?anchor=0&count=50&filter=marketplace%28TW%29&filter=language%28zh-Hant%29&filter=upcoming%28true%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29';

function Stock() {
  const { state = {} } = useLocation();
  const { modal } = state;
  const [pd, setPd] = useState([]);
  let { id } = useParams();
  const { lid } = useLaunhId(id);
  const { status } = useLaunhId(id);

  const getSnkrs = () => {
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        json.objects.map((item) => {
          item.productInfo.map((i) => {
            if (i.merchProduct.id === id) {
              setPd([item]);
            }
          });
        });
      });
  };

  useEffect(() => {
    getSnkrs();
  }, []);

  const P = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) => (
          <div id={item.merchProduct.styleColor} className='box'>
            <p>{item.merchProduct.labelName}</p>
            <br></br>
            <p>{item.merchProduct.styleColor}</p>
            <br></br>
            <Time props={item.merchProduct.id} />
            <img id={item.merchProduct.styleColor} src={item.imageUrls.productImageUrl} to />
          </div>
        ))
      )}
    </>
  );

  const B = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) => (
          <Card id={item.merchProduct.styleColor} className='box'>
            <Card.Img id={item.merchProduct.styleColor} src={item.imageUrls.productImageUrl} to />
            <Card.Body>
              <Card.Title>{item.merchProduct.labelName}</Card.Title>
              <Card.Text>
                <p>{item.merchProduct.styleColor}</p>
                <Time props={item.merchProduct.id} />
                <p
                  style={
                    status === 'LAUNCH_CLOSED'
                      ? { color: 'red', fontSize: '20px' }
                      : status === 'NOT_ACCEPTING_ENTRIES'
                      ? { color: 'yellow', fontSize: '20px' }
                      : { color: 'green', fontSize: '20px' }
                  }
                >
                  {status === 'LAUNCH_CLOSED'
                    ? '關閉投籤'
                    : status === 'NOT_ACCEPTING_ENTRIES'
                    ? '尚未接受投籤'
                    : '開放投籤'}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );

  const Level = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) =>
          item.skus.map(({ id, countrySpecifications, nikeSize }) => (
            <>
              {countrySpecifications.map(({ localizedSize, localizedSizePrefix }) => (
                <p>
                  US {nikeSize} -- {localizedSize} {localizedSizePrefix} -- <StockLevel id={id} />
                </p>
              ))}
            </>
          ))
        )
      )}
    </>
  );

  const Gen = ({ s }) => (
    <>
      {s.map(({ productInfo }) =>
        productInfo.map((item) =>
          item.launchView !== null ? (
            item.skus.map(({ id, countrySpecifications, nikeSize }) =>
              countrySpecifications.map(({ localizedSize }) => (
                <Button
                  href={`https://gs.nike.com/?checkoutId=${uuid4()}&launchId=${lid}&skuId=${id}&country=TW&locale=zh-Hant&appId=com.nike.commerce.snkrs.web&returnUrl=https://www.nike.com/tw/launch/t/${
                    item.productContent.slug
                  }/`}
                  target='_blank'
                  variant='link'
                  style={{ height: '35px' }}
                >
                  US {nikeSize} -- {localizedSize}
                </Button>
              ))
            )
          ) : (
            <p>無抽籤資訊</p>
          )
        )
      )}
    </>
  );

  return (
    <div className='shoe'>
      <B s={pd} />
      <Card className='shoestock' style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className='text-center'>尺碼-庫存</Card.Title>
          <Card.Text style={{ fontSize: '21px' }}>
            <Level s={pd} />
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className='link'>
        <Card.Body>
          <Card.Title className='text-center text-justify align-middle'>抽籤連結</Card.Title>
          <Card.Text style={{ margin: 'auto' }}>
            <ButtonGroup vertical>
              <Gen s={pd} />
            </ButtonGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Stock;
