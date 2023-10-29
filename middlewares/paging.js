function filterWithPageAndLimit(array, page, limit){
  page = parseInt(page, 10);  // Convert page to a number
  limit = parseInt(limit, 10);  // Convert limit to a number

  if (array.length === 0 || page <= 0) {
    return [];
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const slicedData = array.slice(startIndex, endIndex);
  return slicedData;
}

module.exports = { filterWithPageAndLimit };