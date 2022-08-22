import React from 'react';
import renderer from 'react-test-renderer';
import GraphicBanner from '../GraphicBanner';

const REQUIRED_PROPS = {
    srcMobile: 'mobile-image.jpg',
    srcDesktop: 'desktop-image.jpg',
    readerMarkup: '<h2>Lorem ipsum</h2>'
};

const OPTIONAL_PROPS = {
    href: 'test/link',
    outlined: true
};

it('renders correctly with all props', () => {
    const tree = renderer
        .create(<GraphicBanner {...REQUIRED_PROPS} {...OPTIONAL_PROPS} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with only required props', () => {
    const tree = renderer
        .create(<GraphicBanner {...REQUIRED_PROPS} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
