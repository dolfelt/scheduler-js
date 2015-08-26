import AppRequest from "component/request";
import ModelViewMap from "model/viewmap";
import ModelPosition from "model/position";

import moment from "moment/moment";

var Shift = function(data) {
    this.id = data.id;

    this.startTime = m.prop(data.start_time);
    this.endTime = m.prop(data.end_time);
    this.color = m.prop(data.color);
    this.userId = m.prop(data.user_id);
    this.positionId = m.prop(data.position_id);

    this.startTimeDate = function() {
        return moment(this.startTime());
    };

    this.position = function() {
        return new ModelPosition({id: this.positionId()});
    };
};

Shift.list = function() {
    return AppRequest({method: "GET", url: "/shifts"});
};

Shift.viewmap = ModelViewMap({
    "visible": m.prop(true)
});

export default Shift;
