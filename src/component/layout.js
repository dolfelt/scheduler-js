import Sidebar from "component/sidebar";
import Header from "component/header";

export default function (body) {
  return m(".container", [
    Sidebar(),
    Header(),
    m("#content.content", body)
  ]);
}
