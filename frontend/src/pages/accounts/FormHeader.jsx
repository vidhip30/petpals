export const FormHeader = ({
  accountType,
  handleSeekerClick,
  handleShelterClick,
}) => {
  return (
    <div className="form-header">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item cur">
          <btn className="nav-link" onClick={handleSeekerClick}>
            Pet Seeker
          </btn>
        </li>
        <li className="nav-item">
          <btn
            className="nav-link active"
            aria-current="page"
            onClick={handleShelterClick}
          >
            Pet Shelter
          </btn>
        </li>
      </ul>
      <h1 id="formtitle" className="d-flex justify-content-center">
        {accountType} <span id="signuptitle"> SIGN UP</span>
      </h1>
    </div>
  );
};
