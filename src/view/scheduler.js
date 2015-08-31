import Layout from "component/layout";
import SchedulerRow from "component/scheduler/row";

import moment from "moment/moment";

export default function(ctrl) {
    var content;
    if (ctrl.shifts.ready()) {

        var shiftsByUser = _(ctrl.shifts.data()).groupBy(function(s) {
            return s.userId();
        });

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
