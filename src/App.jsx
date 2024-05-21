import { useEffect, useState } from 'react';
import './App.css'
import { TodoProvider } from './contexts/todocontext'
import TodoItem from './contexts/components/todoItem';
import TodoForm from './contexts/components/todoForm';
function App() {
const [Todos,SetTodos] = useState([]);
const addTodo = (todo) => {
  SetTodos((prev) =>[{id : Date.now(),...todo},...prev])
}

const deleteTodo = (id) => { 
  SetTodos((prev) => [prev.filter((todo)=>{
    if(todo.id!==id){
      return;
    }
  }
)])}

const updateTodo = (id,todo) => {
  SetTodos((prev) => [prev.map((prevTodo) => {
   if(prevTodo.id==id){
    return todo
   } else{ return prevTodo}
  })])
}

const toggleComplete = (id) => {
  //console.log(id);
  SetTodos((prev) => 
  prev.map((prevTodo) => 
    prevTodo.id === id ? { ...prevTodo, 
      completed: !prevTodo.completed } : prevTodo))
}


//LOCAL Storage ConceptX    todos --> Strings --> Arrays
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("Todos"))
  if(todos && todos.length > 0 ) {
    SetTodos(todos)
  }
},[])

useEffect(() => {
  localStorage.setItem("todos" , JSON.stringify("Todos"))
}, [Todos])

return (
    <TodoProvider value={{Todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
      <div className="bg-[#043022] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white font-mono">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos : A Todo List</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {Todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
