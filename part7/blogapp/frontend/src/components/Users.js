/* eslint-disable jsx-a11y/control-has-associated-label */
import { React } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UsersTable() {
  const users = useSelector((state) =>
    [...state.users].sort((a, b) => b.blogs.length - a.blogs.length),
  );
  return (
    <table className="tg">
      <thead>
        <tr>
          <th className="tg-zv4m" />
          <th className="tg-zv4m">
            <span style={{ fontWeight: 'bold' }}>blogs created</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        <tr />
      </tbody>
    </table>
  );
}

function Users() {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      {users && <UsersTable />}
    </>
  );
}

export default Users;
