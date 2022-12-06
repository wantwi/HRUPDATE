import { useContext } from "react"
//import {PromptContext} from "src/context/PromptProvider"
import PromptContext from "src/Context/PromptProvider"



const usePrompt = () => {
    // const { isLoading, setIsLoading } = useContext(LoadingContext);
    return useContext(PromptContext)
}

export default usePrompt