import react from 'react';
import Quastion from './Quastion';
import data from './tempData';
import { nanoid } from 'nanoid';
export default function triviaQuastions(props) {
  console.log(data);
  return (
    <div>
      <Quastion
        key={nanoid()}
        incorrectAnswer={data.results[0].incorrect_answers}
        correctAnswer={data.results[0].correct_answer}
        quastion={data.results[0].question}
      ></Quastion>
    </div>
  );
}

//TODO make the select only 1 option to work, also style it abit to be button looking like and cricrly
//make it so u can select the asnwer and know what is selected
//generate 5 quastins on the page and style them to look nice
//test api call on the quastions
//test if then u can figure out what is wrong and right
//style it more
//add page flipping functionaliy?
