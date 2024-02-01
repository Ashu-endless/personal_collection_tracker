import { useState } from "react";

function NewCollection({testData,settestdata}) {


    const [coll_fields, setcoll_fields] = useState([{name:"title",type:"text"}])
    const [name, setname] = useState("")


    function update_CollFields(index,newfield){
        console.log(index,newfield)
        let temp = [...coll_fields];
        temp[index] = newfield;
        // console.log(temp)
        setcoll_fields(temp)
    }

    // console.log(coll_fields)
    return ( <>
    <div>
        <div>
            <label htmlFor="">Collection name</label>
            <input defaultValue={name} onChange={(e)=>{setname(e.target.value)}} type="text" />
        </div>

        {coll_fields.map((field,index)=> 
        <CollField key={index} fieldMap={field} index={index} update_CollFields={update_CollFields}/>

        )
        
        }

        <button onClick={()=>{setcoll_fields((prev)=>[...prev,{name:"field",type:"text"}])}} >Add new field</button>


    </div>

    <button onClick={()=>{settestdata((prev)=>[...prev,  {name,
  fields:[...coll_fields],
  collections:[
    {name:"random1",number_of_episodes:43,personal_review:"some review"},
    {name:"random2",number_of_episodes:43,personal_review:"some review"},
    {name:"random3",number_of_episodes:43,personal_review:"some review"},
  ]}]);localStorage.setItem(name,JSON.stringify({name,
    fields:[...coll_fields],
    collections:[]}))}}>Add Collection</button>
    </> );
}

export default NewCollection;


function CollField({fieldMap,index,update_CollFields}) {


    // console.log({fieldMap,index,update_CollFields})
    return ( <div>
        <input onChange={(val)=>{update_CollFields(index,{name:val.target.value,type:fieldMap.type})}} type="text" name="" id="" value={fieldMap.name} />
        <select onChange={(val)=>{update_CollFields(index,{name:fieldMap.name,type:val.target.value})}} defaultValue={fieldMap.type} >
            <option value={"text"}>text</option>
            <option value={"number"}>number</option>
            <option value={"img_link"}>img_link</option>
        </select>
    </div> );
}

