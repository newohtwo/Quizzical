import { nanoid } from 'nanoid';
//TODO might be able to optimize by using memo and building its own object for the ui and using that
export default function Dots(props) {
  function createDots() {
    let arr = [];
    for (let index = 0; index < props.dotSize; index++) {
      if (index === props.index) {
        arr.push(<li key={nanoid()} className="dots__item_active"></li>);
      } else {
        arr.push(<li key={nanoid()} className="dots__item"></li>);
      }
    }

    return arr;
  }

  return <ul className="dots mb-2">{createDots()}</ul>;
}
