import react from 'react';
import SelectButton from './SelectButton';

export default function Question(props) {
  function createPossibleAnswersBtns() {
    return props.buttons.map((button) => {
      return (
        <SelectButton
          key={button.id}
          id={button.id}
          text={button.text}
          correctAnswer={props.correctAnswer}
          isDisabled={button.isDisabled}
          isClicked={button.isClicked}
          click={props.buttonClick}
          index={props.index}
          updateScore={props.updateScore}
        ></SelectButton>
      );
    });
  }

  return (
    <div className="container question">
      <p className="fw-bold mb-1 ">{props.question} </p>
      <div className="container d-sm-flex justify-content-around ">
        {createPossibleAnswersBtns()}
      </div>
    </div>
  );
}
