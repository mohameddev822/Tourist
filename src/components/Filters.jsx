import { GROUPS } from '../data/filters';
import FilterField from './FilterField';

export default function Filters({ filters, onFilterChange }) {
  let activeCount = 0;
  for (const value of Object.values(filters)) {
    if (value) activeCount++;
  }

  function setFilter(key, value) {
    onFilterChange({ ...filters, [key]: value });
  }

  const legend =
    'Filtres' + (activeCount > 0 ? ' (' + activeCount + ' actif' + (activeCount > 1 ? 's' : '') + ')' : '');

  return (
    <fieldset className="mt-6 max-w-5xl">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>

      {GROUPS.map((group) => (
        <details key={group.title} open={group.open} className="border-t border-stone-200 py-3">
          <summary className="cursor-pointer text-sm font-semibold">{group.title}</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {group.fields.map((field) => (
              <FilterField
                key={field.key}
                field={field}
                value={filters[field.key] || ''}
                onChange={(value) => setFilter(field.key, value)}
              />
            ))}
          </div>
        </details>
      ))}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => onFilterChange({})}
          className="mt-2 text-sm text-orange-700 underline"
        >
          Réinitialiser les filtres
        </button>
      )}
    </fieldset>
  );
}