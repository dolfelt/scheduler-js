import AppRequest from "component/request";

var User = function(data) {
	this.id = data.id;

	this.firstName = m.prop(data.first_name);
	this.lastName = m.prop(data.first_name);

	this.position_ids = m.prop(data.positions);
	this.location_ids = m.prop(data.locations);

	this.updatedAt = m.prop(data.updated_at);
};

User.list = function(location_id) {
	return AppRequest({
		method: "GET",
		url: "/users",
		type: User,
		unwrapSuccess: function(data) {
			return data.users;
		},
		data: {
			location_id: location_id
		}
	});
};

export default User;
