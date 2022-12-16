import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList : React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
	return (
		// <div className="todos">
		// 	{todos.map((todo) => (
		// 		<SingleTodo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
		// 	))}
		// </div>
		<div className="container">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => (
					<div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
						<span className="todos__heading">
							Active Tasks
						</span>
						{todos.map((todo, index) => (
							<SingleTodo index={index} todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
						))}
						{provided.placeholder}
					</div>				
				)}
			</Droppable>
			<Droppable droppableId="TodosRemove">
				{(provided, snapshot) => (
					<div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
						<span className="todos__heading">
							Completed Tasks
						</span>
						{completedTodos.map((todo, index) => (
							<SingleTodo index={index} todo={todo} todos={todos} setTodos={setCompletedTodos} key={todo.id} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
		)
}

export default ToDoList;