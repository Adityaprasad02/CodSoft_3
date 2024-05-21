import { useContext } from "react";
import { createContext } from "react";

export  const TodoContext = createContext({
 Todos : [   //arrays 
 {
    id : 1 ,
    todo : "The msg",
    completed : false,
 }
 ],
 addTodo : (todo) => {},
 deleteTodo : (id) => {},
 updateTodo : (id,todo) => {},
 toggleComplete : (id) => {},
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider    