import React, { useState } from "react";
import "./formInfo.css";

interface IFormProps {
    msgType: "success" | "fail";
    formMsg: string
    isVisible: boolean,
    setVisible: (value:boolean) => void
}


export const FormInfo: React.FC<IFormProps> = ({msgType , formMsg, isVisible, setVisible}) => {
    
    const [autoClose] = useState(true)
    const [autoCloseTime] = useState(5000)


    const handleClose = () => {
        setVisible(!isVisible);
    };

    React.useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseTime]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`form-info ${msgType}`}>
            <div className="info">
                {formMsg}
            </div>
            <div className="button">
                <button onClick={handleClose} aria-label="Close">
                    <img src="./imgs/form-info-button.png" alt="Close Icon" />
                </button>
            </div>
        </div>
    );
}
