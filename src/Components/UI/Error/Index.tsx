interface IError {
  msg: string;
  className?: string;
}

const ErrorComponent = ({ msg, className }: IError) => {
  return (
    msg && (
      <p className={`text-red-500 font-medium text-[15px] tracking-wider mt-2 ${className}`}>
        {msg}
      </p>
    )
  );
};

export default ErrorComponent;
