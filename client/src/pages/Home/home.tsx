import "./home.scss";
import Weather from "../../components/weather/weather";
import TodoList from "../../components/todo-list/todo-list";

export default function Home() {
  return (
    <div className="todo-container">
      <div className="todo">
        <TodoList />
      </div>
      <div className="weather">
        <Weather />
      </div>
    </div>
  );
}
