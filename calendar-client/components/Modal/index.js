import styles from './modal.module.css';

const Modal = ({ children }) => {
  return <div className={styles.popUp}>{children}</div>;
};

export default Modal;
