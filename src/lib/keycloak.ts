import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8180',
  realm: 'medipro',
  clientId: 'medipro-ui',
});

export default keycloak;
