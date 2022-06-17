import React, { useState,useEffect } from "react";
import exportObject from "api";
import UpdateUser from "./UpdateUser";
import displayNotification from "../../../components/common/react-notifications/DisplayNotification";

const GetUser = (id) => {
    // eslint-disable-next-line no-unused-vars
    const [user,setUser] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await exportObject.userListId(id.id)
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