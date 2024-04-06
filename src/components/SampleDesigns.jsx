import { Dash, Plus, } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { defaultStyle } from "./SampleStyles";

export const SampleDesigns = {

}


function Progress_Designs({cover_field,cover_fields,setcover_fields,index,setactiveStyle_index,data}){
    console.log(cover_field)
    if(cover_field.design_name === "simple"){
        const chapterProgress = parseFloat(Math.round((data[cover_field.name].completed/data[cover_field.name].total)*100).toFixed(2))
        return (
        
        <div className="fieldDiv" >

        <div className="progressDiv" style={{...defaultStyle["progress"],...cover_field.style,background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}%</span> </div>
        </div>
        );
    }else{
        switch (cover_field.design_name) {
            case "text":
                return (
                    <div style={{      display: 'grid',
                    gridAutoFlow: 'column',
                    justifyContent: 'space-evenly',
        ...defaultStyle["progress"],...cover_field.style}}>
                        <span> {data[cover_field.name].completed} </span>
                        <span>/</span>
                        <span> {data[cover_field.name].total} </span>
                    </div>
                );
            case 'simple_field':
                const chapterProgress = parseFloat(Math.round((data[cover_field.name].completed/data[cover_field.name].total)*100).toFixed(2))
                return (
                
                <div style={{...defaultStyle["progress"],...cover_field.style}} className="fieldDiv">
                <label style={{fontSize:"small"}} htmlFor="">{cover_field.name}</label>
                <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}%</span> </div>
                </div>)
        
            default:
                break;
        }
    }

}

function Text_Designs({cover_field,cover_fields,setcover_fields,index,setactiveStyle_index,data}){
    if(cover_field.design_name === "simple"){

        return(
        <div style={{...defaultStyle["text"],...cover_field.style}} >{data[cover_field.name]}</div>)
    }else{
        
    }
}
function Img_Designs({cover_field,cover_fields,setcover_fields,index,setactiveStyle_index,data}){
    if(cover_field.design_name === "simple"){
        return(

            <img style={{width:"100%",boxSizing:"border-box",...defaultStyle["img_link"],...cover_field.style}} src={data[cover_field.name]} alt="" srcset="" />
            )

    }else{

    }
}
function Url_Designs({cover_field,cover_fields,setcover_fields,index,setactiveStyle_index,data}){
    if(cover_field.design_name === "simple"){
        return(

            <Link style={{...defaultStyle["url"],...cover_field.style}}  target={"_blank"} to={data[cover_field.name].url} > {data[cover_field.name].display_text} </Link>
        )
    }else{
        switch (cover_field.design_name) {
            case "link2":
                return(
                    <Link style={{...defaultStyle["url"],...cover_field.style}} className="url-Btn-blue" target={"_blank"} to={data[cover_field.name].url} > {data[cover_field.name].display_text} </Link>
                );
            case "link3":
                return(
                    <Link style={{...defaultStyle["url"],...cover_field.style}} className="url-Btn-blue" target={"_blank"} to={data[cover_field.name].url} > {data[cover_field.name].display_text} </Link>
                );
            case "link4":
                return(
                    <Link style={{...defaultStyle["url"],...cover_field.style}} className="url-Btn-blue" target={"_blank"} to={data[cover_field.name].url} > {data[cover_field.name].display_text} </Link>
                );
        
            default:
                break;
        }
    }
}
function Number_Designs({cover_field,cover_fields,setcover_fields,index,setactiveStyle_index,data}){
    if(cover_field.design_name === "simple"){
        // console.log(cover_field)
        return(

            <div style={{...defaultStyle["number"],...cover_field.style,display:"grid",gridAutoFlow:"column"}} >
                <span>{cover_field.name}</span>
                <span style={{background:"grey"}}>
                {data[cover_field.name]}
                </span>
                </div>
        )
    }else{

    }
}


export const CreateCoverElem =  {
        "text" : ({type,cover_fields,cover_field,setcover_fields,index,setactiveStyle_index,data})=>{ 
            console.log(index)
            console.log(cover_field)
            return  (<Text_Designs data={data} cover_field={cover_field} cover_fields={cover_fields} index={index}  /> )
        },
        "img" : ({type,cover_fields,cover_field,setcover_fields,index,setactiveStyle_index,data})=>{ 
            return  (<Img_Designs data={data} cover_field={cover_field} cover_fields={cover_fields} index={index}  /> )
        },
        "number" : ({type,cover_fields,cover_field,setcover_fields,index,setactiveStyle_index,data})=>{ 
            return  (<Number_Designs data={data} cover_field={cover_field} cover_fields={cover_fields} index={index}  /> )
        },
        "url" : ({type,cover_fields,cover_field,setcover_fields,index,setactiveStyle_index,data})=>{ 
            return  (<Url_Designs data={data} cover_field={cover_field} cover_fields={cover_fields} index={index}  /> )
        },
        "progress" : ({type,cover_fields,cover_field,setcover_fields,index,setactiveStyle_index,data})=>{ 
            return  (<Progress_Designs data={data} cover_field={cover_field} cover_fields={cover_fields} index={index}  /> )
        },
    }