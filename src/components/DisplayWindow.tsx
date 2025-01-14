type DisplayWindowProps = {
  expression: string;
  result: string | number;
};

const DisplayWindow: React.FC<DisplayWindowProps> = ({
  expression,
  result,
}) => {
  return (
    <div className="displayWindow">
      <p className="expression">{expression}</p>
      <p className="result">{result}</p>
    </div>
  );
};

export default DisplayWindow;
