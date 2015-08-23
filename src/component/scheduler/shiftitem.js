import moment from "moment/moment";

var ShiftItem = {
  controller: function(obj) {
    this.shift = m.prop(obj.model);
  },
  parseDate: function(date) {
    return moment(date, "ddd, DD MMM YYYY HH:mm:ss ZZ");
  },
  details: function(shift) {
    // Do something here...
  },
  view: function(ctrl) {
    var shift = ctrl.shift(),
      start = this.parseDate(shift.start_time()),
      end = this.parseDate(shift.end_time());
    return m("div.shift-data", {onclick: this.details.bind(this, shift)}, [
      m("strong", {style: 'color: #'+shift.color()}, [
        start.format("MMM Do, YYYY h:mma"), " - ", end.format("hh:mma")]),
      m("span.position-tag", shift.position().id())
    ]);
  }
};

export default ShiftItem;
