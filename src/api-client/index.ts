/* tslint:disable */

import {
    ApplicationClient,
    CityClient,
    OfficeClient,
    ProductClient,
    SessionClient,
    SubjectClient,
    VenueClient,
    PaymentChannelClient,
    GLAccountClient,
    FeeMatrixClient,
    OrderClient,
    JournalRecordClient,
    RefundClient,
    AuthClient
} from './client';
export class AppConfig {
    public apiUrl?: string;
}

export let appConfig = new AppConfig();

function loadConfig() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', '/app-config.json', false);
    xmlHttp.send(null);
    if (xmlHttp && xmlHttp.status === 200) {
        const response = xmlHttp.responseText;
        appConfig = JSON.parse(response) as AppConfig;
    }
}

loadConfig();

const applicationClient = new ApplicationClient(appConfig.apiUrl);
const cityClient = new CityClient(appConfig.apiUrl);
const officeClient = new OfficeClient(appConfig.apiUrl);
const productClient = new ProductClient(appConfig.apiUrl);
const sessionClient = new SessionClient(appConfig.apiUrl);
const subjectClient = new SubjectClient(appConfig.apiUrl);
const venueClient = new VenueClient(appConfig.apiUrl);
const paymentChannelClient = new PaymentChannelClient(appConfig.apiUrl);
const glAccountClient = new GLAccountClient(appConfig.apiUrl);
const feeMatrixClient = new FeeMatrixClient(appConfig.apiUrl);
const orderClient = new OrderClient(appConfig.apiUrl);
const journalRecordClient = new JournalRecordClient(appConfig.apiUrl);
const refundClient = new RefundClient(appConfig.apiUrl);
const authClient = new AuthClient(appConfig.apiUrl);
export const _Client = {
    applicationClient,
    cityClient,
    officeClient,
    productClient,
    sessionClient,
    subjectClient,
    venueClient,
    paymentChannelClient,
    glAccountClient,
    feeMatrixClient,
    orderClient,
    journalRecordClient,
    refundClient,
    authClient
};
