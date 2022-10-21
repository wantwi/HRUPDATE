import { toast } from "react-toastify";
import { dateFormatter } from "src/reusable/utils/helper"
import CustomAxios from "./axios"
const fm =(date)=>{
    console.log({date})
    return date.toLocaleString('default', { month: 'long' });
}
export const GetHistoryInfo = async (url)=>{
    try {
        const response = await CustomAxios.get(url)
        return response.data.items.map(x =>({...x,createdBy:x?.createdBy ||"No name",createdAt: x?.createdAt}))
    } catch (error) {
        toast.error(`Sorry. Something went wrong.`);
    }
}


export const DeleteHistoryInfo = async (url,obj)=>{
    try {
        const response = await CustomAxios.delete(url,obj)
        return response
    } catch (error) {
        toast.error(`Sorry. Something went wrong.`);
    }
}



