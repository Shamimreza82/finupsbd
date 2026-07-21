import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FinupsBD. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-green-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
