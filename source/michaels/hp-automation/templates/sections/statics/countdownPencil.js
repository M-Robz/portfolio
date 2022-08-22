module.exports = function () {
    const loc = global.locale;

    return `
        <!-- COUNTDOWN PENCIL -->
        <section
            class="mel-c-section mel-margin--bottom-full js-countdown-pencil hidden"
            id="hp_countdown-pencil">
            <div class="mel-c-section__header" style="color: #6b65a9">
                <h2 class="mel-c-section__title js-countdown-pencil__message"></h2>
            </div>
        </section>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                var daysLeft = getDaysUntilEaster(readSiteDate());
                var message;

                ${ loc === 'QU' ?

                `if (daysLeft > 1) {
                    message = daysLeft + ' JOURS AVANT PÂQUES!';
                } else if (daysLeft === 1) {
                    message = 'PÂQUES EST DEMAIN!';
                } else {
                    return;
                }`

                :

                `if (daysLeft > 1) {
                    message = daysLeft + ' DAYS \\'TIL EASTER!';
                } else if (daysLeft === 1) {
                    message = 'EASTER IS TOMORROW!';
                } else {
                    return;
                }`


                }

                var pencil = document.querySelector('.js-countdown-pencil');
                pencil.querySelector('.js-countdown-pencil__message').innerText = message;
                pencil.classList.remove('hidden');

                function getDaysUntilEaster(currentDate) {
                    var MS_IN_A_DAY = 1000 * 60 * 60 * 24;
                    var easter = new Date(2022, 3, 17).valueOf();

                    var now = currentDate ? currentDate.valueOf() : Date.now();
                    var daysLeft = (easter - now) / MS_IN_A_DAY;
                    return Math.max(Math.ceil(daysLeft), 0);
                }

                function readSiteDate() {
                    var regex = /__siteDate=(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/;
                    var r = regex.exec(window.location.search);
                    if (r) {
                        return new Date(+r[1], +r[2] - 1, +r[3], +r[4], +r[5]);
                    } else {
                        return null;
                    }
                }
            });
        </script>
    `;
}
