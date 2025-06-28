import React from 'react'
import { motion } from 'motion/react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route 
      path='/' 
      element={<motion.div
        initial={{opacity: 0, translateY: 20 }}
        whileInView={{opacity: 1, translateY: 0}}
        transition={{duration: 0.5, ease: ['easeInOut']}}>
      <h1 className='text-green-700 font-semibold text-6xl text-center'>Wellcome To Capstone</h1>
      </motion.div>} />
    </Routes>
  )
}

export default App