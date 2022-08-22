import VideoData from "../VideoData";

// Get a new copy of the test data every time so it can't be inadvertently
// mutated by tests
const getTestData = () => [
    {
        'Video ID': 'https://www.youtube.com/watch?v=E_Gob13t9sM',
        'Title US': 'Winsor & Newton Cotman Watercolour - Palm Tree Wall Art, by Mandy Peltier',
        'Hosted by': 'ColArt',
        'Class Date': '7/1/22',
        'Category US': 'Fine Art'
    }, {
        'Video ID': 'https://www.youtube.com/watch?v=7bLxzojWrfA',
        'Title US': '3 Hour Throw Crochet with no tools!',
        'Hosted by': 'Yarnspirations',
        'Class Date': '6/20/22',
        'Category US': 'Yarn'
    }, {
        'Video ID': 'https://www.youtube.com/watch?v=MTy5qVpYQU4',
        'Title US': 'Paint Night Live: Abstract Under the Sea Turtle',
        'Hosted by': 'Plaid',
        'Class Date': '7/11/22',
        'Category US': 'Fine Art'
    }
];

describe('VideoData constructor', () => {
    it('can be called with the `new` keyword', () => {
        expect(new VideoData()).toBeInstanceOf(VideoData);
    });
});

describe('VideoData.count (getter)', () => {
    it('returns the correct number of records', () => {
        const src = getTestData();
        const instance = new VideoData(src);
        expect(instance.count).toEqual(src.length);
    });
});

describe('VideoData.data (getter)', () => {
    it('returns a new array', () => {
        const src = getTestData();
        const instance = new VideoData(src);
        expect(instance.data).not.toBe(src);
    });
});

describe('VideoData.addDateStamps', () => {
    const instance = new VideoData(getTestData());
    instance.addDateStamps('Class Date');

    it('adds `datestamp` properties', () => {
        const allHaveDatestamps = instance.data.every(
            record => record.hasOwnProperty('datestamp')
        );
        expect(allHaveDatestamps).toEqual(true);
    });
    it('assigns datestamps that match the class date', () => {
        const allDatestampsMatch = instance.data.every(
            record => formatDate(record.datestamp) === record['Class Date']
        );
        expect(allDatestampsMatch).toEqual(true);
    });
});

describe('VideoData.assignIDs', () => {
    const instance = new VideoData(getTestData());
    instance.assignIDs();

    it('assigns a unique ID to each record', () => {
        const IDs = instance.data.map(record => record.id);
        const setOfIDs = new Set(IDs);
        expect(setOfIDs.size).toEqual(IDs.length);
    });
});

describe('VideoData.filter', () => {
    const instance = new VideoData(getTestData());

    it('returns a new instance', () => {
        const result = instance.filter({});
        expect(result).not.toBe(instance);
    });
    it('filters by one field', () => {
        const result = instance.filter({
            'Category US': ['Fine Art']
        });
        expect(result.count).toEqual(2);
    });
    it('filters by two fields', () => {
        const result = instance.filter({
            'Category US': ['Fine Art'],
            'Hosted by': ['Plaid']
        });
        expect(result.count).toEqual(1);
    });
    it('filters by two filter values', () => {
        const result = instance.filter({
            'Hosted by': ['Plaid', 'Yarnspirations']
        });
        expect(result.count).toEqual(2);
    });
    it('returns all records if the filter value is null', () => {
        const result = instance.filter({
            'Category US': null
        });
        expect(result.count).toEqual(3);
    });
    it('returns no records if the filter value is an empty array', () => {
        const result = instance.filter({
            'Category US': []
        });
        expect(result.count).toEqual(0);
    });
});

describe('VideoData.sort', () => {
    const instance = new VideoData(getTestData());
    instance.addDateStamps('Class Date');

    it('returns a new instance', () => {
        const result = instance.sort({});
        expect(result).not.toBe(instance);
    });
    it('sorts a-z', () => {
        const EXPECTED = ['ColArt', 'Plaid', 'Yarnspirations'];
        const result = instance.sort({
            field: 'Hosted by',
            order: 'a-z'
        });
        const sortedValues = result.data.map(record => record['Hosted by']);
        expect(sortedValues).toMatchObject(EXPECTED);
    });
    it('sorts z-a', () => {
        const EXPECTED = ['Yarnspirations', 'Plaid', 'ColArt'];
        const result = instance.sort({
            field: 'Hosted by',
            order: 'z-a'
        });
        const sortedValues = result.data.map(record => record['Hosted by']);
        expect(sortedValues).toMatchObject(EXPECTED);
    });
    it('sorts newest to oldest', () => {
        const EXPECTED = [
            'Paint Night Live: Abstract Under the Sea Turtle',
            'Winsor & Newton Cotman Watercolour - Palm Tree Wall Art, by Mandy Peltier',
            '3 Hour Throw Crochet with no tools!'
        ];
        const result = instance.sort({
            field: 'datestamp',
            order: 'newest'
        });
        const sortedValues = result.data.map(record => record['Title US']);
        expect(sortedValues).toMatchObject(EXPECTED);
    });
    it('sorts oldest to newest', () => {
        const EXPECTED = [
            '3 Hour Throw Crochet with no tools!',
            'Winsor & Newton Cotman Watercolour - Palm Tree Wall Art, by Mandy Peltier',
            'Paint Night Live: Abstract Under the Sea Turtle'
        ];
        const result = instance.sort({
            field: 'datestamp',
            order: 'oldest'
        });
        const sortedValues = result.data.map(record => record['Title US']);
        expect(sortedValues).toMatchObject(EXPECTED);
    });
});

/*
 * Convert a JS timestamp to a date string in the format "M/D/YY".
 */
function formatDate(timestamp) {
    const d = new Date(timestamp);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() % 100}`;
}
