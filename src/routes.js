import Scheduler from "./controller/scheduler";
import Home from "./controller/home";
import Login from "./controller/login";

m.route.mode = "pathname";

export default m.route(document.body, "/", {
    "/": Home,
    "/login": Login,
    "/scheduler": Scheduler,
});
