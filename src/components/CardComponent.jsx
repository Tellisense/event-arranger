import React, { useState, useEffect, useMemo } from "react"
import axios from "axios"
import EventSelect from "./EventSelect"
import StateSelect from "./StateSelector"
import Checkbox from "./Checkbox"

const CardComponent = ({ axiosUrl, axiosPara }) => {
  const [originalApiArray, setOriginalApiArray] = useState([])
  const [apiArray, setApiArray] = useState([])
  const [state, setState] = useState('')
  const [event, setEvent] = useState('')
  const [review, setReview] = useState(false)
  const [cost, setCost] = useState(false)

  useEffect(() => {
    try {
      const apiCall = async () => {
        const { data } = await axios.get(`${axiosUrl}/${axiosPara}`)
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

  useEffect(() => {
    if (cost && review === false) setApiArray(filteredDataCost)
    else if (review && cost === false) setApiArray(filteredDataReview)
    else if (review && cost) setApiArray(filteredBoth)
    else setApiArray(originalApiArray)
  }, [cost, review, originalApiArray])


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

  const style = {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

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
        {apiArray?.map((item) => {
          return (
            <div className="card-main-card">
              <img className="card-main-card-image" src={`${axiosUrl}${item?.imageSrc?.url}`} alt="Card Image" />
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