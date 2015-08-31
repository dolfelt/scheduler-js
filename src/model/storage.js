import LocalForage from "localforage";

const STORAGE_KEY = "scheduler-js";

var Storage = {
    keys: ["auth", "config"],
    auth: {
        endpoint: m.prop("http://api.wheniwork.dev/2"),
        token: m.prop(""),
        userId: m.prop("")
    },
    config: {
        // add additional local config
    },

    load: function(items) {
        var keys = this.keys;
        if (items && items.length) {
            keys = _.intersection(keys, items);
        }
        var promises = keys.map(function(k) {
            return LocalForage.getItem(STORAGE_KEY + ":" + k).then(function(data) {
                var obj = JSON.parse(data) || {};
                for (var dk in obj) {
                    if (obj.hasOwnProperty(dk) && _.isFunction(Storage[k][dk])) {
                        Storage[k][dk](obj[dk]);
                    }
                }
                return Storage[k];
            });
        });
        return Promise.all(promises);
    },
    save: function() {
        var promises = this.keys.map(function(sk) {
            return LocalForage.setItem(STORAGE_KEY + ":" + sk, JSON.stringify(Storage[sk]));
        });
        return Promise.all(promises);
    }
};

export default Storage;
