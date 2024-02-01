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
    console.log(testdata)
    const collection_name = useParams();
    const param_coll = JSON.parse(localStorage.getItem(collection_name.id));

    const [elem_data, setelem_data] = useState({})

    console.log(collection_name,param_coll)
    if(param_coll)
    return ( <>
    {param_coll.fields.map((field)=>{

        return <FieldCreator key={field.name} name={field.name} type={field.type} data={elem_data} setdata={setelem_data} />
    } )}

    <button onClick={()=>{
        console.log(elem_data)
        let temp = {...param_coll,collections:[...param_coll.collections,elem_data]}
        localStorage.setItem(collection_name.id,JSON.stringify(temp))
    }} >Add to {collection_name.id}</button>

    </> );
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
            return (<div>
                <label htmlFor="">{name}</label>
                <input onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
            </div>)
        case "number":
            return (<div>
                <label htmlFor="">{name}</label>
                <input onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="number" />
            </div>);
        case "img_link":
            return (<div>
                <label htmlFor="">{name}</label>
                <img src={data[name]} alt="" />
                <input onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
            </div>);
    
        default:
           return <span>error</span>
    }
}

