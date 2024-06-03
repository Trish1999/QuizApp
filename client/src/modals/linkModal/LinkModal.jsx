import React,{useState} from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../linkModal/LinkModal.module.css";
import "../../modals/Custom-styling.css";

function LinkModal(props) {
    const { close, open ,link,refresh, close1,close2} = props;
         
    function handleShare(){
           navigator.clipboard.writeText(link)
      .then(() => {
        toast.info("Link copied to clipboard")
        close();
        close1();
        close2();
        refresh();
      })
      .catch((error) => {
        toast.error('Error copying link: ', error);
      });
    };


return(
     <div>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <Modal open={open} onClose={close} center
              classNames={{
                  modal: 'customModal1',
              }}>
              
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Congrats your Quiz is Published!</h2>
                </div>
                <div className={styles.input}>
                 <input
                     type="text"
                     name="link"
                        readonly="readonly"
                        value={link}
                     style={{
                         padding: "0.5rem",
                         border: "none",
                         width: "20rem",
                         backgroundColor:"#E7E7F5",
                         borderRadius: "0.4rem",
                         marginBottom:"2rem"}}
                    />
                    </div>
                    <div className={styles.button}>
               <button className={styles.btn} onClick={handleShare}>Share</button>
</div>
                    
          </div>
        </Modal>
        </div>
)
}

export default LinkModal
