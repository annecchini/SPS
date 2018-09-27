import UserPage from "views/Pages/UserPage.jsx";
import Processes from "views/AppViews/Processes.jsx";


var AppRoutes = [
    {
        path: "/app/home",
        name: "Home",
        mini: "HM",
        component: UserPage
    },
    {
        path: "/app/users",
        name: "Usuários",
        mini: "PR",
        component: UserPage
    },
    {
        path: "/app/processes/list",
        name: "Processos",
        mini: "PR",
        component: Processes
    },
    {
        path: "/app/mypage",
        name: "Minha página",
        mini: "MP",
        component: UserPage
    },
    {
        collapse: true,
        path: "/app/myblock",
        name: "Meu bloco",
        state: "openMyblock",
        icon: "pe-7s-plugin",
        views: [
            {
                path: "/app/myblock/buttons",
                name: "Buttons",
                mini: "B",
                component: UserPage
            },
            {
                path: "/app/myblock/grid-system",
                name: "Grid System",
                mini: "GS",
                component: UserPage
            },
            {
                path: "/app/myblock/panels",
                name: "Panels",
                mini: "P",
                component: UserPage
            },
            {
                path: "/app/myblock/sweet-alert",
                name: "Sweet Alert",
                mini: "SA",
                component: UserPage
            },
            {
                path: "/app/myblock/notifications",
                name: "Notifications",
                mini: "N",
                component: UserPage
            },
            {
                path: "/app/myblock/icons",
                name: "Icons",
                mini: "I",
                component: UserPage
            },
            {
                path: "/app/myblock/typography",
                name: "Typography",
                mini: "T",
                component: UserPage
            }
        ]
    }
];

export default AppRoutes;