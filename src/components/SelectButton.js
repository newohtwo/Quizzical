import react from 'react';

export default function SelectButton(props) {
  const style = {
    backgroundColor: props.isSelected ? 'blue' : 'white',
  };

  //FIGURE OUT HOW TO HAVE HIGHLIGHT AND AND A SELECT ONE OF THE BUTTONS THING
  //ALSO MAYBE MAKE THE CHECK FOR ANSWERS INTERNAL AND NOT EXTERNAL,
  //SEND TO EACH BUTTON THE ANSWER OR SEND EACH BUTTON THE TEXT TO APP TO SEE IF IT IS CORRECT
  // function checkAnswer(text , id){
  //   if text === answer
  //   return true,
  //   return false,

  // }

  return (
    <div>
      {/* <span className="">{props.answer}</span> */}
      <button className="text-center  answer btn btn-outline-primary mt-1">
        {props.answer}
      </button>
    </div>
  );
}
