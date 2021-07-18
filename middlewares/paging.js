function filterWithPageAndLimit(array, page, limit){
    if (array.length === 0)
      return array;
    if (page === 1)
      return array.slice(0, limit);
    if (page > 0) {
      let startIndex = (page - 1) * limit;
      let endIndex = startIndex + limit;
  
      return array.slice(startIndex, endIndex);
    }
}

module.exports = { filterWithPageAndLimit };