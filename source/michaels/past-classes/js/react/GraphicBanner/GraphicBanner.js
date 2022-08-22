import React from 'react';

/**
 * A banner with copy in the image.
 * @param {Object}  props
 * @param {string}  props.srcMobile - Mobile image source.
 * @param {string}  props.srcDesktop - Desktop image source.
 * @param {string}  props.readerMarkup - Markup visible only to screen readers.
 * @param {string}  [props.href] - The link destination.
 * @param {boolean} [props.outlined] - Whether the banner is outlined.
 */
export default function GraphicBanner({
    srcMobile, srcDesktop, readerMarkup, href, outlined
}) {

    const image = (
        <picture>
            <source srcSet={srcMobile} media="(max-width: 480px)" />
            <img className="c-banner__img" src={srcDesktop} alt="" />
        </picture>
    );

    const copy = (
        <div className="c-banner__copy sr-only" dangerouslySetInnerHTML={
            { __html: readerMarkup }
        }></div>
    );

    return (
        <div className={`c-banner u-mb-1r${ outlined ? ' u-outline' : '' }`}>
            { href ? (
                <a className="c-banner__link" href={href}>
                    {image}
                    {copy}
                </a>
            ) : (
                <>
                    {image}
                    {copy}
                </>
            ) }
        </div>
    );
}
