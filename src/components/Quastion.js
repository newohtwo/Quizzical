import react from 'react';
import SelectButton from './SelectButton';
import { nanoid } from 'nanoid';

export default function Quastion(props) {
  //randomize array indexes
  function shuffleArray(array) {
    const tempArray = array;
    for (var i = tempArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }
    return tempArray;
  }

  function answers() {
    const answers = shuffleArray([
      ...props.incorrectAnswer,
      props.correctAnswer,
    ]);

    return answers.map((answer) => {
      return <SelectButton key={nanoid()} answer={answer} isSelected={false} />;
    });
  }

  return (
    <div className="container mt-4">
      <p className="fw-bold">{props.quastion} </p>
      <div className="container d-sm-flex justify-content-around ">
        {answers()}
      </div>
    </div>
  );
}
