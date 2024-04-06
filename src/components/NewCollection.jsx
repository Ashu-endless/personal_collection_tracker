import { _CustomObject_DataField, _Number_DataField, _Text_DataField,__CustomObject__ } from "@ashu_endless/dataform";
import { useState,useEffect } from "react";
import { Trash,ArrowLeft,ArrowRight } from "react-bootstrap-icons";
import CoverDesign from "./CoverDesign";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const default_sampleData = {
    "img_link" : "https://png.pngtree.com/png-vector/20221114/ourmid/pngtree-picture-album-illustration-symbol-vector-png-image_34636948.jpg",
    "text":"some text here",
    number:0,
    url:{url:"dsd",display_text:"display text","custom_object_type":"url"},
    progress:{completed:10,total:100,"custom_object_type":"progress"}
}

const default_sampleData_Structure = {
    "text":new _Text_DataField({}),
    "img_link":new _Text_DataField({}),
    "url":new _CustomObject_DataField({structure:{
        "url":new _Text_DataField({}),
        "display_text":new _Text_DataField({})
    }}),
    "number":new _Number_DataField({}),
    "progress":new _CustomObject_DataField({structure:{
        "total":new _Number_DataField({}),
        "completed":new _Number_DataField({})
    }})
}

function NewCollection({testData,settestdata}) {


    const [coll_fields, setcoll_fields] = useState([{name:"title",type:"text"}]);
    const [collection_name, setcollection_name] = useState("");
    const [currentDisplay, setcurrentDisplay] = useState("details");
    const [coverDiv_style, setcoverDiv_style] = useState({"width":300,borderColor:"white",borderWidth:"2px",borderStyle:"solid",padding:"5px",borderRadius:"5px",gap:"5px"});
    const [cover_fields, setcover_fields] = useState([]);
    const [sampleData, setsampleData] = useState(null);
    const [sampleData_Structure, setsampleData_Structure] = useState(null);


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
        let temp_arr = localStorage.getItem("Collections_Detail") ? JSON.parse(localStorage.getItem("Collections_Detail")) : {}
        console.log(temp_arr);
        console.log(localStorage.getItem("Collections_Detail"))
        // console.log([JSON.stringify(temp),...temp_arr])
        localStorage.setItem("Collections_Detail",JSON.stringify({...temp_arr,...temp}));

        withReactContent(Swal).fire({
            text:`${collection_name} added to your collections`,
            confirmButtonText:<a style={{border: '0',borderRadius: '.25em',background: 'initial',
    backgroundColor: '#7066e0',
            color: '#fff',
            fontSize: '1em',
            textDecoration:"none",
            padding:"10px"
        }} href="/personal_collection_tracker" >ok</a>,
            
            
        })
//         withReactContent(Swal).fire({
//   title: "Do you want to save the changes?",
//   showDenyButton: true,
//   showCancelButton: true,
//   confirmButtonText: "Save",
//   denyButtonText: `Don't save`
// }).then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
//     Swal.fire("Saved!", "", "success");
//   } else if (result.isDenied) {
//     Swal.fire("Changes are not saved", "", "info");
//   }
// });


    }

    useEffect(() => {
      let temp_data = {};
      let temp_ds = {};

      for(let field of Object.keys(coll_fields)){
            // console.log(coll_fields[field]);
            temp_data[coll_fields[field].name] = default_sampleData[coll_fields[field].type];
            temp_ds[coll_fields[field].name] =  default_sampleData_Structure[coll_fields[field].type]

      }
    //   console.log(temp_data);
    //   console.log(temp_ds);
      setsampleData(temp_data);
      setsampleData_Structure(temp_ds);


    }, [coll_fields])
    

    function deleteColl_field(index){
        let temp = [...coll_fields]
        temp.splice(index,1);
        // console.log(temp);
        // console.log(cover_fields);



        setcoll_fields(temp);

    }

    useEffect(() => {
        let temp = []
        for(let cover_field of cover_fields){
            let found = false;
            console.log(cover_field);
            for(let field of coll_fields){
                if(field.name === cover_field.name && field.type === cover_field.type){
                    found = true;
                    break
                }
            }
            if(found){
                temp.push(cover_field)
            }

        };

        setcover_fields(temp);
    }, [coll_fields])
    

    // console.log(coll_fields)
    return ( <>
    <div style={{background: 'rgb(33 38 45)',display: 'flex',justifyContent: 'space-around',color: 'white',padding: '2px',alignItems:"center"}}>
        <span className={currentDisplay  === "details" ? "new_coll_router_l active" : "new_coll_router_l"} onClick={()=>setcurrentDisplay("details")} >  Details</span>
        <ArrowRight/>
        <span className={currentDisplay  === "cover" ? "new_coll_router_l active" : "new_coll_router_l"} onClick={()=>setcurrentDisplay("cover")} >Cover</span>
        <ArrowRight/>
        <span onClick={CreateCollection} className="btn-pos" >  Add </span>
    </div>

    {currentDisplay == "details" ? 
    <div className="new_coll_container">
        <div className="fieldDiv">
                <label htmlFor="">collection name</label>
                <textarea className="classic" onInput={(e)=>{setcollection_name(e.target.value)}} type="text" />
            </div>
        <div className="fieldDiv">   
        <label htmlFor="">collection fields</label>
        <div className="container-righticon" >
        <div style={{padding: '5px',display: 'flex',justifyContent: 'space-around',fontSize: 'small',fontFamily: '\'Roboto mono\'',color: '#eda5a5'}} > <span>Field</span> <span>Type</span>  </div>
        {coll_fields.map((field,index)=> 
        <CollField key={index} fieldMap={field} Ondelete={(()=>{deleteColl_field(index)})} index={index} update_CollFields={update_CollFields}/>
        
        )
        
    }</div>
    </div>

        <button className="btn-pos" onClick={()=>{setcoll_fields((prev)=>[...prev,{name:"field",type:"text"}])}} >Add new field</button>


    </div>
    : <></>}

    {currentDisplay == "cover" ? 

    <CoverDesign setsampleData={setsampleData} sampleData={sampleData} sampleData_Structure={sampleData_Structure} cover_fields={cover_fields} setcover_fields={setcover_fields} coverDiv_style={coverDiv_style} setcoverDiv_style={setcoverDiv_style} coll_fields={coll_fields} />
    :<></>}


    </> );
}

export default NewCollection;


function CollField({fieldMap,index,update_CollFields,Ondelete}) {


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
        <Trash onClick={Ondelete} style={{color: 'white',fontSize: 'large',justifySelf: 'end',cursor:"pointer"}}/>
    </div> );
}

