import React from 'react';

/**
 * A pencil banner.
 * @param {Object}  props
 * @param {string}  props.alt - Value for the image's alt attribute.
 * @param {string}  props.srcDesktop - Desktop image source.
 * @param {string}  [props.srcTablet] - Tablet image source.
 * @param {string}  [props.srcMobile] - Mobile image source.
 * @param {string}  [props.href] - The link destination.
 * @param {boolean} [props.outlined] - Whether the pencil is outlined.
 */
export default function Pencil({
    alt, srcDesktop, srcTablet, srcMobile, href, outlined
}) {
    const image = (
        <picture>
            { srcMobile && <source srcSet={srcMobile} media="(max-width: 480px)" /> }
            { srcTablet && <source srcSet={srcTablet} media="(max-width: 800px)" /> }
            <img className="c-pencil__img" src={srcDesktop} alt={alt} />
        </picture>
    );

    return (
        <div className={`c-pencil${ outlined ? ' u-outline' : '' }`}>
            { href ? (
                <a className="c-pencil__link" href={href}>
                    {image}
                </a>
            ) : image }
        </div>
    );
}
