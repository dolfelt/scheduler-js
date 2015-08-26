import Layout from "component/layout";

export default {
    controller: function() {
        return {id: "Sample"};
    },
    view: function(controller) {
        return Layout(m("div", [
            controller.id,
            m("a", {href: "/scheduler", config: m.route}, "Scheduler")
        ]));
    }
};
