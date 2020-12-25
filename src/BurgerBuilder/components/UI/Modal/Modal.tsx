import React from 'react';
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

interface IModalProps {
    children?: JSX.Element[] | JSX.Element | string | null;
    show: boolean;
    modalClosed: () => void;

}

const Modal = (props: IModalProps) => {
    return (
        <>
            <Backdrop show={props.show} onClick={props.modalClosed} />
            <div className={classes.Modal}
                 style={{
                     transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.show ? 1 : 0,
                 }} >
                {props.children}
            </div >
        </>
    );
};

export default React.memo(Modal, ((prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}));
