import React, { useState, useEffect } from "react"
import CardComponent from "../components/CardComponent"
import axios from "axios"

const MusicianPage = () => {
  return (
    <CardComponent 
      axiosUrl="http://localhost:1337"
      axiosPara="Musicians"
    />
  )
}

export default MusicianPage
