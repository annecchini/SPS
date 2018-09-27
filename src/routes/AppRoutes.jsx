import UserPage from "views/Pages/UserPage.jsx";
import Processes from "views/AppViews/Processes.jsx";
import Home from "views/AppViews/Home.jsx"


var AppRoutes = [
    {
        path: "/app/home",
        name: "Início",
        icon: "pe-7s-home",
        component: Home
    },
    {
        path: "/app/users",
        name: "Usuários",
        icon: "pe-7s-users",
        component: UserPage
    },
    {
        path: "/app/processes",
        name: "Processos",
        icon: "pe-7s-albums",
        component: Processes
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