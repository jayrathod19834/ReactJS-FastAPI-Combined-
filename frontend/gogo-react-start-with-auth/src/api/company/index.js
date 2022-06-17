import Company from './service'
import displayNotification from "../../components/common/react-notifications/DisplayNotification";

const companyList = async () => {
    try{
        const response = await Company.list()
        return response
    }catch (err){
        displayNotification('Company', err.response.data.detail, "error")
    }
}

const companyListId = async (props) => {
    try{
        const response = await Company.listid(props)
        return response
    }catch (err){
        displayNotification('Company', err.response.data.detail, "error")
    }
}

const companyAdd = async (props) => {
    try{
        const response = await Company.add(props)
        return response
    }catch (err){
        displayNotification('Company', err.response.data.detail, "error")
    }
}

const companyUpdate = async (props) => {
    try{
        const response = await Company.update(props)
        return response
    }catch (err){
        displayNotification('Company', err.response.data.detail, "error")
    }
}


const companyDelete = async (props) => {
    try{
        const response = await Company.delete(props)
        return response
    }catch(err){
        displayNotification('Company', err.response.data.detail, "error")
    }
}


export { companyList,companyAdd,companyUpdate,companyDelete,companyListId }