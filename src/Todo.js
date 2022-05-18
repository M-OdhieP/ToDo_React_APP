import { useState } from "react";
import shogun from "./raiden_shogun.gif";

function Todo() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  function generateId() {
    return Date.now();
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });
    setTodos(filteredTodos);
    if (edit.id) {
      cancelEditHandler();
    }
  }
  function editTodoHandler(todo) {
    console.log(todo);
    setActivity(todo.activity);
    setEdit(todo);
    return;
  }

  function cancelEditHandler() {
    setActivity("");
    setEdit({});
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const currentTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id === todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[currentTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
    console.log(updatedTodos);
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setMessage("Nama Aktivitas Harus diisi");
    }
    setMessage("");

    if (edit.id) {
      const updateTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updateTodo;

      console.log(updatedTodos);
      setTodos(updatedTodos);
      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
        done: false,
      },
    ]);
    setActivity("");
  }

  return (
    <>
      <div className="text-center mt-4">
        <img
          src={shogun}
          alt=""
          className="mb-2 rounded-2"
          style={{ height: "25vh" }}
        />
        <h1>
          ToDo List <i className="bi bi-plus-circle-dotted"></i>
        </h1>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-12 col-lg-8">
          <form onSubmit={saveTodoHandler}>
            {message && <p className="text-danger  text-center"> {message}</p>}

            <div className="input-group mb-2">
              <input
                type="text"
                placeholder="nama Aktifitas"
                className="form-control me-2 ms-1 rounded-0"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
              <button className="btn btn-light rounded-0 m-0 me-1">
                {edit.id ? "Simpan Perubahan" : "Tambah"}
              </button>
              {edit.id && (
                <button
                  className="btn btn-light rounded-0 m-0 ms-1 me-1"
                  onClick={cancelEditHandler}
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
          {todos.length > 0 ? (
            <ul className="list-group list-group-flush ms-1 me-1">
              {todos.map(function (todo) {
                return (
                  <li class="list-group-item" key={todo.id}>
                    <div className="row">
                      <div className="col-1 col-lg-1 text-end">
                        <input
                          class="form-check-input me-1"
                          type="checkbox"
                          checked={todo.done}
                          onChange={doneTodoHandler.bind(this, todo)}
                        />
                      </div>
                      <div className="col-7 col-lg-9">
                        <p
                          className={
                            todo.done
                              ? "text-decoration-line-through p-0 m-0 fw-bold"
                              : "p-0 m-0 fw-bold"
                          }
                        >
                          {todo.activity}{" "}
                          {todo.done && (
                            <i
                              style={{ color: "black" }}
                              className="text-dark bi bi-check2-square"
                            ></i>
                          )}
                        </p>
                      </div>
                      <div className="col-4 col-lg-2 text-end">
                        <button
                          className="btn btn-dark m-0 p-0 px-2 me-2"
                          onClick={editTodoHandler.bind(this, todo)}
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-dark m-0 p-0 px-2"
                          onClick={removeTodoHandler.bind(this, todo.id)}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="h5 text-center">
              <i>Tidak Ada Todo</i>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
export default Todo;
