import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import ThemeAndVideoContext from './context/ThemeAndVideoContext'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: true, activeTab: 'Home'}

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const {isDarkTheme, activeTab} = this.state
    return (
      <ThemeAndVideoContext.Provider
        value={{
          isDarkTheme,
          activeTab,
          toggleTheme: this.toggleTheme,
          changeTab: this.changeTab,
        }}
      >
        <Switch>
          <Route exact path="/Login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
