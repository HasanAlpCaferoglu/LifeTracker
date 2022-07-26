import { useState } from "react";
import { useDispatch } from "react-redux";
import {createGoal} from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState([]);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({text}))
    setText('')
  };

  return (
    <section className="w-full mx-auto">
      <form onSubmit={onSubmit}>
        <div className="mb-2.5 flex flex-col items-center">
          <input
            className="w-full border border-[#e6e6e6] p-2.5 rounded-xl mb-10px text-inherit"
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mb-2.5">
          <button type="submit" className="w-full mb-5 py-2.5 px-5 rounded-xl bg-gray-500 text-[#fff] font-bold text-base cursor-pointer text-center flex items-center justify-center hover:scale-[0.98]" >
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
