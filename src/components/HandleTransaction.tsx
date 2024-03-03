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
            sendTransaction({to: import.meta.env.VITE_WC_ADDRESS_TO, value: parseEther(price)});
        }catch(err){
            console.log("Transaction err: "+err);
        }      
    }

    return (
        <Modal show={showModal} centered onHide={onClose} backdrop="static" backdropClassName="modal-backdrop-glass">
            <Modal.Header>
                <Modal.Title>Confirm Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {!isPending && !isSuccess && !isLoading && !error &&
                <div className="text-center">
                    <p>Are you sure you want to continue with the transaction?</p>
                </div>
            }
            {(isPending || isLoading) && 
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
                <Button variant="secondary" disabled={isPending || isLoading ? true : false}  onClick={onClose}>Annulla</Button>
                <Button variant="primary" disabled={isPending || isLoading ? true : false} onClick={ !isSuccess ? handleSendTransaction : onClose}>OK</Button>        
            </Modal.Footer>
        </Modal>
    )
}

export default HandleTransaction