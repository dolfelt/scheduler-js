import ModelShift from "model/shift";
import ModelLocation from "model/location";
import ModelUser from "model/user";

import Storage from "model/storage";

import AppRequest from "component/request";

import SchedulerView from "view/scheduler";

import moment from "moment/moment";

var SchedulerData = function() {
    this.start = m.prop(moment().startOf('week'));
    this.end = m.prop(moment().endOf('week'));
    this.locationId = m.prop(0);
};

var Scheduler = {
    controller: function() {

        this.title = m.prop("Scheduler");
        this.data = new SchedulerData();

        this.loadData = function() {

            m.startComputation();

            Storage.load().then(function() {
                this.users = this.getUsers();
                this.locations = this.getLocations();
                this.shifts = this.getShifts(this.data.start(), this.data.end());

                m.sync([
                    this.users.request,
                    this.locations.request,
                    this.shifts.request
                ]).then(m.endComputation);
            }.bind(this));
        };


        this.getUsers = function() {
            return ModelUser.list();
        };

        this.getLocations = function() {
            return ModelLocation.list();
        };

        this.getShifts = function(start, end) {
            return AppRequest({
                url: "/shifts",
                type: ModelShift,
                data: {
                    start: start.toISOString(),
                    end: end.toISOString(),
                    unpublished: true,
                    include_allopen: true,
                    include_objects: false
                },
                unwrapSuccess: function(data) {
                    return data.shifts;
                }
            });
        };

        this.loadData();

    },
    view: SchedulerView
};

export default Scheduler;
