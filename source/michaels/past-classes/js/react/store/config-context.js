import React, { useContext } from 'react';

// Store
import GlobalContext from "../_template/store/global-context";

/*
 * Imports configuration options for the applicable locale, and provides them as
 * context.
 *
 * Note that the provider consumes `GlobalContext`.
 */
const ConfigContext = React.createContext();

export function ConfigProvider({ children }) {
    const { region, projectPath } = useContext(GlobalContext);

    const configWrapper =
        // region.isQuebec ? require('../../config/quebec') :
        // region.isCanada ? require('../../config/canada') :
        require('../../config/us')
    ;
    const config = configWrapper(projectPath + 'img/');

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigContext;
