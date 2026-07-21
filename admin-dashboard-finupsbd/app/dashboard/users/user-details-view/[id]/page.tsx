


import { UserDetailsView } from '@/components/super-admin/dashboard/users/user-details-view'
import { notFound } from 'next/navigation'


export default async function UserDetailsViewPage(props: {
    params: Promise<{ id: string }>
}) {
    const { id } = await props.params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/users/get-single-user/${id}`)



    const userData = await res.json()

    if (!userData.success) {
        notFound()
    }
const singleUserData = await userData?.data

    return (
        <div>
            <UserDetailsView userData={singleUserData} />
        </div>
    )
}
