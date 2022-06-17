import User from './service'
import displayNotification from "../../components/common/react-notifications/DisplayNotification";

const userList = async () => {
    try{
        const response = await User.list()
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

const userListId = async (props) => {
    try{
        const response = await User.listid(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

const userAdd = async (props) => {
    try{
        const response = await User.add(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

const userUpdate = async (props) => {
    try{
        const response = await User.update(props)
        return response
    }catch (err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

const listSupervisor = async () => {
    try{
        const response = await User.supervisor()
        return response
    }catch(err){
        displayNotification('User', err.response.data.detail, "error")
    }
}

const userDelete = async (props) => {
    try{
        const response = await User.delete(props)
        return response
    }catch(err){
        displayNotification('User', err.response.data.detail, "error")
    }
}


export { userList,userAdd,listSupervisor,userUpdate,userDelete,userListId }