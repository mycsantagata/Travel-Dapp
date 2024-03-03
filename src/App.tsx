import Login from "./components/Login"
import BalanceBoard from "./components/BalanceBoard"
import { Container} from "react-bootstrap"
import { useAccount} from 'wagmi';
import Trips from "./components/Trips";
import tripList from "./json/trips.json"


const App: React.FC = () => {
  const { isConnected } = useAccount();

  return (
      <Container className="jumbotron text-center">
        {!isConnected && <Login/>}
        {isConnected && <BalanceBoard/>}
        {isConnected && <Trips cardList={tripList}/>}
      </Container>
  )
}

export default App
