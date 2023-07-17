import { useState } from "react";
import { Message } from "@/interfaces/message";

const useMessage = () => {
    const [type, setType] = useState<string>("SUCCESS");
    const [timeout, setTimeout] = useState<number>(3000);
    const [title, setTitle] = useState<string>("Successfully updated profile");
    const [message, setMessage] = useState<string>("Your changes have been saved and your profile is live. Your team can make edits.");
    const [isShow, setIsShow] = useState<boolean>(false);
    return {
        type,
        timeout,
        message,
        title,
        isShow,
        setType,
        setTimeout,
        setMessage,
        setTitle,
        setIsShow,
    };
}

export default useMessage;