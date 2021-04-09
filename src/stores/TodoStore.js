import { makeObservable, makeAutoObservable, computed, action, observable, autorun, reaction } from 'mobx'
import { v4 as uuidv4 } from 'uuid';
import { set, get, update } from "idb-keyval";

class Todo {
  id = uuidv4()
  title = ''
  completed = false
  tag = 'p'

  rename(name) {
    this.title = name
    this.updateDb()
  }
  constructor(todo) {
    makeObservable(this, {
      id: observable,
      title: observable,
      completed: observable,
      tag: observable,
      toggle: action,
      rename: action,
      changeTag: action
    })
    if (todo) {
      this.id = todo.id
      this.title = todo.title
      this.completed = todo.completed
      this.tag = todo.tag
    }
  }
  toggle() {
    this.completed = !this.completed
    this.updateDb()
  }
  changeTag() {
    this.tag = this.tag === "p" ? "h3" : "p"

    this.updateDb()
  }
  updateDb = () => {
    get('todos').then((val) => {
      const parsed = { id: this.id, title: this.title, completed: this.completed, tag: this.tag }
      if (val) {
        var index = val.findIndex(v => v.id === parsed.id)
        val[index] = parsed
        set('todos', [...val]);
      } else {
        set('todos', [parsed])
      }
    })
  }
}

class TodoStore {
  todos = []

  get notDone() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  constructor(todos) {

    makeAutoObservable(this, {
      todos: observable,
      notDone: computed,
      add: action,
      remove: action,
      insert: action
    })
    this.todos = todos

  }
  init = (todos) => {
    todos.map(todo => {

    });
  }
  addToDb = () => {
    get('todos').then((val) => {
      const parsed = this.todos.map((t) => {
        return { id: t.id, title: t.title, completed: t.completed, tag: t.tag }
      })
      set('todos', parsed);
    }
    )
  }
  add = (todo) => {
    todo && todo.id ? this.todos.push(new Todo(todo)) : this.todos.push(new Todo())
  }

  remove = (id) => {
    const index = this.todos.findIndex(item => item.id === id)
    index >= 0 && this.todos.length > 1 && this.todos.splice(index, 1)
    this.addToDb()
  }

  insert = (id) => {
    const index = this.todos.findIndex(item => item.id === id)
    const todo = new Todo()
    index >= 0 && this.todos.splice(index + 1, 0, todo)
    this.addToDb()
  }

}


export default new TodoStore([new Todo()])