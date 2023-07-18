import { useState } from "react";
import { Message } from "@/interfaces/message";

const useMessage = () => {
    const [type, setType] = useState<string>("SUCCESS");
    const [timeout, setTimeout] = useState<number>(3000);
    const [title, setTitle] = useState<string>("Successfully updated profile");
    const [message, setMessage] = useState<string>("Your changes have been saved and your profile is live. Your team can make edits.");
    const [isShow, setIsShow] = useState<boolean>(false);
    const [buttonLabel, setButtonLabel] = useState<string>('');
    const [onButtonClick, setOnButtonClick] = useState<((data: any) => void)>((data: any) => { });
    const [hasButton, setHasButton] = useState<boolean>(false);

    return {
        type,
        timeout,
        message,
        title,
        isShow,
        buttonLabel,
        hasButton,
        onButtonClick,
        setType,
        setTimeout,
        setMessage,
        setTitle,
        setIsShow,
        setOnButtonClick,
        setButtonLabel,
        setHasButton,
    };
}

export default useMessage;