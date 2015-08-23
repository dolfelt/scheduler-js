import Sidebar from "component/sidebar";
import Header from "component/header";

export default function (body) {
  return m("div", {class: "container"}, [
    Sidebar(),
    Header(),
    m("div#content", {class: "content"}, body)
  ]);
}
