import { useEffect } from "react";
import { useState } from "react";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
const test_collection = {
    name : "sample collection",
    fields : [
      {name:"name",type:"text"},
      {name:"number of episodes",type:"number"},
      {name:"personal_review",type:"string"},
    ],
    collections : []
  }


function ViewCollection({name,fields=[],collections=[]}) {

    const params = useParams();


    const [param_Collection, setparam_Collection] = useState(JSON.parse(localStorage.getItem("Collections_Detail"))[params.id])

    // const param_Collection = JSON.parse(localStorage.getItem("Collections_Detail"))[params];


    console.log(params,param_Collection)


    useEffect(() => {
      console.log(param_Collection)
      console.log(params)
      console.log(JSON.parse(localStorage.getItem("Collections_Detail"))[params])
    }, [param_Collection])
    
    
    if(param_Collection)
    return (<div className='container'>
    <div className="collection-containerTitle">
      <b >{params.id}</b>
      <Link to={"./add"} style={{color:"white"}}>
        Add
      <PlusCircleDotted/>
      </Link>
    </div>
    <div className='bookDiv'>

    {(param_Collection.collections || []).map((book,index)=><>
    <div style={param_Collection.coverDiv_style} >
        <Link to={`./${index}`}>
        <b>{index}</b>
        </Link>
        {param_Collection.cover_fields.map((field)=><DisplayCoverElem cover_field={field} data_={param_Collection.collections[index]} i={index} key={index} />)}


       
    </div>
    </>)}
    </div>

  <div>

  </div>
  </div> );
}

export default ViewCollection;


function DisplayCoverElem({cover_field,data_,i}){
  console.log(i)
  console.log(data_,cover_field.name)
  const data = data_[cover_field.name]
  switch (cover_field.type) {
    case "text":
        return (
        <div style={cover_field.style} >{data}</div>
        )
    case "img_link":
        return (
           <img style={{width:"100%",...cover_field.style}} src={data} alt="" srcset="" />
          );
    
    case "number":
        
        return (
            <div> {data} </div>
         );
    
    case "url":
        return (
           <button> {data} </button>
          );
    
    case "progress":
        const chapterProgress = parseFloat(Math.round((data.completed/data.total)*100).toFixed(2))
        return (
        
        <div className="fieldDiv">

        <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}% completed</span> </div>
        </div>
        );

    default:
        break;
}
}