import React, { useState, useEffect } from "react";
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';
import { CardBody, CardTitle, Card, Label, FormGroup, Row, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from '../../api/axios'
import displayNotification from "../../components/common/react-notifications/DisplayNotification";

const AddUser = () => {

   // eslint-disable-next-line no-unused-vars
  const [isUser, setIsUser] = useState(true);
   // eslint-disable-next-line no-unused-vars
  const [req, setReq] = useState(true);

const validationSchemas = yup.object({
  companyid: yup
    .string('Company is required')
    .matches(/^[0-9]*$/, 'Please enter valid Company Id')
    .required('Company is required'),
  fullname: yup
    .string('fullname is required')
    .matches(/^[a-zA-Z ]+$/, 'Please enter valid Name')
    .required('fullname cant be empty'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  contactno: yup
    .string('Enter your Contact no')
    .matches(/^[0-9]*$/, 'Please enter a Valid Conatct No.')
    .min(10, 'Conatct No. should be of minimum 10 in length')
    .max(10, 'Conatct No. should be of maximum 10 in length')
    .required('Conatact no. is required'),
  dob: yup
    .string('Enter your Date of Birth')
    .required('Date of Birth is required'),
  Supervisorselect: req ? yup.string().required('Required') : yup.string(''),
  Roleselect: yup
    .string('Select a Role')
    .required('Select a Role'),
})

  const str1 = localStorage.getItem('gogo_current_user');
  const str2 = JSON.parse(str1);
  const token = str2.access_token;
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  // const [errorMessages, setErrorMessages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);

  const submitForm = (values) => {
    (
      axios.post('/user', {
        "working_under": parseInt(values.Supervisorselect, 10),
        "role_id": parseInt(values.Roleselect, 10),
        "password": values.password,
        'fullname': values.fullname,
        "email": values.email,
        "dob": values.dob,
        "contact_no": values.contactno,
        "c_id": parseInt(values.companyid, 10),
      }
        , {
          headers: {
            'Authorization': `bearer ${token}`
          }
        }
      )
        .then(response => {
          setSuccess(response.data.detail)
          displayNotification('User', response.data.detail, "success");
        })
        .catch(err => {
          setError(err.response.data.detail)
          displayNotification('User', err.response.data.detail, "error");
        }));
  }

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get('/supervisor', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        displayNotification('Fetching Error', err.response.data.detail, 'error')
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="Add User" />
          </CardTitle>
          <Formik
            initialValues={{
              companyid: '',
              fullname: '',
              email: '',
              password: '',
              contactno: "",
              dob: '2000-01-01',
              Supervisorselect: '',
              Roleselect: '',
            }}
            validationSchema={validationSchemas}
            onSubmit={submitForm}
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <Row>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="companyid"
                          name="companyid"
                          label="companyid"
                          type="string" />
                        {errors.companyid && touched.companyid ? (
                          <div className="invalid-feedback d-block">
                            {errors.companyid}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Company Id" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="fullname"
                          name="fullname"
                          label="fullname"
                          type="string" />
                        {errors.fullname && touched.fullname ? (
                          <div className="invalid-feedback d-block">
                            {errors.fullname}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Fullname" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="email"
                          name="email"
                          label="email"
                          type="email" />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Email" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="password"
                          name="password"
                          label="password"
                          type="password" />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Password" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="contactno"
                          name="contactno"
                          label="contactno"
                          type="string" />
                        {errors.contactno && touched.contactno ? (
                          <div className="invalid-feedback d-block">
                            {errors.contactno}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Contact No." />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="dob"
                          name="dob"
                          label="dob"
                          type="date" />
                        {errors.dob && touched.dob ? (
                          <div className="invalid-feedback d-block">
                            {errors.dob}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Date Of Birth" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field as='select' className="w-100" style={{ height: '30px' }}
                          labelId="demo-simple-select-helper-label1"
                          id="Roleselect"
                          name='Roleselect'
                          label='Roleselect'
                          onChange={(event) => {
                          setFieldValue('Roleselect',event.target.value)
                            if (event.target.value === '3') {
                              setIsUser(false);
                              setReq(true);
                            } else {
                              setIsUser(true);
                              setReq(false);
                              setFieldValue('Supervisorselect','1')
                            }
                          }}
                        >
                          <option value='' >None</option>
                          <option value='3' >User</option>
                          <option value='2' >Supervisor</option>
                          <option value='1' >Admin</option>
                        </Field>
                        {errors.Roleselect && touched.Roleselect ? (
                          <div className="invalid-feedback d-block">
                            {errors.Roleselect}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Select Role" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field disabled={isUser} as='select' className="w-100" style={{ height: '30px' }}
                          id="Supervisorselect"
                          name='Supervisorselect'
                          label="Supervisor"
                        >
                          <option value=''>None</option>
                          {users.map((userss) => (
                            <option value={userss.id} key={userss.id}>{userss.fullname}</option>
                          ))}
                        </Field>
                        {errors.Supervisorselect && touched.Supervisorselect ? (
                          <div className="invalid-feedback d-block">
                            {errors.Supervisorselect}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Select Supervisor" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                </Row>
                <div className="text-center">
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddUser