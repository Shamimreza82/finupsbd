

import DetailsViewApplicationFrom from '@/components/super-admin/dashboard/details-view-application/details-View-ApplicationFrom'
import { notFound } from 'next/navigation'


export default async function DetailsViewPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/get-single-application/${id}`)



  const json = await res.json()

  if (!json.success) {
    notFound()
  }

  return (
    <div>
      <DetailsViewApplicationFrom applicationData={json.data} />
    </div>
  )
}
