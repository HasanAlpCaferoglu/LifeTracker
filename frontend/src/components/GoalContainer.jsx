import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";
import Spinner from "./Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import { FaPlusCircle, FaWindowClose } from "react-icons/fa";

function GoalContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    // reset the goals state on unmount when we leave the dashboard
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-2">
      <div className=" flex flex-col items-center mx-4 bg-yellow-500 rounded-3xl p-2">
        <section className="text-[2rem] font-bold mb-4 px-5">
          <p className="text-purple-500">Long Term Goals</p>
        </section>

        {openForm ? (
          <div className="flex flex-col items-center justify-center w-11/12 bg-slate-300 p-4 rounded-xl">
            <div className="flex items-start justify-between w-full">
              <p className="w-full text-left ml-[3px] mb-2">Add Goal</p>
              <button
                onClick={() => setOpenForm(!openForm)}
                className=" text-2xl"
              >
                <FaWindowClose />
              </button>
            </div>
            <GoalForm />
          </div>
        ) : (
          <button
            className="flex items-center justify-center rounded-full px-2 cursor-pointer bg-slate-300"
            onClick={() => setOpenForm(!openForm)}
          >
            <FaPlusCircle />
            <p className="ml-2 align-text-bottom">Add Goal</p>
          </button>
        )}

        <section className="w-10/12 mt-4">
          {goals.length > 0 ? (
            <div className="flex flex-col ">
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </section>
      </div>
    </div>
  );
}

export default GoalContainer;
