import React, { useState,useEffect } from "react";
import axios from '../../../api/axios'
import UpdateUser from "./UpdateUser";
import displayNotification from "../../../components/common/react-notifications/DisplayNotification";

const GetUser = (id) => {
    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState({});
    const [user,setUser] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`/user/${id.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setUser(response.data);
          } catch (err) {
            displayNotification('Fetching Error',err.response.data.detail,'error')
          }
        };
        
        fetchUsers();
      },[]);
      return user ? <UpdateUser preloadedvalues={user} /> : <div> loading ...</div>;
    }

export default GetUser;