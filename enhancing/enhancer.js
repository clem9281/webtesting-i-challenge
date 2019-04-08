module.exports = {
  succeed,
  fail,
  repair,
  get,
};



function fillInEmptyProps(item) {
  if (!item.hasOwnProperty('name')) item.name = "No Name Provided";
  if (!item.hasOwnProperty('durability')) item.durability = 100;
  if (!item.hasOwnProperty('enhancement')) item.enhancement = 0;
  return item;
}

function succeed(item) {
  const temp = fillInEmptyProps(item);
  return { ...temp, enhancement: item.enhancement === 20 ? item.enhancement : item.enhancement + 1 };
}

function fail(item) {
  const temp = fillInEmptyProps(item);
  return { ...temp, durability: temp.durability - 5, enhancement: temp.enhancement };
}

function repair(item) {
  const temp = fillInEmptyProps(item);
  return { ...temp, durability: 100 };
}

function get(item) {
  return { ...item };
}
