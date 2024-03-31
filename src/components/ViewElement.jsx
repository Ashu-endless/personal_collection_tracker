import { Link, useParams } from "react-router-dom";

function ViewElement() {

    const params = useParams();
    const params_coll = JSON.parse(localStorage.getItem(params.id))

    console.log(params_coll)
    function get_field_type(field){
        for(let data of Object.values(params_coll.fields) ){
            if(data.name === field){
                return data.type
            }
        }
    }

    return ( <>
    <div className="collection-index-title"> {params.id}/{params.index} </div>
    <div className="field-container">
        {Object.entries(params_coll.collections[params.index]).map(([key,val],index)=><CollField key={key} type={get_field_type(key)} field={key} val={val} />)}
    </div>
    </> );
}

export default ViewElement;

function CollField({field,val,type}) {

    console.log(type,field)
    // console.log({fieldMap,index,update_CollFields})

    switch (type) {
        case"img_link":
            return <div className="fieldDiv">
            <label htmlFor="">{field}</label>
            <img style={{border: '2px solid #282c34',
borderRadius: '5px'}} src={val} alt="" />
        </div>;
        case "text":
            return (<div className="fieldDiv">
                <label htmlFor="">{field}</label>
                <textarea className="classic" value={val} type="text" />
            </div>);
        case "number":
            return (<div className="fieldDiv">
                <label htmlFor="">{field}</label>
                <input value={val} className="classic"  type="number" />
            </div>);
        case "url":
            return (<div className="fieldDiv">
                <label htmlFor="">{field}</label>
                <a href={val} target={"blank_"}>

                visit
                </a>
            </div>);
        case "progress":
            const chapterProgress = parseFloat(Math.round((val.completed/val.total)*100).toFixed(2))
            return <div className="fieldDiv">
                <label htmlFor="">{field}</label>

            <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}% completed</span> </div>
            </div>
    
        default:
            break;
    }
    // return (  );
}
