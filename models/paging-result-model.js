module.exports = class PagingResult {
    constructor(data, pageNumber, pageLimit, totalFound) {
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageLimit = pageLimit;
        this.totalFound = totalFound;
    }
}