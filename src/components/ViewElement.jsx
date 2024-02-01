import { Link, useParams } from "react-router-dom";

function ViewElement() {

    const params = useParams();
    const params_coll = JSON.parse(localStorage.getItem(params.id))

    console.log(params)

    return ( <>
    <div>
        {Object.entries(params_coll.collections[params.index]).map(([key,val])=><CollField key={key} field={key} val={val} />)}
    </div>
    </> );
}

export default ViewElement;

function CollField({field,val}) {


    // console.log({fieldMap,index,update_CollFields})
    return ( <div>
        <label htmlFor="">{field}</label>
        <input value={val} />
        
        
    </div> );
}
