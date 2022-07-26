import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { FaCheckCircle } from "react-icons/fa";

function GoalItem({ goal }) {
    const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-start space-x-2 w-full">
      <div className="w-1/12">
        <FaCheckCircle />
      </div>
      <div className="group bg-[#f4f4f4] rounded-xl my-2.5 flex items-center justify-between w-full group">
        <div className=" w-full h-full flex items-center justify-start pl-3 py-2">
          {goal.text}
        </div>
        <div className="hidden group-hover:block cursor-pointer h-full  bg-red-500 rounded-xl px-5 py-2 ">
          <button onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
