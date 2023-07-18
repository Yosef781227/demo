export enum MessageType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
}

export interface Message {
    buttonLabel: string;
    onButtonClick: (data: any) => void;
    hasButton: boolean;
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
    setButtonLabel: (value: string) => void;
    setOnButtonClick: (value: (data: any) => void) => void;
    setHasButton: (value: boolean) => void;
}