import React, { useEffect } from 'react'
import { observer } from "mobx-react-lite"
import TodoView from './TodoView'
import { useStore } from '../context'
import ThemeChanger from './ThemeChanger'
import AppHeader from './AppHeader'


const ListView = () => {
  const { todoStore } = useStore()
  const { todos, add, notDone } = todoStore
  const ref = React.createRef()
  const handleChange = (e) => {
  }

  return (
    <div id='listContainer'>
      <ThemeChanger />

      <AppHeader />
      <div id='list'>
        {todos.map((todo, index) => (
          <div className='list-item' key={todo.id} id={todo.id} onMouseOver={handleChange} onMouseOut={handleChange}>
            <span className='dragTarget hide' ref={ref}>⠿</span>
            <TodoView key={todo.id} todo={todo} />
          </div>
        ))}
      </div>
      <p>
        {/* <button id='addButton' onClick={add}>+</button> */}
        <span style={{ float: 'right' }}>not done {notDone}</span>
      </p>
    </div >
  )

}
export default observer(ListView)