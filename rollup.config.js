import configDev from './config/rollup/rollup.config.dev';
import configProd from './config/rollup/rollup.config.prod';

export default (cliArgs) => {
  if (cliArgs['config-dev'] === true) {
    return configDev;
  }

  return configProd;
};
