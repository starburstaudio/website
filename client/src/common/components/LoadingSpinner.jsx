import React from 'react'

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="flex gap-2 h-24 items-center">
          {[0, 1, 2, 3, 4].map((k) => (
            <div
              key={k}
              style={{ animationDelay: `${-k * 170}ms` }}
              className="animate-scaleLoader w-3 h-24 rounded-lg bg-base-content shadow-xl shadow-gray-500"
            />
          ))}
        </div>
        <h2 className="text-3xl">Loading...</h2>
      </div>
    )
  }
}

export default LoadingSpinner
