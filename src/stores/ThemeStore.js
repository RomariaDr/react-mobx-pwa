import { makeObservable, computed, autorun, action, observable } from 'mobx'

class ThemeStore {
  theme = 'light'

  constructor() {
    makeObservable(this, {
      theme: observable,
      toggleTheme: action
    })
  }

  toggleTheme(newTheme) {
    document.body.classList.remove(...document.body.classList)
    document.body.classList.add(newTheme)
    this.theme = newTheme
  }
}
export default new ThemeStore()