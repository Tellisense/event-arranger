import React, { useState, useEffect, useMemo } from "react"
import { ToastContainer } from 'react-toastify';
import EventSelect from "./EventSelect"
import StateSelect from "./StateSelector"
import Checkbox from "./Checkbox"
import http from '../services/httpService'
import 'react-toastify/dist/ReactToastify.css';



const CardComponent = ({ axiosPara }) => {
  const [originalApiArray, setOriginalApiArray] = useState([])
  const [apiArray, setApiArray] = useState([])
  const [state, setState] = useState('')
  const [event, setEvent] = useState('')
  const [review, setReview] = useState(false)
  const [cost, setCost] = useState(false)

  useEffect(() => {
    try {
      const apiCall = async () => {
        const { data } = await http.get(`/${axiosPara}`)
        setOriginalApiArray(data)
      }
      apiCall()
    } catch (error) {
      console.log(error)
    }
  }, [])

  //use .slice() to create a new array in memory, sort will override the original array
  //also you want to memoize it so you don't keep running the filter function at every render, this will only run once unless the originalApiArray changes.
  const filteredDataCost = useMemo(() => originalApiArray.slice().sort((a, b) => a.hourlyRate - b.hourlyRate), [originalApiArray])

  const filteredDataReview = useMemo(() => originalApiArray.slice().sort((a, b) => b.stars - a.stars), [originalApiArray])


  const filteredBoth = useMemo(() => {
    return (
      originalApiArray.slice().sort((a, b) => {
        if (a.hourlyRate && !b.hourlyRate) {
          return -1;
        } else if (!a.hourlyRate && b.hourlyRate) {
          return 1;
        } else {
          return b.stars - a.stars;
        }
      })
    )
  }, [originalApiArray])



  // this will run any times the dependency values change, ie. review sort is clicked. 
  useEffect(() => {
    if (cost && review === false) setApiArray(filteredDataCost)
    else if (review && cost === false) setApiArray(filteredDataReview)
    else if (review && cost) setApiArray(filteredBoth)
    else setApiArray(originalApiArray)
  }, [cost, review, originalApiArray])

  // event handlers
  const handleEventChange = e => setEvent(e.target.value)
  const handleStateChange = e => setState(e.target.value)
  const handleReviewChange = () => setReview(!review)
  const handleCostChange = () => setCost(!cost)

  // console.log(`state: `, state)
  // console.log(`event: `, event)
  // console.log(`review: `, review)
  // console.log(`cost: `, cost)
  // console.log(`originalApiArray: `, originalApiArray)
  // console.log(`apiArray: `, apiArray)
  // console.log(`filteredDataReview: `, filteredDataReview)
  // console.log(`filteredDataCost: `, filteredDataCost)


  //generally don't use inline styles, if you do declare an object like this you need to memoize it, if you don't a new object in memory is created at every render.
  const style = useMemo(() => {
    return ({
      margin: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    })
  }, [])


  return (
    <>
      <div style={style}>
        <div>
          Filter Property
        </div>
        <Checkbox label='Best Review' checked={review} onChange={handleReviewChange} />
        <Checkbox label='Best Cost' checked={cost} onChange={handleCostChange} />
        <EventSelect onChange={handleEventChange} />
        <StateSelect onChange={handleStateChange} />
      </div>
      <div className="card-main">
        <ToastContainer />
        {apiArray?.map((item) => {
          return (
            <div key={item.id} className="card-main-card">
              <img className="card-main-card-image" src={`${process.env.REACT_APP_API_URL}${item?.imageSrc?.url}`} alt="Card Image" />
              <div className="card-main-card-info">
                <h4>{`${item.id}: ${item.name}`}</h4>
                <p>{`$${item.hourlyRate}/hr`}</p>
                <p>{item.area}</p>
                <p>{item.eventStyle}</p>
                <div className="card-main-card-info-icon-div">
                  {
                    (() => {
                      const starCount = []

                      for (let i = 0; i < item.stars; i++) {
                        starCount.push(<i className="material-icons">star</i>)
                      }

                      return starCount
                    })()
                  }
                </div>
                <p>{item.about}</p>
                <button>contact me</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CardComponent