import { useImperativeHandle } from "react"
import { forwardRef } from "react"
import { useState } from "react"
import PropTypes from "prop-types"

const ToggleVisibility = forwardRef((props, refs) => {
  const buttonLabels = {
    open: props.buttonLabels.open ? props.buttonLabels.open : "Show",
    close: props.buttonLabels.close ? props.buttonLabels.close : "Hide"
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisbile = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

  const handleToggleVisibility = () => { setVisible(!visible) }

  useImperativeHandle(refs, () => {
    return {
      handleToggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => handleToggleVisibility()}> {buttonLabels.open} </button>
      </div>
      <div style={showWhenVisbile}>
        {props.children}
        <button onClick={() => handleToggleVisibility()}> {buttonLabels.close} </button>
      </div>
    </div>
  )
})

ToggleVisibility.displayName = "ToggleVisibility"

ToggleVisibility.propTypes = {
  buttonLabels: PropTypes.shape({
    open: PropTypes.string,
    close: PropTypes.string
  })
}

export default ToggleVisibility