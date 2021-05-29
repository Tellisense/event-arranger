import React from 'react'

const EventSelect = ({ onChange }) => {

  return (
    <div>
      <select style={{ width: 150, height: 30 }} onChange={onChange}>
        <option value="">Event Style</option>
        <option value="Wedding">Wedding</option>
        <option value="Engagement">Engagement</option>
        <option value="Bar Mitzvah">Bar Mitzvah</option>
        <option value="Bat Mitzvah">Bat Mitzvah</option>
      </select>
    </div>
  )
}

export default EventSelect
