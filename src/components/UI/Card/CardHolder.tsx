// this function just makes a grid for the category cards
const CardHolder: React.FC<any> = (props) => {
  return (
    <div className={`cardholder ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

export default CardHolder;
