import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enLanding from './locales/en/landing.json'
import enInstall from './locales/en/install.json'
import enWorkshop from './locales/en/workshop.json'
import enHandbook from './locales/en/handbook.json'
import enCampaign from './locales/en/campaign.json'
import enWalkthrough from './locales/en/walkthrough.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
      install: enInstall,
      workshop: enWorkshop,
      handbook: enHandbook,
      campaign: enCampaign,
      walkthrough: enWalkthrough,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: [
    'common',
    'landing',
    'install',
    'workshop',
    'handbook',
    'campaign',
    'walkthrough',
  ],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
