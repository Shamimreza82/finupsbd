"use client"

import React, { useState } from 'react'
import { ModeToggle } from '../mode-toggle'
import { Menu, X } from 'lucide-react'
import { useUser } from '@/providers/auth-provider'

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false)
const {user} = useUser()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md  w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-2xl font-extrabold text-green-500 dark:text-green-400 hover:text-green-600 transition-all"
            >
              FinupsBD
            </a>
          </div>

          {/* Desktop Links & Mode Toggle */}
          <div className="hidden lg:flex lg:items-center space-x-6">
            {/* Future nav links */}
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
            >
              Services
            </a>

            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2 shadow-md">
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors"
          >
            Services
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navber
