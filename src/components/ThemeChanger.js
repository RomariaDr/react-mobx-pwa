import React from 'react'
import Toggle from 'react-toggle'
import { observer } from 'mobx-react-lite'
import { useStore } from '../context'

const ThemeChanger = () => {
  const { themeStore } = useStore()
  const handleChange = (e) => {
    if (e.target.checked == true) {
      themeStore.toggleTheme('dark')
    } else {
      themeStore.toggleTheme('light')
    }
  }
  return (<span
    id='themeChanger'>
    <Toggle
      icons={false}
      defaultChecked={false}
      onChange={handleChange} />
  </span>)
}
export default observer(ThemeChanger)