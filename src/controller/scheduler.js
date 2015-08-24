import Layout from "component/layout";
import ModelShift from "model/shift";
import ModelLocation from "model/location";
import ModelUser from "model/user";

import AppRequest from "component/request";
import SchedulerRow from "component/scheduler/row";

import moment from "moment/moment";

var SchedulerData = function() {
  this.start = m.prop(moment().startOf('week'));
  this.end = m.prop(moment().endOf('week'));
  this.locationId = m.prop(0);
};

var Scheduler = {
  controller: function() {

    var users = Scheduler.users(),
      locations = Scheduler.locations(),
      shifts = Scheduler.getShifts();

    m.sync([
      users.request,
      locations.request,
      shifts.request
    ]).then(m.redraw);

    return {
      title: "Scheduler",
      users: users,
      locations: locations,
      shifts: shifts,
      data: new SchedulerData()
    };
  },
  locations: function() {
    return ModelLocation.list();
  },
  users: function() {
    return ModelUser.list();
  },
  getShifts: function() {
    return AppRequest({
      url: "/shifts",
      type: ModelShift,
      data: {
        start: moment().toISOString(),
        end: moment().add(7, 'd').toISOString(),
        unpublished: true,
        include_allopen: true,
        include_objects: false
      },
      unwrapSuccess: function(data) {
        return data.shifts;
      }
    });
  },
  view: function(ctrl) {
    var content;
    if (ctrl.shifts.ready()) {

      var shiftsByUser = _(ctrl.shifts.data()).groupBy(function(s) { return s.userId(); });

      var rows = ctrl.users.data().map(function(user) {
        return m.component(SchedulerRow, {
          user: user,
          shifts: shiftsByUser[user.id],
          start: moment(ctrl.data.start()),
          end: moment(ctrl.data.end())
        });
      });
      content = m(".scheduler-grid", rows);
    } else {
      content = m("div", "Loading Shifts...");
    }
    return Layout(m("div", content));
  }
};

export default Scheduler;
