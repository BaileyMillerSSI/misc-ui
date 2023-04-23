interface IErrorMessageProps {
  show: boolean;
  message?: string;
}

const ErrorMessage = ({ show, message }: IErrorMessageProps) =>
  show ? (
    <span className="select-none break-words text-red-500">{message}</span>
  ) : null;

export default ErrorMessage;
