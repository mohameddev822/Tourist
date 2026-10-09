export default function Hero({  onSearch, loading, hasResults }) {
  return (
    <>
      <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
        Décrivez votre voyage.<br />Choisissez votre pays.
      </h1>

      <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="h-12 w-full rounded-full bg-orange-600 px-6 text-white transition hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 disabled:opacity-60 sm:w-auto"
        >
          {loading && !hasResults ? 'Recherche…' : 'Rechercher'}
        </button>
      </div>
    </>
  );
}