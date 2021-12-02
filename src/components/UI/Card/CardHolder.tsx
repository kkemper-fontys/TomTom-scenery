const CardHolder: React.FC<any> = (props) => {
  return (
    <div className={`cardholder ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

export default CardHolder;
