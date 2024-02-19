import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  url:"api/",
  production: true
};
