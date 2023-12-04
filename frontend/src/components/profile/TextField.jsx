export const TextField = ({
  id,
  fieldName,
  label,
  placeholder,
  text,
  setText,
  handleUpdate,
}) => {
  return (
    <div className="mt-3">
      <label for={id} className="form-label">
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
        onChange={(e) => {
          setText(e.target.value);
        }}
        onBlur={handleUpdate}
      />
    </div>
  );
};
