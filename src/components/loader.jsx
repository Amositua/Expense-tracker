import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full height of the viewport to center vertically
    }}
  >
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        borderWidth: '10px',
      }}
    >
      {/* <span className="sr-only">Loading...</span> */}
    </Spinner>
  </div>
  );
};

export default Loader;
