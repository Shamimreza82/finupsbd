
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    GalleryVerticalEnd,
    List,
    PieChart,
    Podcast,
    Settings2,
    UserSquare2,
} from "lucide-react"




export const navList = {
    user: {
        name: "Hasan Rasel",
        email: "super.admin@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Applications",
            url: "#",
            icon: List,
            isActive: true,
            items: [
                {
                    title: "All Applications",
                    url: "/dashboard/application/applications",
                },
            ],
        },
        {
            title: "Users",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "All Users",
                    url: "/dashboard/users/all-users",
                },
            ],
        },

        {
            title: "Modules",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Add Loans",
                    url: "/dashboard/modules/loans/add-loans",
                },
                {
                    title: "Add Cards",
                    url: "/dashboard/modules/cards/add-cards",
                },
                {
                    title: "All Modules",
                    url: "/dashboard/modules/all-modules",
                },
            ],
        },
        {
            title: "Manage Blogs",
            url: "#",
            icon: Podcast,
            items: [
                {
                    title: "Post Blog",
                    url: "/dashboard/kyc",
                },
                {
                    title: "All Blogs",
                    url: "/dashboard/settings",
                },
               
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Kyc",
                    url: "/dashboard/kyc",
                },
                {
                    title: "System Settings",
                    url: "/dashboard/settings",
                },
               
            ],
        }, 
    ],
    projects: [
        {
            name: "User Analytices",
            url: "/dashboard/user-analytices", 
            icon: UserSquare2,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
    ],
}