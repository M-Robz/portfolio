import React from 'react';
import renderer from 'react-test-renderer';
import GlobalContext from '../../_template/store/global-context';
import LoadingContext from '../../store/loading-context';
import Video from '../Video';

const GLOBAL_STATE = {
    region: {
        isCanada: false,
        isQuebec: false
    },
    locale: 'us'
};

const DATA = {
    'Video ID': 'https://www.youtube.com/watch?v=7bLxzojWrfA',
    'Title US': '3 Hour Throw Crochet with no tools!',
    'Hosted by': 'Yarnspirations',
    'Class Date': '6/20/2022'
};

it('renders skeletons while loading', () => {
    // TODO: better way to test?
    const tree = renderer.create(
        <GlobalContext.Provider value={GLOBAL_STATE}>
            <LoadingContext.Provider value={true}>
                <Video />
            </LoadingContext.Provider>
        </GlobalContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly once loaded', () => {
    const tree = renderer.create(
        <GlobalContext.Provider value={GLOBAL_STATE}>
            <LoadingContext.Provider value={false}>
                <Video data={DATA} />
            </LoadingContext.Provider>
        </GlobalContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
