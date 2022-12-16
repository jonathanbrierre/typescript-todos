import React, {useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { Todo } from './model';
import './App.css';

// let name: string;
// let age: number | string;  // <- union symbol - used to denote more than one type
// let isStudent: boolean;
// let hobbies: string[];
// let role:[number,string];


// defining a function type;
// let printName: Function  <- this works, but could be done better vvvv
// let printName : (name: string) => void;

// function printName(name: string) {
//   console.log(name);
// }

// printName('jonathan')

// let person: Object;// <-  not recommended as objects tend to have many keys and values of different types;
// use an interface or new type instead!

// type Person = {
//   name: string,
//   age?: number // <- question mark makes the key's presence in the object optional
// }

// let person: Person = {
//   name: 'Jon'
// }

// interface Person {
//   name: string;
//   age: number;
// }

// interface Guy extends Person {
//   profession: string;
// }

// type X = Person & {
//   a: string;
// }

// interface Y extends X {
//   b: boolean;
// }

// let lotsOfPeople : Person[]; // <- an array of person objects



const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo('');
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, active = [...todos], complete = [...completedTodos]

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1)   
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)   
    } else {
      complete.splice(destination.index, 0, add)  
    }

    setCompletedTodos(complete)
    setTodos(active)

  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <ToDoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
