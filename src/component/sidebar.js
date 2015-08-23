export default function() {
  var links = [
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

  return m("div#main-sidebar", [
    m("ul", {class: "navigation"},
      links.map(function(link) {
        return m("li", [
          m("a", {href: link.url, config: m.route}, [
            m("i", {class: "fa " + link.icon}), " ", link.title
          ])
        ]);
      })
    )
  ]);
}
