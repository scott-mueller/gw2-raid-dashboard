const descendingComparator = (a, b, orderBy) => {
    let fieldA = a[orderBy];
    let fieldB = b[orderBy];

    if (typeof(fieldA) === 'object') {
        fieldA = fieldA.sortVal;
        fieldB = fieldB.sortVal;
    }

  if (typeof(fieldA) === 'string') {
    return fieldA.localeCompare(fieldB);
}

  if (fieldB < fieldA) {
    return -1;
  }
  if (fieldB > fieldA) {
    return 1;
  }
  return 0;
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const formatDPS = (val) => {
    
    const parts = val.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");

    //return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export const sortProfessionAggrigatesByFrequency = (aggregates) => Object
  .keys(aggregates)
  .map((profession) => {
      let count = 0;
      aggregates[profession].forEach((roleAgg) => count += roleAgg.count);

      return {
          profession,
          count
      };
  })
  .sort((a, b) => b.count - a.count)
  .map((profession) => profession.profession);
