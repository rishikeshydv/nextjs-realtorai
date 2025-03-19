import React from 'react'
type WhyProp = {
    title: string;
    description: string;
    icon: string;
}
export default function WhyProps(WhyProp:WhyProp) {
  return (
    <div className="p-10 rounded-lg bg-white">
    <div className="mx-auto mb-4 rounded-lg flex items-start justify-start">
        <img src={WhyProp.icon} alt="Sell Smarter" />
    </div>
    <h3 className="text-xl mb-2 font-medium">{WhyProp.title}</h3>
    <p className="text-gray-600">{WhyProp.description}</p>
  </div>
  )
}
