import React from 'react'
import LoadingGIF from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className="loading">
      <h2>loading...</h2>
      <img src={LoadingGIF} alt="loading gif" />
    </div>
  )
}

export default Loading
