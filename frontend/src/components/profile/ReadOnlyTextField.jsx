export const ReadOnlyTextField = ({
  id,
  fieldName,
  label,
  placeholder,
  text,
}) => {
  return (
    <div className="mt-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="profile-field form-control border-white"
        placeholder={placeholder}
        required
        value={text}
        name={fieldName}
        readOnly
      />
    </div>
  );
};
