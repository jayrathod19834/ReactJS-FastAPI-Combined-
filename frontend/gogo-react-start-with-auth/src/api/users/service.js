import axios from "axios";

const BASE_URL_FOR_API = process.env.REACT_APP_BASE_URL

class Users {

    // eslint-disable-next-line
    getHeader() {
        let str1 = localStorage.getItem('gogo_current_user');
        str1 = JSON.parse(str1);
        const token = str1.access_token;
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return headers
    }

    list = async () => {
        const headers = this.getHeader()
        return axios.get(`${BASE_URL_FOR_API}/user`,
            { headers }
        );
    }

    listid = async (props) => {
        const headers = this.getHeader()
        return axios.get(`${BASE_URL_FOR_API}/user/${props}`,
            { headers }
        );
    }

    add = async (props) => {
        const headers = this.getHeader()
        return axios.post(`${BASE_URL_FOR_API}/user`,
            {
                "working_under": parseInt(props.Supervisorselect, 10),
                "role_id": parseInt(props.Roleselect, 10),
                "password": props.password,
                'fullname': props.fullname,
                "email": props.email,
                "dob": props.dob,
                "contact_no": props.contactno,
                "c_id": parseInt(props.companyid, 10),
            },
            { headers }
        );
    }

    update = async (props) => {
        const headers = this.getHeader()
        return axios.put(`${BASE_URL_FOR_API}/user/${props.id}`,
            {
                "working_under": parseInt(props.Supervisorselect, 10),
                "role_id": parseInt(props.Roleselect, 10),
                'fullname': props.fullname,
                "email": props.email,
                "dob": props.dob,
                "contact_no": props.contactno,
                "c_id": parseInt(props.companyid, 10),
            },
            { headers }
        );
    }

    delete = async (props) => {
        const headers = this.getHeader()
        return axios.delete(`${BASE_URL_FOR_API}/user/${props}`,
        {headers}
        );
    }

    supervisor = async () => {
        const headers = this.getHeader()
        return axios.get(`${BASE_URL_FOR_API}/supervisor`,
            { headers }
        );
    }
}

export default new Users();