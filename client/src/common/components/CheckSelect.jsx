import React from 'react'
import PropTypes from 'prop-types'

class CheckSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.isChecked
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isChecked !== prevProps.isChecked) {
      this.setState({ checked: this.props.isChecked })
    }
  }

  render() {
    return (
      <div
        className={
          'form-control check-select hover:bg-base-200 ' +
          (this.state.checked ? 'bg-base-300' : 'bg-base-100 ')
        }
        onClick={() => {
          this.setState({ checked: !this.state.checked }, () => {
            this.props.onChange(this.state.checked)
          })
        }}>
        <label className="label cursor-pointer">
          <span className="label-text flex gap-2">{this.props.children}</span>
        </label>
      </div>
    )
  }
}

CheckSelect.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.element
}

export default CheckSelect
