import react, { useEffect } from 'react';

export default function SelectButton(props) {
  function disabledBtn() {
    return (
      <button disabled className={`text-center  btn btn-outline-primary`}>
        {props.text}
      </button>
    );
  }

  function successBtn() {
    return (
      <button className={`text-center  btn btn-success`}>{props.text}</button>
    );
  }

  function dangerBtn() {
    return (
      <button className={`text-center  btn btn-danger `}>{props.text}</button>
    );
  }

  function generateButton() {
    if (props.isDisabled) {
      return disabledBtn();
    }

    if (props.isClicked) {
      if (props.text === props.correctAnswer) {
        return successBtn();
      } else {
        return dangerBtn();
      }
    }

    return (
      <button
        onClick={() => props.click(props.index, props.id)}
        className={`text-center  btn btn-outline-primary `}
      >
        {props.text}
      </button>
    );
  }

  return <div>{generateButton()}</div>;
}
