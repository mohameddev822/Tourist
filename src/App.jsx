import { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import CountryList from './components/CountryList';
import { LIMIT } from './data/filters';

export default function App() {
  const [text, setText] = useState('');
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState(null);
  const [meta, setMeta] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  function buildParams(offset) {
    const params = { limit: LIMIT, offset };
    if (text.trim()) params.q = text.trim();
    for (const key in filters) {
      if (filters[key]) params[key] = filters[key];
    }
    return params;
  }

  async function search(offset = 0) {
    setLoading(true);
    const response = await axios.get('/express/countries', { params: buildParams(offset) });
    const data = response.data.data || {};
    const objects = data.objects || [];

    if (offset > 0 && results) {
      setResults([...results, ...objects]);
    } else {
      setResults(objects);
    }
    setMeta(data.meta || null);
    setLoading(false);
  }

  function reset() {
    setText('');
    setFilters({});
    setResults(null);
    setMeta(null);
    setSelected(null);
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
      <Header onReset={reset} />
      <section className="px-6 pb-16 pt-6 md:px-12 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <Hero text={text} onTextChange={setText} onSearch={() => search(0)} loading={loading} hasResults={!!results} />
          <Filters filters={filters} onFilterChange={setFilters} />
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