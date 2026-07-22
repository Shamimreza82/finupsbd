import { Settings2, SquareTerminal, User2 } from "lucide-react";

export const navList = {
    navMain: [
        {
            title: "Account Settings",
            url: "/user/setting",
            icon: Settings2,
            items: [
                {
                    title: "Change Password",
                    url: "/user/setting/update-password",
                },
                {
                    title: "Update Email/Mobile",
                    url: "/user/setting/update-email-mobile",
                },
            ],
        },
    ],
    profile: [
        {
            name: "Personal Informations",
            url: "/user/profile",
            icon: User2,
        }
    ],
    myItems: [
        {
            name: "My Applications",
            url: "/user/my-application/my-application-loan",
            icon: SquareTerminal,
        },
    ],
};
