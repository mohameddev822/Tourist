import { YES_NO } from '../data/filters';

const BOX =
  'rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:ring-2 focus:ring-orange-600';

export default function FilterField({ field, value, onChange }) {
  let input;
  if (field.type === 'text') {
    input = (
      <input
        type="text"
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={BOX}
      />
    );
  } else {
    const options = field.type === 'tri' ? YES_NO : field.options;
    input = (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={BOX}>
        <option value="">Peu importe</option>
        {options.map(([val, name]) => (
          <option key={val} value={val}>{name}</option>
        ))}
      </select>
    );
  }

  return (
    <label className="flex flex-col gap-1 text-sm text-stone-600">
      {field.label}
      {input}
    </label>
  );
}