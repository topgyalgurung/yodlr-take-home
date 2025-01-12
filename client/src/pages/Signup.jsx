import { useState } from "react";

const Signup = () => {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
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
    const { email } = formData;

    if (!isInvalid) {
      try {
        // ajax request add to json
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          alert(`Created user with email ${email}`);
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        <br />
        {isTouched && isInvalid && (
          <span style={{ color: "red" }}>Email can not be blank</span>
        )}
      </form>
      <p>
        <a href="/admin">Admin Page</a>
      </p>
    </div>
  );
};

export default Signup;
