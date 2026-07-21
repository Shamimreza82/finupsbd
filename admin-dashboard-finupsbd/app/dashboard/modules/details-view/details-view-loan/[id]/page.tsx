

import DetailsViewLoan from '@/components/modules/module/details-view-module/DetailsViewLoan'
import { notFound } from 'next/navigation'


export default async function DetailsViewLoanPage(props: {params: Promise<{ id: string }>}) {
  const { id } = await props.params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/loans/${id}`)

  const json = await res.json()

  if (!json.success) {
    notFound()
  }
const data = await json.data

  return (
    <div>
      <DetailsViewLoan data={data}/>
    </div>
  )
}
