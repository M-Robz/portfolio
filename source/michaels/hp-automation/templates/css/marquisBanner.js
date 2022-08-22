/*
 * Note: using pseudo-element on overlay so opacity of background can be changed
 * without affecting opacity of text content
 */
module.exports = function () {
    return /*css*/`
        /* Marquis banner */
        .mel .c-marquis-banner {
            position: relative;
            margin-bottom: 1em;
        }
        .mel .c-marquis-banner__link:hover {
            color: inherit;
        }
        .mel .c-marquis-banner__overlay {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 175px;
        }
        .mel .c-marquis-banner__overlay::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #df0c0c;
        }
        .mel .c-marquis-banner__text {
            z-index: 1;
            padding: 8px 24px;
            text-align: center;
            color: #1B1B1B;
        }
        .mel .c-marquis-banner__headline {
            margin-bottom: 8px;
            font-size: 20px;
            font-weight: bold;
            line-height: 28px;
        }
        .mel .c-marquis-banner__subhead {
            margin: 0 0 10px;
            font-size: 12px;
            line-height: 16px;
        }
        .mel .c-marquis-banner__disclaimer {
            margin: 0;
            font-size: 10px;
            line-height: 1.1;
        }
        .mel .c-marquis-banner__cta {
            margin-top: 16px;
        }
        .mel .c-marquis-banner__cta button {
            margin-bottom: 0;
            padding: 0.43rem 1.21875rem !important;
            font-size: 12px;
            /* override IT styles */
            font-weight: bold !important;
            background: linear-gradient(135deg, #E9425B, #CF1F2E) !important;
            border-radius: 2em !important;
            /* override mel */
            border-width: 0 !important;
            /* override IT styles */
            box-shadow: none !important;
        }
        .mel .c-marquis-banner__cta button:hover {
            background: linear-gradient(135deg, #C31C35, #A90008) !important;
        }
        @media (min-width: 481px) {
            .mel .c-marquis-banner__media {
                position: relative;
                height: 175px;
                overflow: hidden;
            }
            .mel .c-marquis-banner__media img {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: auto;
                height: 100%;
            }
        }
        @media (min-width: 596px) {
            .mel .c-marquis-banner__media {
                height: 210px;
            }
            .mel .c-marquis-banner__overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 288px;
                height: 100%;
            }
            .mel .c-marquis-banner__overlay::before {
                opacity: 0.85;
            }
            .mel .c-marquis-banner__text {
                padding: 24px 32px;
                text-align: left;
            }
        }
        @media (min-width: 715px) {
            .mel .c-marquis-banner__media {
                height: 330px;
            }
            .mel .c-marquis-banner__overlay {
                top: 50%;
                transform: translateY(-50%);
                width: 426px;
                height: auto;
                min-height: 241px;
                max-height: 95%;
            }
            .mel .c-marquis-banner__overlay::before {
                border-radius: 0 24px 24px 0;
            }
            .mel .c-marquis-banner__text {
                padding: 16px 40px;
            }
            .mel .c-marquis-banner__headline {
                font-size: 36px;
                line-height: 42px;
            }
            .mel .c-marquis-banner__subhead {
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 12px;
            }
            .mel .c-marquis-banner__disclaimer {
                font-size: 12px;
            }
            .mel .c-marquis-banner__cta {
                margin-top: 24px;
            }
        }
        @media (min-width: 1123px) {
            .mel .c-marquis-banner__media {
                height: 400px;
            }
            .mel .c-marquis-banner__overlay {
                width: 480px;
                min-height: 337px;
            }
            .mel .c-marquis-banner__text {
                padding: 40px;
            }
            .mel .c-marquis-banner__headline {
                margin-bottom: 16px;
            }
        }
    `;
}
