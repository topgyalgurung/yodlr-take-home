import { useState } from "react";
import { Form, Label, FormGroup, Button, Input } from "reactstrap";

const Signup = () => {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    status: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    setIsTouched(true);
    const { name, value } = e.target;
    //simple validation
    if (value === "") {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, status } = formData;

    if (!isInvalid) {
      try {
        // ajax request add to json
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, status }),
        });
        if (response.ok) {
          alert(`Created a user with email ${email} & status ${status}`);
        } else {
          alert("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email: ", error);
        alert("An error occurred while sending the email.");
      }

      // after submit clear formdata
      setFormData(INITIAL_STATE);
    }
  };
  return (
    <div>
      <h1>Yodlr Registration Portal</h1>
      <>
        <Form onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Label for="firstName"> First Name</Label>
          </FormGroup>
          {""}
          <FormGroup floating>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Label for="lastName"> Last Name</Label>
          </FormGroup>
          {""}
          <FormGroup floating>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Label for="Email"> Email </Label>
          </FormGroup>
          {""}
          <FormGroup floating>
            <Input
              type="text"
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
            />
            <Label for="firstName"> Status</Label>
          </FormGroup>

          <Button type="submit">Submit</Button>
          <br />
          {isTouched && isInvalid && (
            <span style={{ color: "red" }}>Email can not be blank</span>
          )}
        </Form>
      </>
      {""}
      <p>
        <a href="/admin">Admin Page</a>
      </p>
    </div>
  );
};

export default Signup;
