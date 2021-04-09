import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import ContentEditable from 'react-contenteditable'
import { useStore } from '../context'
import { debounce } from 'lodash'

function TodoView(props) {
  const ref = React.createRef()
  const [current, setCurrent] = useState(0)
  const { todo } = props
  const { todoStore } = useStore()
  const { remove, insert, todos } = todoStore

  useEffect(() => {
    ref.current.focus()
    setCurrent(ref.current)
    return () => {
    }
  }, [ref])

  const toggleTodo = () => {
    todo.toggle()
  }
  const handleClick = (e) => {
    e.preventDefault()
    remove(todo.id)
  }
  const handleKeyDown = (e) => {
    var id
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        insert(todo.id)
        break
      case 'ArrowUp':
        id = todos[(todos.findIndex(t => t.id === todo.id)) - 1] && todos[(todos.findIndex(t => t.id === todo.id)) - 1].id + '-input'
        id && document.getElementById(id).focus()
        break
      case 'ArrowDown':
        id = (todos.findIndex(t => t.id === todo.id) + 1 < todos.length) && todos[(todos.findIndex(t => t.id === todo.id)) + 1].id + '-input'
        id && document.getElementById(id).focus()
        break
      case 'Backspace':
        if (e.target.innerText === '') {
          id = todos[(todos.findIndex(t => t.id === todo.id)) - 1] && todos[(todos.findIndex(t => t.id === todo.id)) - 1].id + '-input'
          id && document.getElementById(id).focus()
          remove(todo.id)
        }
        break
      default: break
    }
  }

  const delayedRename = debounce(e => todo.rename(e.target.value), 200)

  const handleChange = (e) => {
    delayedRename(e)
  }

  const handleSelect = (e) => {
    const selected = window.getSelection().toString()
    if (selected.length !== 0) {
      const fullStr = ref.current.innerText
      if (selected === fullStr) {
        inputRef.current && inputRef.current.classList.toggle('notDisplayed')
        todo.changeTag()
      }
    }
  }


  const inputRef = React.createRef()
  return (
    <>
      {todo.title.length !== 0 && <input type='checkbox' ref={inputRef} className='inline custom-checkbox' onClick={toggleTodo} checked={todo.comleted} />}
      <ContentEditable
        id={todo.id + '-input'}
        className={todo.completed ? "inline done" : "inline"}
        innerRef={ref}
        html={todo.title}
        tagName={todo.tag}
        onSelect={handleSelect}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <small onClick={handleClick} >&#10005;</small>
    </>
  );


}
export default observer(TodoView)