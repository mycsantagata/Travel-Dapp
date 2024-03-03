import {Card} from 'react-bootstrap'
import { useAccount, useDisconnect , useBalance} from 'wagmi';
import {Button} from 'react-bootstrap';
import {formatEther} from 'viem';
import { useEffect } from 'react';

const BalanceBoard: React.FC = () => {
  const {disconnect} = useDisconnect();
  const {address} = useAccount();

  const balance = useBalance({
    address: address
  });

  useEffect(() => {
  }, [address]);

  const balanceEther = formatEther(balance?.data?.value ?? BigInt(0))
  const formattedBalance = (+balanceEther).toFixed(4);

  return (
    <Card className='border-3 border-dark shadows mb-5 enlarge'>
  <Card.Body className="d-flex justify-content-between">
    <div className='balanceBoard-title'><h2>Travel Dapp</h2></div>
    <div className="d-flex">
      <h3 style={{marginRight: '40px'}}>Balance: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/16px-Ethereum_logo_2014.svg.png"/> {formattedBalance}</h3>
      <Button variant='primary' onClick={() => disconnect()}>Disconnect</Button>
    </div>
  </Card.Body>
</Card>
  )
}

export default BalanceBoard