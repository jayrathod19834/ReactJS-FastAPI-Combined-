import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { CardBody, CardTitle } from 'reactstrap';
import { Card } from "@material-ui/core";
import IntlMessages from 'helpers/IntlMessages';
import Table from 'react-bootstrap/Table';
import confirm from "reactstrap-confirm";
import exportObject from '../../../api';
import displayNotification from '../../../components/common/react-notifications/DisplayNotification';

function ListTable() {

  // eslint-disable-next-line no-unused-vars
  const [user, setUsers] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState([])

  const history = useHistory()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await exportObject.userList()
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
                      <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} type='submit' onClick={ async () =>{
                          let result = await confirm({
                            title: <div> Are You Sure Want to <strong>delete</strong> the Company? </div>,
                            message: "This Action Cannot Be Undone!",
                            confirmText: "Delete",
                            confirmColor: "danger",
                            cancelColor: "primary", 
                          });
                          if (result){
                            try{
                              const res1 = await exportObject.userDelete(users.id)
                              displayNotification('Deleting', res1.data, 'error');
                            }catch (err){
                              displayNotification('Deleting Error', err.response.data.detail, 'error');
                            }
                            const response = await exportObject.userList()
                            setUsers(response.data);
                          }
                      }}
                       />
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