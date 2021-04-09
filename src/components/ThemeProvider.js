import React, { Component } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../context'

const ThemeProvider = ({ children }) => {
  const { themeStore } = useStore()

  return (
    <div className={themeStore.theme} id='mainDiv'>
      <div id='themeContainer'>
        {children}
      </div>
    </div>
  )
}
export default observer(ThemeProvider)