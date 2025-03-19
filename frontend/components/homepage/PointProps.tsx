import React from 'react'
type Point = {
    title: string;
    description: string;
    icon: string;
}
const PointProps = (Point:Point) => {
  return (
    <div className="p-10 rounded-lg text-center bg-[#437a4520]">
    <div className="mx-auto mb-4 rounded-lg flex items-center justify-center">
        <img src={Point.icon} alt="Sell Smarter" />
    </div>
    <h3 className="text-xl mb-2 font-medium">{Point.title}</h3>
    <p className="text-gray-600">{Point.description}</p>
  </div>
  )
}

export default PointProps