import User from './service'
import displayNotification from "../../components/common/react-notifications/DisplayNotification";

// eslint-disable-next-line
const userList = async () => {
    try{
        const response = await User.list()
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

// eslint-disable-next-line
const userListId = async (props) => {
    try{
        const response = await User.listid(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

// eslint-disable-next-line
const userAdd = async (props) => {
    try{
        const response = await User.add(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

// eslint-disable-next-line
const userUpdate = async (props) => {
    try{
        const response = await User.update(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

// eslint-disable-next-line
const listSupervisor = async () => {
    try{
        const response = await User.supervisor()
        return response
    }catch(err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

// eslint-disable-next-line
const userDelete = async (props) => {
    try{
        const response = await User.delete(props)
        return response
    }catch(err){
        displayNotification('User', err.response.data.detail, "error")
    }
}


export { userList,userAdd,listSupervisor,userUpdate,userDelete,userListId }