import axios from 'axios';
import { useState } from 'react';
import CountryList from './CountryList';

const LIMIT = 24;

const YES_NO = [['1', 'Oui'], ['0', 'Non']];


const GROUPS = [
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

export default function App() {
  const [text, setText] = useState('');
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState(null); 
  const [meta, setMeta] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function setFilter(key, value) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  const activeCount = Object.values(filters).filter(Boolean).length;

  function renderField({ key, label, type, options, placeholder }) {
    const box = 'rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:ring-2 focus:ring-orange-600';
    return (
      <label key={key} className="flex flex-col gap-1 text-sm text-stone-600">
        {label}
        {type === 'text' ? (
          <input
            type="text"
            value={filters[key] ?? ''}
            placeholder={placeholder}
            onChange={(e) => setFilter(key, e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search(0)}
            className={box}
          />
        ) : (
          <select value={filters[key] ?? ''} onChange={(e) => setFilter(key, e.target.value)} className={box}>
            <option value="">Peu importe</option>
            {(type === 'tri' ? YES_NO : options).map(([value, name]) => (
              <option key={value} value={value}>{name}</option>
            ))}
          </select>
        )}
      </label>
    );
  }

  function buildParams(offset) {
    const params = { limit: LIMIT, offset };
    if (text.trim()) params.q = text.trim();
    for (const [key, value] of Object.entries(filters)) {
      if (value) params[key] = value;
    }
    return params;
  }

  async function search(offset = 0) {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/express/countries', { params: buildParams(offset) });
      const { objects = [], meta: newMeta } = response.data?.data ?? {};
      setResults((prev) => (offset > 0 && prev ? [...prev, ...objects] : objects));
      setMeta(newMeta ?? null);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.response?.data?.error || 'La recherche a échoué. Réessayez dans un instant.');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setText('');
    setFilters({});
    setResults(null);
    setMeta(null);
    setSelected(null);
    setError('');
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-stone-50 px-6 py-8 text-stone-900 md:px-12">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="mb-6 rounded-full border border-stone-300 bg-white px-5 py-2 text-sm transition hover:border-orange-600"
        >
          Retour aux résultats
        </button>
        <CountryList data={selected} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <button type="button" onClick={reset} className="text-xl font-bold tracking-tight">
          Tourist
        </button>
      </header>

      <section className="px-6 pb-16 pt-6 md:px-12 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
            Décrivez votre voyage.<br />Choisissez votre pays.
          </h1>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => search(0)}
              disabled={loading}
              className="h-12 w-full rounded-full bg-orange-600 px-6 text-white transition hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 disabled:opacity-60 sm:w-auto"
            >
              {loading && !results ? 'Recherche…' : 'Rechercher'}
            </button>
          </div>

          <fieldset className="mt-6 max-w-5xl">
            <legend className="mb-2 text-sm font-semibold">
              Filtres{activeCount > 0 ? ` (${activeCount} actif${activeCount > 1 ? 's' : ''})` : ''}
            </legend>
            {GROUPS.map((group) => (
              <details key={group.title} open={group.open} className="border-t border-stone-200 py-3">
                <summary className="cursor-pointer text-sm font-semibold">{group.title}</summary>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {group.fields.map(renderField)}
                </div>
              </details>
            ))}
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters({})}
                className="mt-2 text-sm text-orange-700 underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </fieldset>

          {error && (
            <p role="alert" className="mt-6 text-sm text-red-700">
              {error}
            </p>
          )}

          {results && (
            <CountryList
              countries={results}
              meta={meta}
              loading={loading}
              onMore={() => search(results.length)}
            />
          )}
        </div>
      </section>
    </div>
  );
}