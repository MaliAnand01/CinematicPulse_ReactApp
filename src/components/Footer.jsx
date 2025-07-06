import React from 'react'

function Footer() {
  return (
    <div className='text-white flex p-4 gap-3 items-center justify-center'>
        <p>&copy; 2025 Anand Mali. All rights reserved.</p>
        <p>| Powered by <a className='text-indigo-500' href="https://www.appwrite.io/">Appwrite</a></p>
        <p>| Designed by <a className='text-indigo-500' href="https://www.tailwindcss.com/">Tailwind CSS</a></p>
        <p>| Built with <a className='text-indigo-500' href="https://reactjs.org/">React</a></p>
    </div>
  )
}

export default Footer