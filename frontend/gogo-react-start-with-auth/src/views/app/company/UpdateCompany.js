import React, { useState } from "react";
import * as yup from 'yup';
import { Field, Formik, Form } from 'formik';
import { CardBody, CardTitle, Card, Label, FormGroup, Row, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import exportObject from "api";
import displayNotification from "../../../components/common/react-notifications/DisplayNotification";

const validationSchemas = yup.object({
  CompanyName: yup
    .string('CompanyName is required')
    .min(3, 'CompanyName should be of minimum 3 characters length')
    .required('CompanyName is required'),
  Country: yup
    .string('Country is required')
    .min(3, 'Country should be of minimum 3 characters length')
    .required('Country cant be empty'),
  State: yup
    .string('State cant be Empty')
    .min(3, 'State should be of minimum 3 characters length')
    .required('State cant be Empty'),
  City: yup
    .string('Enter your City')
    .min(4, 'City should be of minimum 4 characters length')
    .required('City cant be Empty'),
  Pincode: yup
    .string('Enter your pincode')
    .min(6, 'Pincode should be of minimum 6 characters length')
    .max(6, 'Pincode should be of maximum 6 characters length')
    .required('Pincode is required'),
  Department: yup
    .string('Enter your Department')
    .min(3, 'CompanyName should be of minimum 3 characters length')
    .required('Department is required'),
  Branch: yup
    .string('Enter a Branch')
    .min(3, 'Branch should be of minimum 3 characters length')
    .required('Branch cant be Empty'),
  Addess: yup
    .string('Enter Address')
    .min(10, 'Addess should be of minimum 10 characters length')
    .required('Address cant be Empty'),
})

const UpdateCompany = ({ preloadedvalues }) => {

  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);
  const submitForm = async (values) => {
    try {
      const response = await exportObject.companyUpdate(values)
      setSuccess(response.data.detail)
      displayNotification('Company', response.data.detail, 'success');
    }
    catch (err) {
      displayNotification('Company', err.response.data.detail, 'error');
    }
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="Update Company" />
          </CardTitle>
          <Formik
            initialValues={{
              id: preloadedvalues.company_id,
              CompanyName: preloadedvalues.company_name,
              Country: preloadedvalues.country,
              State: preloadedvalues.state,
              City: preloadedvalues.city,
              Pincode: preloadedvalues.pincode,
              Department: preloadedvalues.department,
              Branch: preloadedvalues.branch,
              Addess: preloadedvalues.address,
            }}
            validationSchema={validationSchemas}
            onSubmit={submitForm}
          >
            {({
              errors,
              touched,
            }) => (
              <Form>
                <Row>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="CompanyName"
                          name="CompanyName"
                          label="CompanyName"
                          type="string" />
                        {errors.CompanyName && touched.CompanyName ? (
                          <div className="invalid-feedback d-block">
                            {errors.CompanyName}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Company Name" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="Country"
                          name="Country"
                          label="Country"
                          type="string" />
                        {errors.Country && touched.Country ? (
                          <div className="invalid-feedback d-block">
                            {errors.Country}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Country" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="State"
                          name="State"
                          label="State"
                          type="string" />
                        {errors.State && touched.State ? (
                          <div className="invalid-feedback d-block">
                            {errors.State}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="State" />
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
                          id="City"
                          name="City"
                          label="City"
                          type="string" />
                        {errors.City && touched.City ? (
                          <div className="invalid-feedback d-block">
                            {errors.City}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="City" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="Pincode"
                          name="Pincode"
                          label="Pincode"
                          type="string" />
                        {errors.Pincode && touched.Pincode ? (
                          <div className="invalid-feedback d-block">
                            {errors.Pincode}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Pincode" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="Department"
                          name="Department"
                          label="Department"
                          type="string" />
                        {errors.Department && touched.Department ? (
                          <div className="invalid-feedback d-block">
                            {errors.Department}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Department" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx md='8'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="Addess"
                          name="Addess"
                          label="Addess"
                          type="string" />
                        {errors.Addess && touched.Addess ? (
                          <div className="invalid-feedback d-block">
                            {errors.Addess}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Addess" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                  <Colxx md='4'>
                    <FormGroup>
                      <Label className="form-group has-float-label">
                        <Field className='w-100' style={{ height: '30px' }}
                          id="Branch"
                          name="Branch"
                          label="Branch"
                          type="Branch" />
                        {errors.Branch && touched.Branch ? (
                          <div className="invalid-feedback d-block">
                            {errors.Branch}
                          </div>
                        ) : null}
                        <span>
                          <IntlMessages id="Branch" />
                        </span>
                      </Label>
                    </FormGroup>
                  </Colxx>
                </Row>
                <div className="text-center mt-3">
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div >
  );
}

export default UpdateCompany