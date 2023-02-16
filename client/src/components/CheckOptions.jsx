import React from 'react'
import PropTypes from 'prop-types'

class CheckOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.value !== prevProps.value) { this.setState({ value: this.props.value }) }
  }

  render () {
    return (
      <div className="space-y-2">
        {this.props.options.map(r => (
          <div
            key={r.value}
            className={
              'form-control check-select ' +
              (this.state.value === r.value ? 'bg-primary hover:bg-primary-focus ' : 'bg-base-100 hover:bg-base-200 ')
            }
            onClick={
              () => {
                if (this.state.value === r.value) {
                  this.setState({ value: '' })
                  this.props.onSelect('')
                } else {
                  this.setState({ value: r.value })
                  this.props.onSelect(r.value)
                }
              }
            }
          >
            <label className="label cursor-pointer">
              <span
                className=
                {
                  'label-text flex gap-2 ' +
                  (this.state.value === r.value ? 'text-white' : '')
                }
              >
                {r.jsx}
              </span>
            </label>
          </div>
        ))}
      </div>
    )
  }
}

CheckOptions.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
}

export default CheckOptions
