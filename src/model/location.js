import AppRequest from "component/request";

var Location = function(data) {
	this.id = data.id;

	this.name = m.prop(data.name);
	this.color = m.prop(data.color);
};

Location.list = function() {
	return AppRequest({
		method: "GET",
		url: "/locations",
		type: Location,
		unwrapSuccess: function(data) {
			return data.locations;
		},
	});
};

export default Location;
