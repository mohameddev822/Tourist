export default function CountryCard({ country }) {
  const code = country.codes && country.codes.alpha_2;
  const name = (country.names && country.names.common) || 'Pays inconnu';
  const capital = country.capitals && country.capitals[0] && country.capitals[0].name;
  const where = country.subregion || country.region;
  const subtitle = [capital, where].filter(Boolean).join(' · ');

  let flag;
  if (country.flag && country.flag.url_svg) {
    flag = (
      <img
        src={country.flag.url_svg}
        alt=""
        loading="lazy"
        className="h-10 w-14 shrink-0 rounded-sm border border-stone-200 object-cover"
      />
    );
  } else {
    flag = (
      <span className="w-14 shrink-0 text-center text-3xl">
        {country.flag && country.flag.emoji}
      </span>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => code}
        className="flex w-full items-center gap-4 rounded-xl border border-stone-300 bg-white p-3 text-left transition hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
      >
        {flag}
        <span className="min-w-0">
          <span className="block truncate font-semibold">{name}</span>
          <span className="block truncate text-sm text-stone-600">{subtitle}</span>
        </span>
      </button>
    </li>
  );
}