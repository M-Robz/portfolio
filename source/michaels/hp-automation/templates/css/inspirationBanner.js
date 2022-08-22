module.exports = function () {
    return `
        /* Inspiration banner */
        .mel .c-inspiration-banner {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 1.5rem;
        }
        .mel .c-inspiration-banner__media--outline{
            outline: 1px solid #000;
            outline-offset: -1px;
        }
        .mel .c-inspiration-banner__media {
            align-self: stretch;
        }
        .mel .c-inspiration-banner__content {
            padding: 1.5rem 1rem;
            text-align: left;
        }
        .mel .c-inspiration-banner__headline {
            margin: 0 0 1rem;
            font-size: 1.75em;
            line-height: 1.2;
        }
        .mel .c-inspiration-banner__subhead {
            margin: 0 0 0.5rem;
            font-size: 1.1em;
            font-weight: bold;
            line-height: 1.2;
            color: #860400;
        }
        .mel .c-inspiration-banner__body {
            margin: 0 0 0.5rem;
            line-height: 1.4;
        }
        .mel .c-inspiration-banner__cta {
            margin-top: 1.5rem;
        }
        .mel .c-inspiration-banner__cta .mel-button {
            margin-bottom: 0;
            text-align: center;
            border-radius: 2em;
        }
        @media (min-width: 640px) {
            .mel .c-inspiration-banner {
                flex-direction: row-reverse;
                padding: 0;
            }
            .mel .c-inspiration-banner--no-reverse {
                flex-direction: row;
            }
            .mel .c-inspiration-banner > * {
                flex-basis: 50%;
            }
            .mel .c-inspiration-banner__image {
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
            .mel .c-inspiration-banner__content {
                padding: 2rem;
            }
            .mel .c-inspiration-banner__subhead {
                font-size: 1.25em;
            }
            .mel .c-inspiration-banner__cta .mel-button {
                min-width: 200px;
            }
        }
    `;
}
