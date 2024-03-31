import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

const test_collection = {
    name : "sample collection",
    fields : [
      {name:"name",type:"text"},
      {name:"number of episodes",type:"number"},
      {name:"personal_review",type:"text"},
    ],
    collections : []
  }

function AddToCollection({testdata}) {

    const collection_name = useParams();
    const [param_Collection, setparam_Collection] = useState(JSON.parse(localStorage.getItem("Collections_Detail"))[collection_name.id])

    const [elem_data, setelem_data] = useState({})

    console.log(param_Collection)


    function AddtoColl(){
        console.log(elem_data);
        let temp = {}
        temp[collection_name.id] = {...JSON.parse(localStorage.getItem("Collections_Detail"))[collection_name.id],collections:[...JSON.parse(localStorage.getItem("Collections_Detail"))[collection_name.id]["collections"] || [],elem_data]}
        console.log(temp)
        let temp2 = {...JSON.parse(localStorage.getItem("Collections_Detail")),...temp};
        console.log(temp2)

        localStorage.setItem("Collections_Detail",JSON.stringify(temp2));
    }

    if(param_Collection)
    return ( <div className="field-container" >
        <div style={{color:"white",borderBottom: '2px  solid #6b3d4f'}} > Add new Object to <b>{collection_name.id}</b> collection </div>

    {param_Collection.coll_fields.map((field)=>{

        return <FieldCreator key={field.name} name={field.name} type={field.type} data={elem_data} setdata={setelem_data} />
    } )}

    <button className="addToCollBtn" onClick={AddtoColl} >Add to {collection_name.id}</button>

    </div> );
}

export default AddToCollection;

function FieldCreator({name,type,setdata,data}) {

    useEffect(() => {
        let temp = {...data};
        temp[name] = ""
        setdata(temp)
    }, [])
    


    switch (type) {
        case "text":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <textarea className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
            </div>)
        case "number":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <input className="classic"  onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="number" />
            </div>);
        case "img_link":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <textarea placeholder="enter image url here" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
                <img src={data[name]} alt="" />

            </div>);
        case "url":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <textarea placeholder="enter url here" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
                {/* <img src={data[name]} alt="" /> */}

            </div>);
        case "progress":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                    <div>

                <input placeholder="enter completed value" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] =temp[name] ? {...temp[name],"completed":e.target.value} : {total:0,"completed":e.target.value}
        setdata(temp)}} type="number" />
        /
                <input placeholder="enter total value" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] =temp[name] ?  {...temp[name],"total":e.target.value}: {completed:0,"total":e.target.value}
        setdata(temp)}} type="number" />
                    </div>

            </div>);
    
        default:
           return <span>error</span>
    }
}

