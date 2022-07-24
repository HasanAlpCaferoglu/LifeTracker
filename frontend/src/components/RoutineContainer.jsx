import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RoutineForm from "./RoutineForm";
import RoutineItem from "./RoutineItem";
import Spinner from "./Spinner";
import { getRoutines, reset } from "../features/routines/routineSlice";
import { FaPlusCircle, FaWindowClose } from "react-icons/fa";

function RoutineContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { routines, isLoading, isError, message } = useSelector(
    (state) => state.routines
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getRoutines());

    // reset the routines state on unmount when we leave the dashboard
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-2">
      <div className="flex flex-col items-center mx-4 bg-purple-500 rounded-3xl p-2">
        <section className="text-[2rem] font-bold mb-4] px-5">
          <p className="text-yellow-500">Daily Routines</p>
        </section>

        {openForm ? (
          <div className="flex flex-col items-center justify-center w-11/12 bg-slate-300 p-4 rounded-xl">
            <div className="flex items-start justify-between w-full">
              <p className="w-full text-left ml-[3px] mb-2">Add Routine</p>
              <button
                onClick={() => setOpenForm(!openForm)}
                className=" text-2xl"
              >
                <FaWindowClose />
              </button>
            </div>
            <RoutineForm />
          </div>
        ) : (
          <button
            className="flex items-center justify-center rounded-full px-2 cursor-pointer bg-slate-300"
            onClick={() => setOpenForm(!openForm)}
          >
            <FaPlusCircle />
            <p className="ml-2 align-text-bottom">Add Routine</p>
          </button>
        )}

        <section className="w-10/12 mt-4">
          {routines.length > 0 ? (
            <div className="flex flex-col ">
              {routines.map((routine) => (
                <RoutineItem key={routine._id} routine={routine} />
              ))}
            </div>
          ) : (
            <h3>You have not set any routines</h3>
          )}
        </section>
      </div>
    </div>
  );
}

export default RoutineContainer;
