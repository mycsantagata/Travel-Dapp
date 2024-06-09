import { Button, Card, Col, Row } from 'react-bootstrap'
import HandleTransaction from './HandleTransaction';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';

interface CardItem {
  id: number
  city: string;
  image: string;
  price: string;
}

interface CardListProps {
  cardList: CardItem[];
}

const getConversionRate = async (): Promise<number> => {
   const API_KEY = import.meta.env.VITE_WC_CG_API_KEY;
   const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`);

   const ethPrice = response.data['ethereum'].usd;
   const maticPrice = response.data['matic-network'].usd;
   const conversionRate =  ethPrice/ maticPrice;

   return conversionRate;
};

const Trips: React.FC<CardListProps> = ({ cardList }) => {
  const { chain } = useAccount();
  const [show, setShow] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [convertedPrices, setConvertedPrices] = useState<{ [key: number]: string }>({});

  

  useEffect(() => {
    const convertPrices = async () => {
      if (chain && chain.name == 'Polygon')  {

        const newConvertedPrices: { [key: number]: string } = {};
        const rate = await getConversionRate();

        for (const card of cardList) {
            newConvertedPrices[card.id] = (parseFloat(card.price) * rate).toFixed(4);
        }
        
        setConvertedPrices(newConvertedPrices);
      } else {
        setConvertedPrices({});
      }
    };

    convertPrices();
  }, [chain]);
  
  const handleModalShow = (price: string) => {
    setShow(true);
    setSelectedPrice(price);
  }
  const handleModalClose = () => {
    setShow(false)
    window.location.reload(); 
  } 

  return (
    <>
      {chain ? (
        <Row>
          {cardList.map((card: CardItem) => (
            <Col key={card.id} lg={4} xs={12}>
              <Card className='border-3 border-dark shadows enlarge mb-5'>
                <Card.Img variant="top" style={{ height: '220px' }} src={card.image} />
                <Card.Body>
                  <Card.Title>{card.city}</Card.Title>
                  <h5>
                    {chain?.nativeCurrency.symbol} {convertedPrices[card.id] || card.price}
                  </h5>
                  <Button variant="primary" onClick={() => handleModalShow(card.price)}>
                    Purchase
                  </Button>
                  <HandleTransaction price={selectedPrice} showModal={show} onClose={handleModalClose} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col lg={6} xs={12}>
            <Card className='border-3 border-dark shadows enlarge mb-5'>
              <Card.Body>
                <Card.Title className="text-center" style={{marginBottom: '34px'}}>Network not supported</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Trips
