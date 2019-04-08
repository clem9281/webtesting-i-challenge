module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  // if the enhancement isn't provided, set it to 1, else if it's equal to 20 don't change it, else increase it by one
  return { name: item.name || "No Name Provided", durability: item.durability || 100, enhancement: !item.enhancement ? 1 : item.enhancement === 20 ? item.enhancement : item.enhancement + 1 };
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
