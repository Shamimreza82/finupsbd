

import { ApplicationEvents } from '@/components/super-admin/dashboard/details-view-application/application-events'
import { notFound } from 'next/navigation'


export default async function ApplicationEventsPage(props: {params: Promise<{ id: string }>}) {
  const { id } = await props.params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/status-events/${id}`)



  const json = await res.json()

  if (!json.success) {
   return notFound()
  }



const eventData = await json.data



  return (
    <div>
      <ApplicationEvents events={eventData}/>
    </div>
  )
}
