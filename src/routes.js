import Scheduler from "./controller/scheduler";
import Home from "./controller/home";

m.route.mode = "pathname";

export default m.route(document.body, "/", {
    "/": Home,
    "/scheduler": Scheduler,
});
