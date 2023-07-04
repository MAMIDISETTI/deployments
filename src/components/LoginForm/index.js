import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import {
  LoginContainer,
  ShadowContainer,
  LoginFormContainer,
  LoginDivContainer,
  LabelEl,
  InputEl,
  ButtonEl,
  LogoImage,
  ErrorMsg,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    visibility: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({visibility: true})
    } else {
      this.setState({visibility: false})
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify({username, password})}

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, visibility, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginContainer>
        <ShadowContainer>
          <LogoImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <LoginFormContainer onSubmit={this.onSubmit}>
            <LoginDivContainer>
              <LabelEl htmlFor="username">USERNAME</LabelEl>
              <InputEl
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </LoginDivContainer>
            <LoginDivContainer>
              <LabelEl htmlFor="password">PASSWORD</LabelEl>
              <InputEl
                type={visibility ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </LoginDivContainer>
            <LoginDivContainer direction="row">
              <InputEl
                type="checkbox"
                id="checkbox"
                onChange={this.showPassword}
              />
              <LabelEl htmlFor="checkbox" cursor="pointer">
                Show Password
              </LabelEl>
            </LoginDivContainer>
            <ButtonEl type="submit">Login</ButtonEl>
            {showErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
          </LoginFormContainer>
        </ShadowContainer>
      </LoginContainer>
    )
  }
}

export default LoginForm
