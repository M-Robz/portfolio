import React from 'react';
import ReactDOM from 'react-dom';

// Custom modules
const onLocalhost = require('./modules/onLocalhost');

// Components
import App from './react/App/App';

// Store
import { ConfigProvider } from './react/store/config-context';
import { GlobalProvider } from './react/_template/store/global-context';

(function ($) {
    $(function() {
        'use strict';

        ReactDOM.hydrate(
            <GlobalProvider projectPath={projectPath}>
                <ConfigProvider>
                    <App
                        dataPath={ onLocalhost() ? localDataPath : libraryDataPath }
                    />
                </ConfigProvider>
            </GlobalProvider>,
            document.querySelector('#root')
        );

    });
})(jQuery);
