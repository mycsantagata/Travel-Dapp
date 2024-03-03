import {useState, useEffect} from 'react'
import '../css/home.css'
import Wallets from './Wallets';
import { Card}  from 'react-bootstrap';


const cities: string[] = ['New York', 'Tokyo', 'London', 'Paris', 'Rome', 'Sydney', 'Dubai', 'Moscow', 'Los Angeles', 'Berlin'];

const Home: React.FC = () => {
    const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
  
  useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
        }, 2000);
        return () => clearInterval(intervalId);
      }, []);

  return (
    <>
      <h1 className='display-1 text-white  mb-5 font-bold'>Travel Dapp</h1>
      <Card className="border-3 border-dark shadows p-3 rounded enlarge">
        <h1 className="display-2"><b>Book your next trip...</b></h1>
        <p className="text-fade display-2">{cities[currentCityIndex]}</p>
        <Wallets/>
      </Card>
      </>  
       
         
  )
}

export default Home