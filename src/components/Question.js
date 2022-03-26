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
    <div className="container question ">
      <p className="fw-bold mb-1 question-text "> {props.question} </p>
      <div className="container  flex-wrap  d-inline-flex  justify-content-around">
        {createPossibleAnswersBtns()}
      </div>
    </div>
  );
}
