module.exports = class PagingResult {
    constructor(data, pageNumber, pageLimit, totalFound) {
        this.data = data;
        this.page_number = pageNumber;
        this.page_limit = pageLimit;
        this.total_results = totalFound;
    }
}