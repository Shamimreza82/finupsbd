'use client'


import BusinessGuarantorForm from '@/components/guarantor-info/BusinessGuarantorForm'
import Footer from '@/components/sheared/Footer'
import Header from '@/components/sheared/Header'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const BusinessGuarantorPage = () => {
    const searchParams = useSearchParams()

    const applicationId = searchParams.get("applicationId")
    const id = searchParams.get("id")




    return (
        <div>
            <Header />
            <div className='py-5 px-2'>
                <BusinessGuarantorForm applicationId={applicationId ?? ''} id={id ?? ''} />
            </div>
            <Footer />
        </div>
    )
}

export default BusinessGuarantorPage
