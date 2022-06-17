import axios from "axios";

const BASE_URL_FOR_API = process.env.REACT_APP_BASE_URL

class Company {

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
        return axios.get(`${BASE_URL_FOR_API}/company`,
            { headers }
        );
    }

    listid = async (props) => {
        const headers = this.getHeader()
        return axios.get(`${BASE_URL_FOR_API}/company/${props}`,
            { headers }
        );
    }

    add = async (props) => {
        const headers = this.getHeader()
        return axios.post(`${BASE_URL_FOR_API}/company`,
            {
                "company_name": props.CompanyName,
                "country": props.Country,
                "state": props.State,
                'city': props.City,
                "pincode": props.Pincode,
                "department": props.Department,
                "branch": props.Branch,
                "address": props.Addess,
            },
            { headers }
        );
    }

    update = async (props) => {
        console.log(props);
        const headers = this.getHeader()
        return axios.put(`${BASE_URL_FOR_API}/company/${props.id}`,
            {
                "company_name": props.CompanyName,
                "country": props.Country,
                "state": props.State,
                'city': props.City,
                "pincode": props.Pincode,
                "department": props.Department,
                "branch": props.Branch,
                "address": props.Addess,
            },
            { headers }
        );
    }

    delete = async (props) => {
        const headers = this.getHeader()
        return axios.delete(`${BASE_URL_FOR_API}/company/${props}`,
            { headers }
        );
    }
}

export default new Company;