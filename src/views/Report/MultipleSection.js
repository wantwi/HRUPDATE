import { MultiSelectComponent, CheckBoxSelection, Inject } from '@syncfusion/ej2-react-dropdowns';
import { useEffect, useState } from 'react';
import "./report.css"
const MultipleSection =({state,data, placeholder, isFilterChecked})=>{
    const [isEnable, setisEnable] = useState(isFilterChecked)


   
                
    const handleChangeEvent = (args) =>{
     
        state(args.value)

    }
    useEffect(() => {
        setisEnable(isFilterChecked)
    
      return () => {
        setisEnable(!isFilterChecked)
      }
    }, [isFilterChecked])
    
   console.log({isEnable});

    return(
        <>
                {
                    isEnable ? <div><select disabled className='form-control mb-1'></select></div> : <MultiSelectComponent   onChange={handleChangeEvent}  id={"checkbox"+placeholder } dataSource={data} showSelectAll={true}
                    fields={{ text: 'name', value: 'id' }} placeholder={`Select ${placeholder}`} mode="CheckBox"
                    showDropDownIcon={true} filterBarPlaceholder={`Search ${placeholder}`} popupHeight="350px">
                    <Inject services={[CheckBoxSelection]} />
                  </MultiSelectComponent>
                }

        </>
        
   
    )   

}

export default MultipleSection

