import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  const [role, setRole] = useState("");

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setRole(
        decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );

    } 
    console.log("check role", role);
  }, [role]);

  if (token && role === "Admin") {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <Container>
          <Alert variant="danger" className="mt-3">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>You don't have premisson to acess this route</p>
          </Alert>
        </Container>
      </>
    );
  }
};

export default PrivateRoute;
