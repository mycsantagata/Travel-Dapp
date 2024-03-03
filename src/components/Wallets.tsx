import { useConnect } from 'wagmi'
import { Button } from 'react-bootstrap'
import '../css/wallet.css'


const Wallets: React.FC = () => {
const { connectors, connect } = useConnect()
  return (
    <div>
    {connectors.map((connector) => (
    <Button className='mb-4'id='buttonWallet' variant='primary' key={connector.uid} onClick={() => connect({ connector })}>
    <img src={connector.icon} />
    {connector.name}
    </Button>
    
  ))}
    </div>
  )
}

export default Wallets