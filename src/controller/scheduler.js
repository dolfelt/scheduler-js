import Layout from "component/layout";
import ModelShift from "model/shift";
import AppRequest from "component/request";
import ShiftItem from "component/scheduler/shiftitem";

var Scheduler = {
  controller: function() {
    return {
      title: "Scheduler",
      shifts: Scheduler.loadShifts()
    };
  },
  loadShifts: function() {
    return AppRequest({
      url: "/shifts",
      type: ModelShift,
      unwrapSuccess: function(data) {
        return data.shifts;
      }
    });
  },
  view: function(controller) {
    var list = controller.shifts().map(function(shift) {
      return m.component(ShiftItem, {model: shift});
    });
    return Layout(m("div", list));
  }
};

export default Scheduler;
