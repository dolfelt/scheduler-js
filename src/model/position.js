import AppRequest from "component/request";

var Position = function(data) {
	this.id = m.prop(data.id);

	this.name = m.prop(data.name);
	this.color = m.prop(data.color);
};

Position.list = function() {
	return AppRequest({method: "GET", url: "/positions"});
};

export default Position;
