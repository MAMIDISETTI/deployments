import {Component} from 'react'
import Cookies from "js-cookie"
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import NavigationBar from '../NavigationBar'

import {
  HomeContainer,
  BannerContainer,
  BannerImage,
  BannerText,
  BannerButton,
  BannerLeftPart,
  BannerRightPart,
  BannerCloseButton,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
} from './styledComponents'
import { response } from 'msw'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    bannerDisplay: 'flex',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }
  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus:apiStatusConstants.inProgress})
    const jwtToken=Cookies.get("jwt_token")
    const url=`https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        },
        method:"GET",
    }
    const response=await fetch(url,options)
    if(response.ok){
        const data=await response.json()
const updateddata=data.videos.map(eachVideo=>({
    
}))
    }
  }

  onCloseBanner = () => {
    this.setState({bannerDisplay: 'none'})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {bannerDisplay, searchInput} = this.state
    const display = bannerDisplay === 'flex' ? 'flex' : 'none'
    return (
      <>
        <Header />
        <NavigationBar />
        <HomeContainer>
          <BannerContainer display={display}>
            <BannerLeftPart>
              <BannerImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <BannerText>
                buy Nxt Watch Premium prepaid plans with <br />
                UPI
              </BannerText>
              <BannerButton type="button">GET IT NOW</BannerButton>
            </BannerLeftPart>
            <BannerRightPart>
              <BannerCloseButton type="button" onClick={this.onCloseBanner}>
                <AiOutlineClose size={25} />
              </BannerCloseButton>
            </BannerRightPart>
          </BannerContainer>
          <SearchContainer>
            <SearchInput
              type="search"
              value={searchInput}
              placeholder="Search"
              color="#231f20"
              onChange={this.onChangeInput}
            />
            <SearchIconContainer onClick={this.getSearchResults}>
              <AiOutlineSearch size={20} />
            </SearchIconContainer>
          </SearchContainer>
        </HomeContainer>
      </>
    )
  }
}

export default Home
