

export default function CountryList({ countries, meta, loading, onMore }) {
  if (!countries.length) {
    return (
      <p className="mt-10 text-stone-600">
        Aucun pays ne correspond à ces critères. Essayez d'enlever un filtre ou de raccourcir le texte.
      </p>
    );
  }

  return (
    <section aria-label="Pays correspondants" className="mt-10">
      <p className="mb-4 text-sm text-stone-600">
        {meta?.total ?? countries.length} pays correspondent. Choisissez-en un pour voir sa fiche.
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => {
          const code = c.codes?.alpha_2;
          const name = c.names?.common ?? "Pays inconnu";
          const capital = c.capitals?.[0]?.name;
          const where = [c.subregion, c.region].filter(Boolean)[0];

          return (
            <li key={code ?? name}>
              <button
                type="button"
                onClick={() => code }
                className="flex w-full items-center gap-4 rounded-xl border border-stone-300 bg-white p-3 text-left transition hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
              >
                {c.flag?.url_svg ? (
                  <img
                    src={c.flag.url_svg}
                    alt=""
                    loading="lazy"
                    className="h-10 w-14 shrink-0 rounded-sm border border-stone-200 object-cover"
                  />
                ) : (
                  <span className="w-14 shrink-0 text-center text-3xl">{c.flag?.emoji}</span>
                )}
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{name}</span>
                  <span className="block truncate text-sm text-stone-600">
                    {[capital, where].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {meta?.more && (
        <button
          type="button"
          onClick={onMore}
          disabled={loading}
          className="mt-6 rounded-full border border-stone-300 bg-white px-6 py-2 text-sm transition hover:border-orange-600 disabled:opacity-50"
        >
          {loading ? "Chargement…" : "Voir plus de pays"}
        </button>
      )}
    </section>
  );
}