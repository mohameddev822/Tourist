export default function Header({ onReset }) {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-12">
      <button type="button" onClick={onReset} className="text-xl font-bold tracking-tight">
        Tourist
      </button>
    </header>
  );
}