import { useSelector } from "react-redux";
import GoalContainer from "../components/GoalContainer";
import RoutineContainer from "../components/RoutineContainer";
import TodoContainer from "../components/TodoContainer";
import Footer from "../components/Footer";


function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col">
      <h1 className="text-[2rem] font-bold mb-16 px-5 text-purple-600">
        Be on track with LifeTracker...
      </h1>
      <div className="flex flex-col space-y-4 md:grid sm:grid-cols-3 sm:space-y-0">
        <TodoContainer />
        <RoutineContainer />
        <GoalContainer />
      </div>
    </div>
  );
}

export default Dashboard;
