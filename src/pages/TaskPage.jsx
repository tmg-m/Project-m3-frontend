import Task from "../components/Task";
import '../css/base.css'

function TaskPage() {

  return (
    <div>
      <h1 className="page-title">My tasks</h1>
      <Task />
    </div>
  );
}

export default TaskPage;
