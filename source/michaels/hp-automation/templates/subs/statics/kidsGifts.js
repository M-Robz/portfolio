module.exports = function () {
    const loc = global.locale;

    return `
        <!-- KIDS GIFTS -->
        <style>
        .page-kids-gifts .u-bold {
            font-weight: bold;
        }

        .page-kids-gifts .mel-c-section__title {
            text-transform: none;
        }

        .page-kids-gifts .mel-string {
            padding-top: 0;
        }

        .page-kids-gifts .mel-string > * {
            margin-bottom: 1vw;
        }

        .page-kids-gifts .mel-string > a {
            /* Bugfix: override mel */
            margin-right: 0.5vw;
        }

        .page-kids-gifts .mel-o-media-stack {
            margin-bottom: 2em;
        }

        .page-kids-gifts .mel-o-media-stack__figure {
            /* IE bugfix: whitespace beneath image */
            flex-shrink: 0;
        }

        .page-kids-gifts .mel-o-media-stack__body {
            line-height: 1.2;
        }

        @media (min-width: 768px) {
            .page-kids-gifts .wish-list .mel-o-media-stack__body {
                max-width: 215px;
                font-size: 1.3em;
            }
        }
        </style>

        <div class="hp_kids-gifts">
            <div class="wish-list mel-string mel-string-3-up mel-string-6-up-medium" style="padding-top: 0">
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,YoungMaker)$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-young.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>Maker Gifts for Kids</p>
                    </div>
                </a>
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,${
                    loc === 'CA' ? 'BuddingArtist' : 'BuddingArtistGifts'
                })$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-artist.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>Art Gifts for Kids</p>
                    </div>
                </a>
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,FashionistaGifts)$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-fashionista.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>Fashion Gifts for Kids</p>
                    </div>
                </a>
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,${
                    loc === 'CA' ? 'Futurs Scientifiques' : 'FutureScientistGifts'
                })$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-scientist.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>STEM Gifts for Kids</p>
                    </div>
                </a>
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,${
                    loc === 'CA' ? 'Active Learner' : 'ActiveLearner'
                })$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-active.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>Activity Gifts for Kids</p>
                    </div>
                </a>
                <a class="mel-o-media-stack" href="$url(Link-Category,cgid,MiniCrafter)$">
                    <div class="mel-o-media-stack__figure">
                        <img src="images/categories/SE-GS-KG-211022-wishlist-crafter.jpg?$staticlink$" alt="">
                    </div>
                    <div class="mel-o-media-stack__body u-bold">
                        <p>Crafting Gifts for Kids </p>
                    </div>
                </a>
            </div>
        </div>
    `;
}
