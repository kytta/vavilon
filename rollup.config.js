import configDev from './build/rollup.config.dev';
import configProd from './build/rollup.config.prod';

export default cliArgs => {
    if (cliArgs['config-dev'] === true) {
        return configDev;
    }

    return configProd;
};
