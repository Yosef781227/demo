export enum MessageType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
}

export interface Message {
    type: string;
    timeout: number;
    title: string;
    message: string;
    isShow: boolean;
    setType: (value: string) => void;
    setTimeout: (value: number) => void;
    setMessage: (value: string) => void;
    setTitle: (value: string) => void;
    setIsShow: (value: boolean) => void;
}