'use client'


import { ModuleTable } from '@/components/modules/module/ModuleTable'
import React from 'react'

const AllModulesPage = () => {
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">All Modules</h1>
      <ModuleTable/>
    </div>
  )
}

export default AllModulesPage
