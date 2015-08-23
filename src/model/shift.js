import AppRequest from "component/request";
import ModelViewMap from "model/viewmap";
import ModelPosition from "model/position";

var Shift = function(data) {
	this.id = m.prop(data.id);

	this.start_time = m.prop(data.start_time);
	this.end_time = m.prop(data.end_time);
	this.color = m.prop(data.color);
	this.position_id = m.prop(data.position_id);

	this.position = function() {
		return new ModelPosition({id: this.position_id()});
	};
};

Shift.list = function() {
	return AppRequest({method: "GET", url: "/shifts"});
};

Shift.viewmap = ModelViewMap({
  "visible": m.prop(true)
});

export default Shift;
