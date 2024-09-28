export default function Control({ lableName, type, name, onchange, value }) {
  return (
    <div className="control">
      <label htmlFor={name}>{lableName}</label>
      <input required type={type} name={name} />
    </div>
  );
}
