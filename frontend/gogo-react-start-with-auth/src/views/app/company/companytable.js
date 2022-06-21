import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { CardBody, CardTitle } from 'reactstrap';
import { Card } from "@material-ui/core";
import IntlMessages from 'helpers/IntlMessages';
import Table from 'react-bootstrap/Table';
import confirm from "reactstrap-confirm";
import exportObject from 'api';
import displayNotification from '../../../components/common/react-notifications/DisplayNotification';

function ListCompany() {


  // eslint-disable-next-line no-unused-vars
  const [companys, setCompanys] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState([])
  // const [refresh,setRefresh] = useState()

  const history = useHistory()

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await exportObject.companyList()
        setCompanys(response.data);
      }
      catch (err) {
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
                      <FormOutlined style={{ color: 'grey' }} type='submit' size='large' onClick={() => history.push(`update/${company.company_id}`)} />
                      <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} type='submit' onClick={async () => {
                        const result = await confirm({
                          title: <div> Are You Sure Want to <strong>delete</strong> the Company? </div>,
                          message: "This Action Cannot Be Undone!",
                          confirmText: "Delete",
                          confirmColor: "danger",
                          cancelColor: "primary",
                        });
                        if (result) {
                          try {
                            const res1 = await exportObject.companyDelete(company.company_id)
                            if (res1.data.detail === 'Not Allowed To Delete'){
                              console.log('here');
                              displayNotification('Deleting', res1.data.detail, 'error');
                            }else{
                              console.log('in else block');
                              displayNotification('Deleting', res1.data.detail, 'success');
                            }  
                          } catch (err) {
                            displayNotification('Deleting Error', err.response.data.detail, 'error');
                          }
                          const response = await exportObject.companyList();
                          setCompanys(response.data);
                        }
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