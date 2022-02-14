import react from 'react';

export default function SelectButton(props) {
  const style = {
    backgroundColor: props.isSelected ? 'blue' : 'red',
  };

  return (
    <div className="container text-center select-button" style={style}>
      <span>{props.answer}</span>
    </div>
  );
}
