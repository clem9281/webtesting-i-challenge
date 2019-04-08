module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  return { ...item };
}

function fail(item) {
  return { ...item };
}

function repair(item) {
  return { name: item.name || "No Name Provided", enhancement: item.enhancement || 0, durability: 100 };
}

function get(item) {
  return { ...item };
}
