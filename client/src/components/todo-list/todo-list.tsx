import React, { useEffect, useMemo, useState } from "react";
import "./todo-list.scss";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetUserTodosQuery,
  useUpdateTodoMutation,
} from "../../features/todo/todoApiSlice";
import { Todo } from "../../interface/todo";
import { toast } from "react-toastify";

const TodoList = () => {
  const [validations, setValidations] = useState({
    title: true,
    description: true,
  });

  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: "",
    complete: false,
  });

  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data: todosData, isLoading } = useGetUserTodosQuery({});
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [createTodo] = useCreateTodoMutation();

  useEffect(() => {
    if (todosData) {
      //if the list changes clear form
      setTodos(todosData);
    }
  }, [todosData]);

  const toggleTodoAdd = () => {
    if (createOpen)
      setTodo({
        title: "",
        description: "",
        complete: false,
      });

    setCreateOpen(!createOpen);
    //reset validations
    setValidations({
      ...validations,
      title: true,
      description: true,
    });
  };

  const handleTodoChecked = async (todo: Todo, e: any) => {
    const updatedItem = {
      ...todo,
      complete: e.target.checked,
    };

    updateTodo(updatedItem)
      .unwrap()
      .catch(() => {
        toast.error("Failed to update todo", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      });
  };

  const handleTodoCreate = async () => {
    setValidations({
      ...validations,
      title: !!todo.title,
      description: !!todo.description,
    });

    if (!!todo.title === false || !!todo.description === false) {
      return;
    }

    createTodo(todo)
      .unwrap()
      .then(() => {
        setTodo({
          title: "",
          description: "",
          complete: false,
        });
      })
      .catch(() => {
        toast.error("Failed to create todo", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      });
  };

  const handleTodoDelete = async (todo: Todo) => {
    deleteTodo(todo.id!)
      .unwrap()
      .catch(() => {
        toast.error("Failed to delete todo", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          pauseOnFocusLoss: false,
          pauseOnHover: false,
        });
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTodo((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="card-blurred todo-list">
      <div className="todo-header">
        <h2>Todo List</h2>
        <div className="actions">
          {createOpen ? (
            <>
              <div className="btn-submit" onClick={handleTodoCreate}></div>
              <div className="btn-delete" onClick={toggleTodoAdd}></div>
            </>
          ) : (
            <div className="btn-add" onClick={toggleTodoAdd}></div>
          )}
        </div>
      </div>

      <div className={`create-todo ${createOpen ? "open" : ""}`}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            id="title"
            className={`form-control ${validations.title ? "" : "error"}`}
            placeholder=" "
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            id="description"
            name="description"
            className={`form-control ${validations.description ? "" : "error"}`}
            placeholder=""
            value={todo.description}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
        </div>
      </div>

      {!isLoading ? (
        todos.length > 0 ? (
          <ul className="todo-list">
            {todos
              .slice()
              .sort((a, b) => a.id! - b.id!)
              .map((c: Todo) => (
                <li
                  key={`${c.id}_${c.complete}`}
                  className={c.complete ? "todo-complete" : ""}
                >
                  <input
                    className="todo-status"
                    type="checkbox"
                    defaultChecked={c.complete}
                    onChange={(e) => {
                      handleTodoChecked(c, e);
                    }}
                  ></input>
                  <div>
                    <p className="todo-title">{c.title}</p>
                    <p>{c.description}</p>
                  </div>
                  <div
                    className="btn-delete"
                    onClick={() => handleTodoDelete(c)}
                  ></div>
                </li>
              ))}
          </ul>
        ) : (
          <span>No tasks to be done!</span>
        )
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default TodoList;
