export const LIMIT = 24;
export const YES_NO = [['1', 'Oui'], ['0', 'Non']];

export const GROUPS = [
  {
    title: 'Destination',
    open: true,
    fields: [
      { key: 'region', label: 'Région du monde', type: 'select', options: [
        ['Africa', 'Afrique'], ['Americas', 'Amériques'], ['Asia', 'Asie'], ['Europe', 'Europe'],
        ['Oceania', 'Océanie'], ['Antarctic', 'Antarctique'] ] },
      { key: 'continents', label: 'Continent', type: 'select', options: [
        ['Africa', 'Afrique'], ['North America', 'Amérique du Nord'], ['South America', 'Amérique du Sud'],
        ['Asia', 'Asie'], ['Europe', 'Europe'], ['Oceania', 'Océanie'], ['Antarctica', 'Antarctique'] ] },
      { key: 'subregion', label: 'Sous-région (en anglais)', type: 'text', placeholder: 'Northern Europe' },
      { key: 'capitals', label: 'Capitale', type: 'text', placeholder: 'Rabat' },
      { key: 'borders', label: 'Voisin (code ISO à 3 lettres)', type: 'text', placeholder: 'FRA' },
      { key: 'landlocked', label: 'Sans accès à la mer', type: 'tri' },
    ],
  },
  {
    title: 'Pratique pour voyager',
    open: true,
    fields: [
      { key: 'languages', label: 'Langue parlée', type: 'select', options: [
        ['French', 'Français'], ['English', 'Anglais'], ['Spanish', 'Espagnol'], ['Arabic', 'Arabe'],
        ['Portuguese', 'Portugais'], ['German', 'Allemand'], ['Italian', 'Italien'], ['Dutch', 'Néerlandais'],
        ['Russian', 'Russe'], ['Turkish', 'Turc'], ['Chinese', 'Chinois'], ['Japanese', 'Japonais'],
        ['Hindi', 'Hindi'] ] },
      { key: 'currencies', label: 'Monnaie', type: 'select', options: [
        ['EUR', 'Euro (EUR)'], ['USD', 'Dollar américain (USD)'], ['GBP', 'Livre sterling (GBP)'],
        ['CHF', 'Franc suisse (CHF)'], ['MAD', 'Dirham marocain (MAD)'], ['AED', 'Dirham des Émirats (AED)'],
        ['TRY', 'Livre turque (TRY)'], ['EGP', 'Livre égyptienne (EGP)'], ['JPY', 'Yen (JPY)'],
        ['CNY', 'Yuan (CNY)'], ['INR', 'Roupie indienne (INR)'], ['THB', 'Baht (THB)'],
        ['CAD', 'Dollar canadien (CAD)'], ['AUD', 'Dollar australien (AUD)'], ['MXN', 'Peso mexicain (MXN)'],
        ['BRL', 'Réal brésilien (BRL)'] ] },
      { key: 'calling_codes', label: 'Indicatif téléphonique', type: 'text', placeholder: '212' },
      { key: 'tlds', label: 'Domaine internet', type: 'text', placeholder: '.ma' },
      { key: 'cars.driving_side', label: 'Conduite', type: 'select', options: [
        ['left', 'À gauche'], ['right', 'À droite'] ] },
      { key: 'units.measurement_system', label: 'Système de mesure', type: 'select', options: [
        ['metric', 'Métrique'], ['imperial', 'Impérial'] ] },
      { key: 'units.temperature_scale', label: 'Température', type: 'select', options: [
        ['Celsius', 'Celsius'], ['Fahrenheit', 'Fahrenheit'] ] },
      { key: 'date.start_of_week', label: 'Début de la semaine', type: 'select', options: [
        ['monday', 'Lundi'], ['saturday', 'Samedi'], ['sunday', 'Dimanche'] ] },
    ],
  },
  {
    title: 'Entrée et statut du territoire',
    fields: [
      { key: 'memberships.schengen', label: 'Espace Schengen', type: 'tri' },
      { key: 'memberships.eu', label: 'Union européenne', type: 'tri' },
      { key: 'memberships.eurozone', label: 'Zone euro', type: 'tri' },
      { key: 'memberships.commonwealth', label: 'Commonwealth', type: 'tri' },
      { key: 'classification.sovereign', label: 'État souverain', type: 'tri' },
      { key: 'classification.dependency', label: 'Territoire dépendant', type: 'tri' },
    ],
  },
  {
    title: 'Organisations internationales',
    fields: [
      { key: 'memberships.nato', label: 'OTAN', type: 'tri' },
      { key: 'memberships.oecd', label: 'OCDE', type: 'tri' },
      { key: 'memberships.g7', label: 'G7', type: 'tri' },
      { key: 'memberships.g20', label: 'G20', type: 'tri' },
      { key: 'memberships.brics', label: 'BRICS', type: 'tri' },
      { key: 'memberships.opec', label: 'OPEP', type: 'tri' },
      { key: 'memberships.african_union', label: 'Union africaine', type: 'tri' },
      { key: 'memberships.asean', label: 'ASEAN', type: 'tri' },
      { key: 'memberships.arab_league', label: 'Ligue arabe', type: 'tri' },
    ],
  },
];