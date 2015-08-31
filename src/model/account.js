
var Account = function(data) {
    this.id = data.id;

    this.company = m.prop(data.company);
    this.subdomain = m.prop(data.subdomain);
    this.logo = m.prop(data.logo);
};

Account.map = function(data) {
    return new Account(data);
};

export default Account;
