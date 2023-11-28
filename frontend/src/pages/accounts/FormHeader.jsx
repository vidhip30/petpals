export const FormHeader = ({
  accountType,
  handleSeekerClick,
  handleShelterClick,
}) => {
  return (
    <div className="form-header">
      <ul className="nav nav-tabs mb-3">
        <li
          className={accountType === "Pet Seeker" ? "nav-item cur" : "nav-item"}
        >
          <btn
            className={
              accountType === "Pet Seeker" ? "nav-link active" : "nav-link"
            }
            onClick={handleSeekerClick}
          >
            Pet Seeker
          </btn>
        </li>
        <li
          className={
            accountType === "Pet Shelter" ? "nav-item cur" : "nav-item"
          }
        >
          <btn
            className={
              accountType === "Pet Shelter" ? "nav-link active" : "nav-link"
            }
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
