import React from 'react';

/**
 * A mel category banner with HTML copy.
 * @param {Object} props
 * @param {string} props.markup - Markup for the text content.
 * @param {string} props.srcMobile - Mobile image source.
 * @param {string} props.srcDesktop - Desktop image source.
 * @param {string} [props.standardColor] - (red|green|yellow|blue) Use this to
 *                   specify a background color from the mel component's
 *                   standard set. Required if `customColor` is not provided.
 * @param {string} [props.customColor] - Use this to specify a custom background
 *                   color (e.g., `#000`). Required if `standardColor` is not
 *                   provided.
 */
export default function HtmlBanner({
    markup, srcMobile, srcDesktop, standardColor, customColor
}) {
    return (
        <div
            className={`mel-category-banner${
                standardColor ? ` mel-category-banner--${standardColor}` : ''
            }`}
            style={
                customColor && { backgroundColor: customColor }
            }
        >
            <div className="mel-category-banner__content" dangerouslySetInnerHTML={
                { __html: markup }
            }></div>
            <div className="mel-category-banner__media">
                <picture>
                    <source srcSet={srcMobile} media="(max-width: 480px)" />
                    <img src={srcDesktop} alt="" />
                </picture>
            </div>
        </div>
    );
}
