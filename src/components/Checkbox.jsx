import React from 'react'

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label>
      <span>{label}</span>
      <input type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </label>
  )
}

export default Checkbox
