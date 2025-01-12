import { useEffect, useState } from "react";
import { Table } from "reactstrap";
const Admin = () => {
  const [users, setUsers] = useState([]);
  // fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log("failed to fetch users");
        }
      } catch (error) {
        console.log("error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1> Admin Dashboard</h1>
      {/* <body>List user data here</body> */}
      <h2> User List</h2>
      {users.length === 0 ? (
        <p> No users found</p>
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>First name: </th>
              <th>Last name:</th>
              <th>Email</th>
              <th>Pending:</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.state}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <p>
        <a href="/signup">Signup Page</a>
      </p>
    </div>
  );
};

export default Admin;
