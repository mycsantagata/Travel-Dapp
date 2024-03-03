import { Button, Card, Col, Row } from 'react-bootstrap'
import HandleTransaction from './HandleTransaction';
import { useState } from 'react';

interface CardItem {
  id: number
  city: string;
  image: string;
  price: string;
}

interface CardListProps {
  cardList: CardItem[];
}

const Trips: React.FC<CardListProps> = ({ cardList }) => {
  const [show, setShow] = useState<boolean>(false);
  
  const handleModalShow = () => setShow(true)
  const handleModalClose = () => {
    setShow(false)
    window.location.reload(); 
  } 

  return (
    <>
      <Row>
        {cardList.map((card: CardItem) => (
          <Col key={card.id} lg={4} xs={12}>
            <Card className='border-3 border-dark shadows enlarge mb-5'>
              <Card.Img variant="top" style={{ height: '220px' }} src={card.image} />
              <Card.Body>
                <Card.Title>{card.city}</Card.Title>
                <h5> <img style={{marginRight: '8px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/16px-Ethereum_logo_2014.svg.png"/>{card.price}</h5>
                <Button variant="primary" onClick={handleModalShow}>Purchase</Button>
                <HandleTransaction price={card.price} showModal={show} onClose={handleModalClose}/>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Trips