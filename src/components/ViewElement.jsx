import { Link, useParams, } from "react-router-dom";
import { useState } from "react";

function ViewElement() {

    const params = useParams();
    const [param_Collection, setparam_Collection] = useState(JSON.parse(localStorage.getItem("Collections_Detail"))[params.id])
    const [coll_data, setcoll_data] = useState(param_Collection.collections[params.index]);
    const [edit_On, setedit_On] = useState(false)
    // console.log(params_coll)

    function get_field_type(field){
        for(let data of Object.values(param_Collection.coll_fields) ){
            if(data.name === field){
                return data.type
            }
        }
    }

    return ( <>
    <div className="collection-index-title"> {params.id}/{params.index} </div>
    <div className="field-container">
        {Object.entries(param_Collection.collections[params.index]).map(([key,val],index)=><FieldCreator key={key} disabled={!edit_On} type={get_field_type(key)} name={key} setdata={setcoll_data} data={coll_data} val={val} />)}
    </div>

    <div style={{display: 'flex',justifyContent: 'space-around',padding: '10px',fontSize:"large"}}>
    {edit_On ?  <><div className="btn-pos" > Update Changes </div> <div className="btn-pos" onClick={()=>{setedit_On(false)}} style={{backgroundColor:"red",}} > Discard </div> </>
    : <div className="btn-pos" onClick={()=>{setedit_On(true)}} > Edit </div> }
    </div>
    </> );
}

export default ViewElement;

function FieldCreator({name,type,setdata,data,disabled}) {


    
    console.log(data)

    switch (type) {
        case "text":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <textarea disabled={disabled } className="classic" defaultValue={data[name]} onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
            </div>)
        case "number":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <input disabled={disabled } className="classic" defaultValue={data[name]}  onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="number" />
            </div>);
        case "img_link":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <textarea disabled={disabled } defaultValue={data[name]} placeholder="enter image url here" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = e.target.value
        setdata(temp)}} type="text" />
                <img style={{border: '2px solid #282c34',
borderRadius: '5px'}} src={data[name]} alt="" />

            </div>);
        case "url":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                <div style={{background: '#1e1929',display:"grid"}}>

                <span style={{fontSize:"x-small"}} >url</span>
                <textarea disabled={disabled } placeholder="enter url here" defaultValue={data[name].url} className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = temp[name] ? {...temp[name],"url":e.target.value} : {display_text:"","url":e.target.value};
        setdata(temp)}} type="text" />
                <span style={{fontSize:"x-small"}}  >display text</span>
                <textarea disabled={disabled } defaultValue={data[name].display_text} placeholder="enter display text here" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] = temp[name] ? {...temp[name],"display_text":e.target.value} : {url:"","display_text":e.target.value}
        setdata(temp)}} type="text" />
                </div>

            </div>);
        case "progress":
            return (<div className="fieldDiv">
                <label htmlFor="">{name}</label>
                    <div>

                <input disabled={disabled } defaultValue={data[name].completed} placeholder="enter completed value" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] =temp[name] ? {...temp[name],"completed":e.target.value} : {total:0,"completed":e.target.value}
        setdata(temp)}} type="number" />
        /
                <input disabled={disabled } defaultValue={data[name].total} placeholder="enter total value" className="classic" onInput={(e)=>{        
        let temp = {...data};
        temp[name] =temp[name] ?  {...temp[name],"total":e.target.value}: {completed:0,"total":e.target.value}
        setdata(temp)}} type="number" />
                    </div>

            </div>);
    
        default:
           return <span>error</span>
    }
}

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
