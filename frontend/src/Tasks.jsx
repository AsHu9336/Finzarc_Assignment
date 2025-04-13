import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks({ username, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks?username=${username}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, title: newTask }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const completeTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "PATCH" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };
  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <>
      <div className="flex flex-row justify-between" style={{ padding: 20 }}>
        <h1 className="text-3xl font-bold" style={{ padding: 10 }}>
          Welcome, {username}
        </h1>
        <h1 className="text-3xl text-center font-bold " style={{ padding: 10 }}>
          Task Manager
        </h1>
        <button
          className="text-2xl text-center font-bold border rounded-xl px-6 py-2"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>

      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 ">
          <p class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Want to Add More Tasks?
          </p>

          <form>
            <label class="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
              <input
                class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                required=""
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New Task"
              />
              <button
                // type="submit"
                class="w-full md:w-auto px-6 py-2 text-black active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                onClick={addTask}
              >
                Add Task
              </button>
            </label>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-center font-bold " style={{ padding: 10 }}>
          Pending Tasks{" "}
        </h1>
      </div>
      <div
        className="flex flex-row mx-auto max-w-7xl sm:px-6 lg:px-8"
        style={{ padding: 20 }}
      >
        {incompleteTasks.map((task) => (
          <div
            class="mt-2 mx-2 flex flex-col flex-wrap justify-center items-center gap-4"
            key={task.id}
          >
            <div
              href="#"
              class="flex mt-2 h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
            >
              <div class="flex flex-row items-center justify-between w-full px-2">
                <div class="mb-2 text-lg text-gray-400 font-bold">
                  {task.title}
                </div>
                <div class="flex items-end space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <div>
                    <input
                      type="checkbox"
                      id={`taskCheckbox-${task.id}`}
                      name="taskCheckbox"
                      checked={task.completed}
                      onChange={() => completeTask(task.id)}
                      class="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                  <div
                    class="flex flex-row items-center justify-center"
                    onClick={() => deleteTask(task.id)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-3xl text-center font-bold " style={{ padding: 10 }}>
          Completed Tasks{" "}
        </h1>
      </div>
      <div
        className="flex flex-row mx-auto max-w-7xl sm:px-6 lg:px-8"
        style={{ padding: 20 }}
      >
        {completedTasks.map((task) => (
          <div
            class="mt-2 mx-2 flex flex-col flex-wrap justify-center items-center gap-4"
            key={task.id}
          >
            <div
              href="#"
              class="flex mt-2 h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
            >
              <div class="flex flex-row items-center justify-between w-full px-2">
                <div class="mb-2 text-lg text-gray-400 font-bold">
                  {task.title}
                </div>
                <div class="flex items-end space-x-2 rounded p-2 hover:bg-gray-100 accent-teal-600">
                  <div>
                    <input
                      type="checkbox"
                      id={`taskCheckbox-${task.id}`}
                      name="taskCheckbox"
                      checked={task.completed}
                      onChange={() => completeTask(task.id)}
                      class="h-4 w-4 rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                  <div
                    class="flex flex-row items-center justify-center"
                    onClick={() => deleteTask(task.id)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </>
  );
}

export default Tasks;
