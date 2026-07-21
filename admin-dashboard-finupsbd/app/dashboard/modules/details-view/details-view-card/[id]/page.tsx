

import DetailsViewCard from '@/components/modules/module/details-view-module/DetailsViewCard'
import { notFound } from 'next/navigation'


export default async function DetailsViewCardPage(props: {params: Promise<{ id: string }>}) {
  const { id } = await props.params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/cards/${id}`)


  const json = await res.json()

  if (!json.success) {
    notFound()
  }
const data = await json.data

  return (
    <div>
      {data ? <DetailsViewCard data={data}/> : "Data Not found" }
    </div>
  )
}
