import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { CardBody, CardTitle } from 'reactstrap';
import { Card } from "@material-ui/core";
import IntlMessages from 'helpers/IntlMessages';
import Table from 'react-bootstrap/Table';
import axios from '../../../api/axios';
import displayNotification from '../../../components/common/react-notifications/DisplayNotification';

function ListTable() {

  const str1 = localStorage.getItem('gogo_current_user');
  const str2 = JSON.parse(str1);
  const token = str2.access_token;
  // eslint-disable-next-line no-unused-vars
  const [user, setUsers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState([])

  const history = useHistory()

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get('/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        displayNotification('Fetching Error', err.response.data.detail, 'error');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="Users" />
          </CardTitle>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>CompanyID</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>ContactNo</th>
                <th>DOB</th>
                <th>Working Under</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((users) => {
                return (
                  <tr key={users.id}>
                    <td>{users.id}</td>
                    <td>{users.c_id}</td>
                    <td>{users.fullname}</td>
                    <td>{users.email}</td>
                    <td>{users.contact_no}</td>
                    <td>{users.dob}</td>
                    <td>{users.working_under}</td>
                    <td>{users.role_id}</td>
                    <td><FormOutlined style={{ color: 'grey' }} type='submit' onClick={() => history.push(`update/${users.id}`)} />
                      <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} type='submit' onClick={async () => {
                        await axios.delete(`/user/${users.id}`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const response = await axios.get('/user', {
                          headers: {
                            'Authorization': `Bearer ${token}`
                          }
                        });
                        setUsers(response.data);
                      }} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ListTable;