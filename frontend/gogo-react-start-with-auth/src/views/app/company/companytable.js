import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {FormOutlined,DeleteOutlined} from '@ant-design/icons'
import { CardBody, CardTitle } from 'reactstrap';
import { Card } from "@material-ui/core";
import IntlMessages from 'helpers/IntlMessages';
import Table from 'react-bootstrap/Table';
import displayNotification from '../../../components/common/react-notifications/DisplayNotification';
import axios from '../../../api/axios';

function ListCompany() {

  const str1 = localStorage.getItem('gogo_current_user');
  const str2 = JSON.parse(str1);
  const token = str2.access_token;
  // eslint-disable-next-line no-unused-vars
  const [companys, setCompanys] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState([])
  // const [refresh,setRefresh] = useState()

  const history = useHistory()

  useEffect(() => {
    const fetchCompany = async () => {

      try {
        const response = await axios.get('/company', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCompanys(response.data);
      } catch (err) {
        displayNotification('Fetching Error', err.response.data.detail, 'error')
      }
    };
    fetchCompany();
  }, []);


  return (
    <div>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="Company" />
          </CardTitle>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companys.map((company) => {
                return (
                  <tr key={company.company_id}>
                    <td>{company.company_id}</td>
                    <td>{company.company_name}</td>
                    <td>{company.country}</td>
                    <td>{company.state}</td>
                    <td>{company.city}</td>
                    <td>{company.pincode}</td>
                    <td>{company.department}</td>
                    <td>{company.branch}</td>
                    <td>{company.address}</td>
                    <td>
                      <FormOutlined  style={{color: 'grey'}} type='submit' size='large' onClick={() => history.push(`update/${company.company_id}`)}/>
                      <DeleteOutlined style={{color: 'red',marginLeft:12}} type='submit' onClick={async () => {
                        try {
                          const res1 = await axios.delete(`/company/${company.company_id}`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                          })
                          displayNotification('Deleting', res1.data.detail, 'error');
                        } catch (err) {
                          displayNotification('Deleting Error', err.response.data.detail, 'error');
                        }
                        const response = await axios.get('/company', {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        setCompanys(response.data);
                      }}>
                        Delete
                      </DeleteOutlined>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div >
  );
}

export default ListCompany;