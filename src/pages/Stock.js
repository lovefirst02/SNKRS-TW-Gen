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
          <Card id={item.merchProduct.styleColor} className='box' style={{ width: '400px', marginLeft: '10px' }}>
            <Card.Img id={item.merchProduct.styleColor} src={item.imageUrls.productImageUrl} to />
            <Card.Body>
              <Card.Title style={{ color: 'white' }}>{item.merchProduct.labelName}</Card.Title>
              <Card.Text style={{ color: 'white' }}>
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
                  <a
                    class='btn btn-info'
                    href={`https://www.nike.com/tw/launch/t/${item.productContent.slug}`}
                    role='button'
                    target='_blank'
                    style={{ marginLeft: '50px' }}
                  >
                    點我去SNKRS頁面
                  </a>
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
                  variant='secondary'
                  style={{ margin: '2px' }}
                  className='btn-lg'
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
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center'>
        <div className='shoe col-3'>
          <B s={pd} />
          <Card className='text-center text-white' style={{ background: '#5f5f64' }}>
            <Card.Header as='h5'>說明</Card.Header>
            <Card.Body style={{ margin: '25px' }}>
              <Card.Text>於抽籤連結欄點擊你想要的尺寸，即跳出網頁</Card.Text>
              <footer style={{ margin: 'auto', fontSize: '10px' }}>Made by Cody#3850</footer>
              <a
                class='btn btn-icon btn-twitter'
                href='https://twitter.com/jiouhaowang'
                target='_blank'
                style={{ marginTop: '15px' }}
              >
                <i class='fa fa-twitter'></i>
                <span>Twitter</span>
              </a>
            </Card.Body>
          </Card>
        </div>
        <div className='col-4 justify-content-center align-items-center'>
          <Card className='text-center text-white' style={{ margin: '10px', background: '#5f5f64' }}>
            <Card.Header as='h5'>尺碼-庫存</Card.Header>
            <Card.Body style={{ margin: '25px' }}>
              <Card.Text>
                <Level s={pd} />
              </Card.Text>
              <footer style={{ margin: '30px', fontSize: '10px' }}>Made by Cody#3850</footer>
            </Card.Body>
          </Card>
        </div>
        <div className='col-4 justify-content-center align-items-center'>
          <Card className='text-center text-white' style={{ margin: '10px', background: '#5f5f64' }}>
            <Card.Header as='h5'>抽籤連結</Card.Header>
            <Card.Body style={{ margin: '62px' }}>
              <ButtonGroup vertical>
                <Gen s={pd} />
              </ButtonGroup>
              <footer style={{ margin: '30px', fontSize: '10px' }}>Made by Cody#3850</footer>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Stock;
