import React, { useState,useEffect } from "react";
import axios from '../../../api/axios'
import displayNotification from "../../../components/common/react-notifications/DisplayNotification";
import UpdateCompany from "./UpdateCompany";

const GetCompany = (id) => {
    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState({});
    const [company,setCompany] = useState(null);
    useEffect(() => {
        const fetchCompany = async () => {
          try {
            const response = await axios.get(`/company/${id.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setCompany(response.data);
          } catch (err) {
            displayNotification('Fetching Error',err.response.data.detail,'error')
          }
        };
        fetchCompany();
      },[]);
      return company ? <UpdateCompany preloadedvalues={company} /> : <div> loading...</div>;
    }

export default GetCompany;