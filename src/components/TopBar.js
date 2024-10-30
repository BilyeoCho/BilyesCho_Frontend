import React from 'react'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  }

  const goRent = () => {
    navigate('/rent');
  }

  const goRegister = () => {
    navigate('/register');
  }

  const goTalk = () => {
    navigate('/talk');
  }

  const goReview = () => {
    navigate('/review');
  }

  const goMyPage = () => {
    navigate('/mypage');
  }
  
  return (
    <div>TopBar</div>
  )
}

export default TopBar