import * as React from "react"
import themeStore from './stores/ThemeStore'
import todoStore from './stores/TodoStore'
import { set, get } from "idb-keyval";

get('todos').then((res) => {
  if (res) {
    res.map(todo => {
      todoStore.add(todo)
    })
  }
  todoStore.remove(todoStore.todos[0].id)
})


export const context = React.createContext({ themeStore, todoStore })
export const useStore = () => React.useContext(context)