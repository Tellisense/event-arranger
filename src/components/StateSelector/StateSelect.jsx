import React from 'react'
import { states } from './states'

const StateSelect = ({ onChange }) => {

  return (
    <div>
      <select style={{ width: 150, height: 30 }} id="dropdown" onChange={onChange}>
        <option value="">State</option>
        {states.map(item => {
          return (
            <option key={item.name} value={item.abbreviation}>{item.name}</option>
          )
        }
        )}
      </select>
    </div>
  )
}

export default StateSelect
