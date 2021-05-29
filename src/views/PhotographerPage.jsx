import React, { useState, useEffect } from "react"
import CardComponent from "../components/CardComponent"
import axios from "axios"

const PhotographerPage = () => {

  return (
    <CardComponent 
      axiosUrl="http://localhost:1337"
      axiosPara="Photographers"
    />
  )
}

export default PhotographerPage
