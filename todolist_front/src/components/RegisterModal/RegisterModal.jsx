import React from 'react';
import ReactModal from 'react-modal';
import { useRecoilState } from 'recoil';
import { registerModalAtom } from '../../atoms/modalAtoms';
ReactModal.setAppElement("#root");

function RegisterModal(props) {
    const [ isOpen, setOpen ] = useRecoilState(registerModalAtom);

    const closeModal = () => {
        setOpen(false);
    } 

    return (
        <ReactModal
            style={{
                content: {
                    position: "absolute",
                    boxSizing: "border-box",
                    margin: "0px auto",
                    border: "none",
                    width: "375px",
                    backgroundColor: "transparent",
                }
            }}
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            
        </ReactModal>
    );
}

export default RegisterModal;