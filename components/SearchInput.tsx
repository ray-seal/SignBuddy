type SearchInputProps = {
  action: string;
  buttonText: string;
  id: string;
  label: string;
  name?: string;
  placeholder: string;
  value?: string;
};

export default function SearchInput({
  action,
  buttonText,
  id,
  label,
  name = "q",
  placeholder,
  value = "",
}: SearchInputProps) {
  return (
    <form className="search-form" action={action} method="get">
      <label htmlFor={id}>{label}</label>
      <div className="search-controls">
        <input
          autoComplete="off"
          id={id}
          name={name}
          placeholder={placeholder}
          type="search"
          defaultValue={value}
        />
        <button className="button button-primary" type="submit">
          {buttonText}
        </button>
      </div>
    </form>
  );
}
