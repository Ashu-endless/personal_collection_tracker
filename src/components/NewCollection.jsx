import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import CoverDesign from "./CoverDesign";

function NewCollection({testData,settestdata}) {


    const [coll_fields, setcoll_fields] = useState([{name:"title",type:"text"}]);
    const [collection_name, setcollection_name] = useState("");
    const [currentDisplay, setcurrentDisplay] = useState("details");
    const [coverDiv_style, setcoverDiv_style] = useState({"width":300,borderColor:"white",borderWidth:"10px",borderStyle:"solid",padding:"5px"});
    const [cover_fields, setcover_fields] = useState([]);



    function update_CollFields(index,newfield){
        console.log(index,newfield)
        let temp = [...coll_fields];
        temp[index] = newfield;
        // console.log(temp)
        setcoll_fields(temp)
    }

    function CreateCollection(){
        console.log("collection name",collection_name);
        console.log("coll_fields",coll_fields);
        console.log("coverDiv_style",coverDiv_style);
        console.log("cover_fields",cover_fields);
        let temp = {}
        temp[collection_name] = {coll_fields,coverDiv_style,cover_fields}
        let temp_arr = [...JSON.parse(localStorage.getItem("Collection_Detail") || `[]`)]
        localStorage.setItem("Collections_Detail",[JSON.stringify(temp),...temp_arr]);


    }

    // console.log(coll_fields)
    return ( <>
    <div style={{background: 'rgb(33 38 45)',display: 'flex',justifyContent: 'space-around',color: 'white',padding: '2px'}}>
        <span onClick={()=>setcurrentDisplay("details")} >Details</span>
        <span onClick={()=>setcurrentDisplay("cover")} >Cover</span>
    </div>

    {currentDisplay == "details" ? 
    <div>
        <div style={{color:"white"}} className="col-field">
            <label htmlFor="">Collection name</label>
            <input defaultValue={collection_name} className="classic" onChange={(e)=>{setcollection_name(e.target.value)}} type="text" />
        </div>
        <div>

        <div> <span>Field</span> <span>Type</span>  </div>
        {coll_fields.map((field,index)=> 
        <CollField key={index} fieldMap={field} index={index} update_CollFields={update_CollFields}/>
        
        )
        
    }
    </div>

        <button className="btn-pos" onClick={()=>{setcoll_fields((prev)=>[...prev,{name:"field",type:"text"}])}} >Add new field</button>


    </div>
    : <></>}
{/* 
    <button onClick={()=>{settestdata((prev)=>[...prev,  {name,
  fields:[...coll_fields],
  collections:[
    {name:"random1",number_of_episodes:43,personal_review:"some review"},
    {name:"random2",number_of_episodes:43,personal_review:"some review"},
    {name:"random3",number_of_episodes:43,personal_review:"some review"},
  ]}]);localStorage.setItem(name,JSON.stringify({name,
    fields:[...coll_fields],
    collections:[]}))}}>Add Collection</button> */}

   
   <button onClick={CreateCollection} > Create  </button>

    {/* Design Bar */}
    {currentDisplay == "cover" ? 

    <CoverDesign cover_fields={cover_fields} setcover_fields={setcover_fields} coverDiv_style={coverDiv_style} setcoverDiv_style={setcoverDiv_style} coll_fields={coll_fields} />
    :<></>}


    </> );
}

export default NewCollection;


function CollField({fieldMap,index,update_CollFields}) {


    // console.log({fieldMap,index,update_CollFields})
    return ( <div className="col-field" >
        <input onChange={(val)=>{update_CollFields(index,{name:val.target.value,type:fieldMap.type})}} className="classic" type="text" name="" id="" value={fieldMap.name} />
        <select className="classic" onChange={(val)=>{update_CollFields(index,{name:fieldMap.name,type:val.target.value})}} defaultValue={fieldMap.type} >
            <option value={"text"}>text</option>
            <option value={"number"}>number</option>
            <option value={"img_link"}>img_link</option>
            <option value={"progress"}>progress</option>
            <option value={"url"}>url</option>
        </select>
        <Trash/>
    </div> );
}

