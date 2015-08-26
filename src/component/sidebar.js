export default function() {
    var links = [
        {
            icon: "fa-sign-in",
            title: "Login",
            url: "/login"
        },
        {
            icon: "fa-dashboard",
            title: "Dashboard",
            url: "/"
        },
        {
            icon: "fa-calendar",
            title: "Scheduler",
            url: "/scheduler"
        }
    ];

    return m("#main-sidebar", [
        m("ul", {class: "navigation"},
            links.map(function(link) {
                return m("li", [
                    m("a", {href: link.url, config: m.route}, [
                        m("i.menu-icon", {class: "fa " + link.icon}), " ", link.title
                    ])
                ]);
            })
        )
    ]);
}
