import AppRequest from "component/request";

var User = function(data) {
    this.id = data.id;

    this.accountId = m.prop(data.account_id);
    this.firstName = m.prop(data.first_name);
    this.lastName = m.prop(data.last_name);

    this.fullName = function() {
        return [this.firstName(), this.lastName()].join(' ');
    };

    this.avatar = function(size) {
        return data.avatar.url.replace('%s', size || 40);
    };

    this.positionIds = m.prop(data.positions);
    this.locationIds = m.prop(data.locations);

    this.updatedAt = m.prop(data.updated_at);
};

User.map = function(data) {
    return new User(data);
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
