import React from 'react';
import renderer from 'react-test-renderer';
import Pencil from '../Pencil';

const REQUIRED_PROPS = {
    alt: 'Alt text',
    srcDesktop: 'desktop-image.jpg'
};

const OPTIONAL_PROPS = {
    srcTablet: 'tablet-image.jpg',
    srcMobile: 'mobile-image.jpg',
    href: 'test/link',
    outlined: true
};

it('renders correctly with all props', () => {
    const tree = renderer
        .create(<Pencil {...REQUIRED_PROPS} {...OPTIONAL_PROPS} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with only required props', () => {
    const tree = renderer
        .create(<Pencil {...REQUIRED_PROPS} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
