import { FeelData, _Number_DataField, _Text_DataField } from "@ashu_endless/dataform";
import { useState,useEffect } from "react";
import { PlusCircleFill,ArrowBarUp,Trash,ArrowBarDown, } from "react-bootstrap-icons";
import Tippy from "@tippyjs/react";

const testData = {
    "img_link" : "https://png.pngtree.com/png-vector/20221114/ourmid/pngtree-picture-album-illustration-symbol-vector-png-image_34636948.jpg",
    "text":"text",
    number:9,
    url:"",
    progress:{completed:9,total:100}
}

const defaultStyle = {
    "text":{
        color:"white",
        fontSize:"medium",
        padding:"3px",

    },
    "img_link":{
        "aspectRatio":"1"
    }
}

const Style_Structure = {
    "text":{
        "color":new _Text_DataField({}),
        "padding":new _Text_DataField({}),
        "fontSize":new _Text_DataField({}),
        

    },
    "img_link":{
        "aspectRatio" : new _Text_DataField({}),
    }
}


function CoverDesign({coll_fields,cover_fields,coverDiv_style,setcover_fields,setcoverDiv_style}) {
    // console.log(coll_fields)

    // const [cover_fields, setcover_fields] = useState([]);
    // const [coverDiv_style, setcoverDiv_style] = useState({"width":300,borderColor:"white",borderWidth:"10px",borderStyle:"solid",padding:"5px"});


    // useEffect(() => {
    //   console.log(coverDiv_style)
    // }, [coverDiv_style])
    useEffect(() => {
      console.log(cover_fields)
    }, [cover_fields])
    


    return ( <div style={{display: 'grid',gap: '10px',padding: '5px'}}> 
    <div className="avlble-fields-div" >
    <div style={{fontSize: 'x-small',borderBottom: '2px solid black',fontFamily: 'monospace'}} > <span>Available Field</span> <span>Add to Cover</span> </div>
    <div>
        {coll_fields && coll_fields.map((field)=> <div style={{display:"flex","justifyContent":"space-between"}} > <span>{field.name}</span> <span onClick={()=>{setcover_fields((cover_fields)=>[...cover_fields,{...field,style:defaultStyle[field.type]}])}} > <PlusCircleFill/> </span> </div>)}
    </div>


    </div>   
        <FeelData  display={true} setactive_data_source={setcoverDiv_style} active_data_source={coverDiv_style} data_source_structure={{width:new _Number_DataField({}),borderColor:new _Text_DataField({}),borderStyle:new _Text_DataField({}),borderWidth:new _Text_DataField({}),padding:new _Text_DataField({})}} />

    <div style={{border: "1px solid grey",width:`${coverDiv_style.width}px`,color:"white",padding:coverDiv_style.padding,borderColor:coverDiv_style.borderColor,borderWidth:coverDiv_style.borderWidth,borderStyle:coverDiv_style.borderStyle}} >

        {cover_fields.map((field,index)=><Test type={field.type} key={field.type} cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}  />)}

        
    </div>



    </div> );
}


function Test({type,cover_fields,setcover_fields,index}){
    
    switch (type) {
        case "text":
            return (
            <Tippy interactive={true} content={<CoverOptions  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
            <div style={cover_fields[index].style} >{testData[type]}</div>
          </Tippy>);
        case "img_link":
            return (
                <Tippy interactive={true} content={<CoverOptions  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
               <img style={{width:"100%",...cover_fields[index].style}} src={testData[type]} alt="" srcset="" />
              </Tippy>);
        
        case "number":
            
            return (
                <Tippy trigger="click mouseover" interactive={true} content={<CoverOptions  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                <div> 10 </div>
              </Tippy>);
        
        case "url":
            return (
                <Tippy interactive={true} content={<CoverOptions  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
               <button> Go </button>
              </Tippy>);
        
        case "progress":
            const chapterProgress = parseFloat(Math.round((testData.progress.completed/testData.progress.total)*100).toFixed(2))
            return (
            <Tippy interactive={true} content={<CoverOptions  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
            
            <div className="fieldDiv">

            <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}% completed</span> </div>
            </div>
              </Tippy>);

        default:
            break;
    }
}   

export default CoverDesign;


function CoverOptions({index,cover_fields,setcover_fields}){

    function SwapUp(){
        const temp = [...cover_fields]
        const element =temp.splice(index, 1)[0];
        temp.splice(index-1, 0, element);
        setcover_fields(temp)
    }

    function SwapDown(){
        const temp = [...cover_fields]
        const element =temp.splice(index, 1)[0];
        temp.splice(index+1, 0, element);
        setcover_fields(temp)
    }

    function Delete(){
        const temp = [...cover_fields]
        if (index > -1) { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
          }
        setcover_fields(temp)
    }

    return(
        <div style={{display:"grid",gap:"10px",padding:"10px","gridAutoFlow":"column","fontSize":"medium"}}>
            {index != 0 ? 
            <ArrowBarUp className="option-hover" onClick={SwapUp} />
            :<></>
            }
            {index + 1 !== cover_fields.length ?
            <ArrowBarDown className="option-hover" onClick={SwapDown} />
            :<></>
            }
            <Trash className="option-hover" onClick={Delete}  />
            <Tippy interactive={true} content={<StyleDiv cover_field={cover_fields[index]} setcover_fields={setcover_fields} index={index} cover_fields={cover_fields} />}>
            
            <span className="option-hover" style={{fontSize:"xx-small",fontFamily:"monospace",color:"white"}} >style</span>
            </Tippy>
        </div>
    )
}

function StyleDiv({cover_field,index,setcover_fields,cover_fields}){

    const [styleData, setstyleData] = useState(cover_field["style"]);

    function UpdateStyleData(newdata){
        let temp = [...cover_fields];
        temp[index].style = newdata;
        setcover_fields(temp);
        setstyleData(newdata)
    }


    return (
        <FeelData active_data_source={styleData} setactive_data_source={UpdateStyleData} data_source_structure={Style_Structure[cover_field.type]} display={true} />
    )

}


