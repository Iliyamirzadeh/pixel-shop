function FormField({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-red-400">{error.message}</p>}
    </div>
  )
}

export default FormField