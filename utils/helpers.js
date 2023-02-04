// counts users attending an event
module.exports = {
    get_count: (arr) => {
        return arr.length;
    },
    ifEquals: (a, b, options) => {
  if (a === b) {
    return options.fn(this);
  }

  return options.inverse(this);
}
    // check_host: (host_id, userId) =>{
    //     console.info("helper hit")
    //     return (host_id === userId)?true:false;
    // }
};

