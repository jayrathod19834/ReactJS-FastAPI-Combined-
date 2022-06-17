import React, { useState,useEffect } from "react";
import exportObject from "api";
import displayNotification from "../../../components/common/react-notifications/DisplayNotification";
import UpdateCompany from "./UpdateCompany";

const GetCompany = (id) => {
    const [company,setCompany] = useState(null);
    useEffect(() => {
        const fetchCompany = async () => {
          try {
            // eslint-disable-next-line
            const response = await exportObject.companyListId(id.id)
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
