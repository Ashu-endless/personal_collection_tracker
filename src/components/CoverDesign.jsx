import { FeelData, _Number_DataField, _Text_DataField } from "@ashu_endless/dataform";
import { useState,useEffect} from "react";
import { PlusCircleFill,ArrowBarUp,Trash,ArrowBarDown,CaretDown,X,Circle,CheckCircle } from "react-bootstrap-icons";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { SampleDesign } from "./SampleStyles";
// import { DisplayCoverElem } from "./ViewCollection.";
import { CreateCoverElem } from "./SampleDesigns";
import { Style_Structure , CoverDiv_StyleStructure } from "./CoverDesign/FieldsStructure";
import { defaultStyle } from "./SampleStyles";





function CoverDesign({coll_fields,cover_fields,coverDiv_style,setcover_fields,setcoverDiv_style,sampleData,sampleData_Structure,setsampleData}) {

    const [CoverDivStyle_Display, setCoverDivStyle_Display] = useState(false);
    const [sampleData_Display, setsampleData_Display] = useState(false);
    const [activeStyle_index, setactiveStyle_index] = useState(null);
    const [activeDisplay, setactiveDisplay] = useState("style")


    useEffect(() => {
      console.log(cover_fields)
    }, [cover_fields])
    

    console.log(sampleData)


    return ( <div className="new_coll_container" style={{display: 'grid',gap: '10px',padding: '5px'}}> 
    <div className="avlble-fields-div" >
    <div style={{fontSize: 'small', fontFamily: '\'Comme\'', display: 'flex', gap: '30px'}} > <span> Fields</span> <span>Add to Cover</span> </div>
    <div style={{display: 'grid',gap: '3px',padding: '3px 0px'}}>
        {coll_fields && coll_fields.map((field)=> <div className="field"> <span>{field.name}</span> <span onClick={()=>{setcover_fields((cover_fields)=>[...cover_fields,{...field,style:defaultStyle[field.type],design_name:"simple"}])}} > <PlusCircleFill style={{fontSize:"large"}} /> </span> </div>)}
    </div>


    </div> 

        <div className="container-righticon">
        <div className="titlediv" onClick={()=>{setCoverDivStyle_Display(!CoverDivStyle_Display)}} > Cover Style <CaretDown/> </div>
        <FeelData  display={CoverDivStyle_Display} setactive_data_source={setcoverDiv_style} active_data_source={coverDiv_style} data_source_structure={CoverDiv_StyleStructure} />
        </div>

        <div className="container-righticon">
        <div className="titlediv" onClick={()=>{setsampleData_Display(!sampleData_Display)}} > Sample data <CaretDown/> </div>
        <FeelData  display={sampleData_Display} setactive_data_source={setsampleData} active_data_source={sampleData} data_source_structure={sampleData_Structure} />
        </div>


    <div style={{display:"flex",gap:"20px"}}>


    <div style={{height:"fit-content",border: "1px solid grey",width:`${coverDiv_style.width}px`,color:"white",...coverDiv_style,display:"grid"}} >

        {cover_fields.map((field,index)=><DisplayCoverElem sampleData={sampleData} type={field.type} key={field.type} cover_fields={cover_fields}  setactiveStyle_index={setactiveStyle_index} setcover_fields={setcover_fields} index={index}  />)}

        
    </div>
{   activeStyle_index != null ?
    <div className="container-righticon" >
        <div className="titlediv">
        {cover_fields[activeStyle_index].name} 
        <div style={{display: 'flex',gap: '5px'}}>

            <span style={{background: `${activeDisplay === "style" ? 'orange' : ""}`,padding: '3px',borderRadius: '5px'}} onClick={()=>{setactiveDisplay("style")}} >Style </span>
            <span style={{background: `${activeDisplay === "design" ? 'orange' : ""}`,padding: '3px',borderRadius: '5px'}} onClick={()=>{setactiveDisplay("design")}} >Design</span>
        </div>
        <X onClick={()=>{setactiveStyle_index(null)}}/>
        </div>

        {activeDisplay === "style" ?
    <StyleDiv key={activeStyle_index} cover_field={cover_fields[activeStyle_index]} setcover_fields={setcover_fields}  index={activeStyle_index} cover_fields={cover_fields} />
    :
    <DesignsDiv sampleData={sampleData} key={activeStyle_index} cover_field={cover_fields[activeStyle_index]} setcover_fields={setcover_fields}  index={activeStyle_index} cover_fields={cover_fields} />
}
    </div>
    :<></>}

    </div>




    </div> );
}
function DisplayCoverElem({type,cover_fields,setcover_fields,index,setactiveStyle_index,sampleData}){

    console.log(cover_fields[index])

    switch (type) {
        case "text":
            return (
            <Tippy interactive={true} trigger="click mouseover" content={<CoverOptions setactiveStyle_index={setactiveStyle_index}  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                <span>

                <CreateCoverElem.text type={type} data={sampleData} cover_fields={cover_fields} cover_field={cover_fields[index]} index={index} />
                </span>
          </Tippy>);
        case "img_link":
            return (
                <Tippy interactive={true} content={<CoverOptions setactiveStyle_index={setactiveStyle_index}  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                <span>

                <CreateCoverElem.img type={type} data={sampleData} cover_fields={cover_fields} cover_field={cover_fields[index]} index={index} />
                </span>
                    
              </Tippy>);
        
        case "number":
            
            return (
                <Tippy trigger="click mouseover" interactive={true} content={<CoverOptions setactiveStyle_index={setactiveStyle_index}  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                        <span>
                                <CreateCoverElem.number type={type} data={sampleData} cover_fields={cover_fields} cover_field={cover_fields[index]} index={index} />
                        </span>
              </Tippy>);
        
        case "url":
            return (
                <Tippy interactive={true} content={<CoverOptions setactiveStyle_index={setactiveStyle_index}  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                        <span>
                                <CreateCoverElem.url type={type} data={sampleData} cover_fields={cover_fields} cover_field={cover_fields[index]} index={index} />
                        </span>               
              </Tippy>);
        
        case "progress":
            const chapterProgress = parseFloat(Math.round((sampleData[cover_fields[index].name].completed/sampleData[cover_fields[index].name].total)*100).toFixed(2))
            return (
            <Tippy interactive={true} content={<CoverOptions setactiveStyle_index={setactiveStyle_index}  cover_fields={cover_fields} setcover_fields={setcover_fields} index={index}/>}>
                                    <span>
                                <CreateCoverElem.progress type={type} data={sampleData} cover_fields={cover_fields} cover_field={cover_fields[index]} index={index} />
                        </span>
            {/* <div className="fieldDiv">

            <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}% completed</span> </div>
            </div> */}
              </Tippy>);

        default:
            break;
    }


};



export default CoverDesign;


function CoverOptions({index,cover_fields,setcover_fields,setactiveStyle_index}){

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
        <div style={{display:"grid",gap:"10px",padding:"10px","gridAutoFlow":"column","fontSize":"x-large"}}>
            {index != 0 ? 
            <ArrowBarUp className="option-hover" onClick={SwapUp} />
            :<></>
            }
            {index + 1 !== cover_fields.length ?
            <ArrowBarDown className="option-hover" onClick={SwapDown} />
            :<></>
            }
            <Trash className="option-hover" onClick={Delete}  />
            
            <span className="option-hover" onClick={()=>{setactiveStyle_index(index)}} style={{fontSize:"xx-small",fontFamily:"monospace",color:"white"}} >style</span>
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


function DesignsDiv({cover_field,index,setcover_fields,cover_fields,sampleData}){
    const [designName, setdesignName] = useState(cover_field["design_name"] || null);

    function UpdateDesign(design_name,style_name){
        let temp = [...cover_fields];
        temp[index].style = {...defaultStyle[cover_field.type],...SampleDesign[cover_field.type][design_name][style_name]};
        temp[index].design_name = design_name;
        setcover_fields(temp);
    } 

    return <>
        <div style={{width:"300px"}}>

        {SampleDesign[cover_field.type] && Object.keys(SampleDesign[cover_field.type]).map((design_name,index)=> 
        { 
            // console.log(design_name)
            return Object.keys(SampleDesign[cover_field.type][design_name]).map((style_name,index)=>
        <div style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        padding: '10px',
        gap:"10px"
        }}>
            <div style={{width:"100%"}} onClick={()=>{UpdateDesign(design_name,style_name)}}>

        <DisplayCoverElemDesign type={cover_field.type} design_name={design_name} style_name={style_name}  sampleData={sampleData} i={index} cover_field={{...cover_field}}  /> 
            </div>
        {/* {designName === design_name ? <CheckCircle/> : <Circle onClick={()=>{UpdateDesign(design_name)}} /> } */}
        </div>
            )}

        )}
        </div>
    </>

}
function DisplayCoverElemDesign({type,cover_fields,setcover_fields,index,setactiveStyle_index,sampleData,style_name,design_name,cover_field}){

    // console.log(cover_fields[index])
    // console.log(cover_field,design_name,style_name)
    // console.log(SampleDesign);
    // console.log(SampleDesign["text"]);
    // console.log(SampleDesign["text"][design_name][style_name])
    console.log(style_name)

    switch (type) {
        case "text":
            return (
                // <span></span>
                <CreateCoverElem.text type={type} data={sampleData} cover_fields={cover_fields} cover_field={{...cover_field,design_name,style:SampleDesign["text"][design_name][style_name]}} index={index} />
            )
        case "img_link":
            return (
                <CreateCoverElem.img type={type} data={sampleData} cover_fields={cover_fields} cover_field={{...cover_field,design_name,style:SampleDesign["img_link"][design_name][style_name]}} index={index} />
                    
             );
        
        case "number":
            
            return (
                    <CreateCoverElem.number type={type} data={sampleData} cover_fields={cover_fields} cover_field={{...cover_field,design_name,style:SampleDesign["number"][design_name][style_name]}} index={index} />
             );
        
        case "url":
            return (
                    <CreateCoverElem.url type={type} data={sampleData} cover_fields={cover_fields} cover_field={{...cover_field,design_name,style:SampleDesign["url"][design_name][style_name]}} index={index} />
              );
        
        case "progress":
            console.log(style_name)
            return (
                    <CreateCoverElem.progress type={type} data={sampleData} cover_fields={cover_fields} cover_field={{...cover_field,design_name,style:SampleDesign["progress"][design_name][style_name]}} index={index} />
            
             );

        default:
            break;
    }


};

// function DisplayCoverElemDesign({cover_field,data_,index,design_name,style_name}){
//     console.log(data_,cover_field.name)
//     // console.log(s)
//     const data = data_[cover_field.name]
//     switch (cover_field.type) {
//       case "text":
//           return (
//           <div style={{...SampleDesign[cover_field.type][design_name]}} >{data}</div>
//           )
//       case "img_link":
//           return (
//              <img style={{width:"100%",...SampleDesign[cover_field.type][design_name]}} src={data} alt="" srcset="" />
//             );
      
//       case "number":
          
//           return (
//               <div> {data} </div>
//            );
      
//       case "url":
//           return (
//              <Link to={data.url} > {data.dsplay_text || ""} </Link>
//             );
      
//       case "progress":
//           const chapterProgress = parseFloat(Math.round((data.completed/data.total)*100).toFixed(2))
//           return (
          
//           <div className="fieldDiv">
  
//           <div className="progressDiv" style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${chapterProgress}%, rgb(15, 34, 60) ${chapterProgress}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{chapterProgress}% completed</span> </div>
//           </div>
//           );
  
//       default:
//           break;
//   }
//   }


