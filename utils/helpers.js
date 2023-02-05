module.exports = {
  // counts users attending an event
  get_count: (arr) => {
    return arr.length;
  },
  ifEquals: (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
  // Check array for pending user invites for an event
  check_for_pending_invites: (arr) => {
    return arr.some((event) => {
      return event.party_members.some((user) => {
        return (!user.eventgroup.approved)? true:false;
      });
    });
  }
};

