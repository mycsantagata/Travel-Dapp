import {Card} from 'react-bootstrap'
import { useAccount, useDisconnect , useBalance} from 'wagmi';
import {Button} from 'react-bootstrap';
import {formatEther} from 'viem';

const BalanceBoard: React.FC = () => {
  const {disconnect} = useDisconnect();
  const {address, chain} = useAccount();

  const balance = useBalance({
    address: address
  });

  const balanceEther = formatEther(balance?.data?.value ?? BigInt(0))
  const formattedBalance = (+balanceEther).toFixed(4);

  return (
<Card className='border-3 border-dark shadows mb-5 enlarge'>
      <Card.Body className="d-flex justify-content-between">
        <div className='balanceBoard-title'>
          <h2>Travel Dapp</h2>
        </div>
        <div className="d-flex align-items-center">
          <h5 style={{ marginRight: '20px' }}>
            Address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </h5>
          <h5 style={{ marginRight: '20px' }}>
            Network: {chain?.name ?? 'Unknown Network'}
          </h5>
          <h5 style={{ marginRight: '20px' }}>
            Balance: {chain?.nativeCurrency.symbol} {formattedBalance}
          </h5>
          <Button variant='primary' onClick={() => disconnect()}>Disconnect</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BalanceBoard
