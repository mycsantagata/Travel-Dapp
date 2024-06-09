import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { parseEther } from 'viem';

interface IHandleTransactionProps {
    price: string;
    showModal: boolean;
    onClose: () => void;
}

const HandleTransaction: React.FC<IHandleTransactionProps> = ({ price, showModal, onClose }) => {

    const { data: hash, error, sendTransaction, isPending } = useSendTransaction();
    const { isLoading, isSuccess } = useWaitForTransactionReceipt({hash}); 
    
    const handleSendTransaction = async () =>{
       try{
            sendTransaction({to: import.meta.env.VITE_WC_ADDRESS_TO, 
                value: parseEther(price)});

        }catch(err){
            console.log("Transaction err: "+err);
        }      
    }

    const isTransactionInProgress = isPending || isLoading;
    const showInitialMessage = !isPending && !isLoading && !isSuccess && !error;

    return (
        <Modal show={showModal} centered onHide={onClose} backdrop="static" backdropClassName="modal-backdrop-glass">
            <Modal.Header>
                <Modal.Title>Confirm Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {showInitialMessage &&
                <div className="text-center">
                    <p>Are you sure you want to continue with the transaction?</p>
                </div>
            }
            {isTransactionInProgress && 
                <div className="text-center">
                    <Spinner animation="border" role="status"/>
                    <p>Loading...</p>
                </div>
            }
            {isSuccess &&
                <div className="text-center">
                    <p>Transaction confirmed</p>
                </div>    
            }
            {error &&
                <div className="text-center">
                    <p>Something went wrong! Try again.</p>
                </div>
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" disabled={isTransactionInProgress ? true : false}  onClick={onClose}>Cancel</Button>
                <Button variant="primary" disabled={isTransactionInProgress ? true : false} onClick={ !isSuccess ? handleSendTransaction : onClose}>OK</Button>        
            </Modal.Footer>
        </Modal>
    )
}

export default HandleTransaction
