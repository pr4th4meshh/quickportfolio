import React from "react"

const PortfolioSkills = ({ skillsAndFeatures }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 justify-center items-center gap-7 sm:py-10 py-10">
      {skillsAndFeatures.map((skill, index) => {
        return (
          <div key={index} className="text-center">
            <div className="dark:text-white text-black p-2 relative dark:bg-black bg-light mx-10 pb-3">
              {skill}
              <div className="absolute bottom-0 h-[2px] inset-x-0 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
              <div className="absolute bottom-0 h-[2px] w-1/2 mx-auto inset-x-0  bg-gradient-to-r from-transparent via-blue-500 to-transparent"/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PortfolioSkills
