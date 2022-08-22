module.exports = {

    // Number of videos to show per page
    resultsPerPage: 16,

    // Ways the videos can be sorted
    sortOptions: [
        {
            value: 'Most Recent',
            criteria: { field: 'datestamp', order: 'newest' },
            default: true
        },
        {
            value: 'Oldest to Newest',
            criteria: { field: 'datestamp', order: 'oldest' }
        },
        {
            value: 'Hosted by (A-Z)',
            criteria: { field: 'Hosted by', order: 'a-z' }
        }
    ]
}
