import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  padding: 20px;
`

export const ShadowContainer = styled.div`
  padding: 40px 20px;
  width: 40%;

  box-shadow: 0px 0px 20px 5px #c6c9cc;
  @media (max-width: 767px) {
    width: 90%;
  }
`
export const LogoImage = styled.img`
  width: 60%;
  object-fit: contain;
  margin-bottom: 20px;
  margin-left: 20px;
`

export const LoginFormContainer = styled.form`
  align-self: center;
`

export const LoginDivContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction === 'row' ? 'row' : 'column')};
  margin-top: 10px;
  align-self: center;
`

export const LabelEl = styled.label`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  color: #475569;
`
export const InputEl = styled.input`
  padding: 10px;
  outline: none;
`
export const ButtonEl = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  width: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
`
export const ErrorMsg = styled.p`
  color: red;
`
