
import DetailsViewApplicationFrom from '@/components/super-admin/dashboard/details-view-application/details-View-ApplicationFrom'
import { notFound } from 'next/navigation'

async function getApplication(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/application/get-single-application/${id}`,
      { cache: "no-store" }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function DetailsViewPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const json = await getApplication(id)

  if (!json?.success) notFound()

  return (
    <div>
      <DetailsViewApplicationFrom applicationData={json.data} />
    </div>
  )
}
