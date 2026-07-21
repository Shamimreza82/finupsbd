'use client'


import PersonalGuarantorForm from '@/components/guarantor-info/PersonalGuarantorForm'
import Footer from '@/components/sheared/Footer'
import Header from '@/components/sheared/Header'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const PersonalGuarantorPage = () => {
    const searchParams = useSearchParams()

    const applicationId = searchParams.get("applicationId")
    const id = searchParams.get("id")




    return (
        <div>
            <Header />
            <div className='py-5 px-2'>
                <PersonalGuarantorForm applicationId={applicationId ?? ''} id={id ?? ''} />
            </div>
            <Footer />
        </div>
    )
}

export default PersonalGuarantorPage
