import CountryCard from './CountryCard';

export default function CountryList({ countries, meta, loading, onMore , data }) {
  if (!countries) {
    return <CountryCard data={data} />;
  }

  if (countries.length === 0) {
    return (
      <p className="mt-10 text-stone-600">
        Aucun pays ne correspond à ces critères. Essayez d'enlever un filtre ou de raccourcir le texte.
      </p>
    );
  }

  const total = (meta && meta.total) || countries.length;

  return (
    <section aria-label="Pays correspondants" className="mt-10">
      <p className="mb-4 text-sm text-stone-600">
        {total} pays correspondent. Choisissez-en un pour voir sa fiche.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <CountryCard key={country.codes?.alpha_2 || country.names?.common} country={country} />
        ))}
      </ul>

      {meta && meta.more && (
        <button
          type="button"
          onClick={onMore}
          disabled={loading}
          className="mt-6 rounded-full border border-stone-300 bg-white px-6 py-2 text-sm transition hover:border-orange-600 disabled:opacity-50"
        >
          {loading ? 'Chargement…' : 'Voir plus de pays'}
        </button>
      )}
    </section>
  );
}