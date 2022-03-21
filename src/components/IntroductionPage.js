import react from 'react';
import data from './triviaCategoriesData';
//most likely i can generalise the select options

export default function IntroductionPage(props) {
  // const [quastionsNum, setQuastionsNum] = react.useState(5);
  // const [difficulty, setDifficulty] = react.useState('Easy');
  // const [category, setCategory] = react.useState(data[0].id);

  const [form, setForm] = react.useState({
    quastionNum: 5,
    difficulty: 'easy',
    category: '9',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  }

  //initalize categories from data
  function initCategories() {
    return data.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  }

  return (
    <div className="container ">
      <div className="container text-center">
        <h1 className="pt-4">Quizzical</h1>
        <p>Trivia game about anything and everything!</p>
      </div>

      <div className="container ms-5  fw-bold">
        <h3>Game Settings:</h3>
        <div>
          <label className="game-setting-select">
            Number Of Quastions:
            <select
              className="form-select"
              onChange={handleChange}
              name="quastionNum"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>

        <div>
          <label className="game-setting-select">
            Difficulty:
            <select
              className="form-select"
              onChange={handleChange}
              name="difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>

        <div>
          <label className="game-setting-select">
            Category:
            <select
              className="form-select"
              onChange={handleChange}
              name="category"
            >
              {initCategories()}
            </select>
          </label>
        </div>

        <input
          className="start-btn mt-2 fw-bold"
          type="submit"
          value="Start Game!"
          onClick={() => props.createApiCall(form)}
        />
      </div>
    </div>
  );
}
