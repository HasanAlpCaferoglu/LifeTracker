import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import { getTodos, reset } from "../features/todos/todoSlice";
import { useState } from "react";
import { FaPlusCircle, FaWindowClose, FaCircle } from "react-icons/fa";

function TodoContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getTodos());

    // reset the todos state on unmount when we leave the dashboard
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-2">
      <div className="flex flex-col items-center mx-4 bg-yellow-500 rounded-3xl p-2">
        <section className="text-[2rem] font-bold mb-2 px-5">
          <p className="text-purple-500">To Do List</p>
        </section>

        {openForm ? (
          <div className="flex flex-col items-center justify-center w-11/12 bg-slate-300 p-4 rounded-xl">
            <div className="flex items-start justify-between w-full">
              <p className="w-full text-left ml-[3px] mb-2">Add To Do Item</p>
              <button onClick={() => setOpenForm(!openForm)} className=" text-2xl">
                <FaWindowClose />
              </button>
            </div>
            <TodoForm />
          </div>
        ) : (
          <button
            className="flex items-center justify-center rounded-full px-2 cursor-pointer bg-slate-300"
            onClick={() => setOpenForm(!openForm)}
          >
            <FaPlusCircle />
            <p className="ml-2 align-text-bottom ">Add To Do Item</p>
          </button>
        )}

        <section className="w-10/12 mt-4">
          {todos.length > 0 ? (
            <div className="flex flex-col ">
              {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
              ))}
            </div>
          ) : (
            <h3>You have not set any To Do</h3>
          )}
        </section>
      </div>
    </div>
  );
}

export default TodoContainer;
