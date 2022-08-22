import React from 'react';

/**
 * An angle/chevron icon that can be used as an arrow.
 * @param {Object} props
 * @param {string} props.direction - (up|right|down|left) Which way the arrow
 *                   points.
 */
export default function AngleIcon({ direction }) {
    return <i className={`c-AngleIcon c-AngleIcon--${direction}`}></i>;
}
