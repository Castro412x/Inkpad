function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
      {text && <p className="text-slate-600 text-sm font-medium">{text}</p>}
    </div>
  );
}

export default Loader;
