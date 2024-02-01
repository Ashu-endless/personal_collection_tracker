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

    const params_coll = JSON.parse(localStorage.getItem(params.id))


    console.log(params,params_coll)

    return (<div className='container'>
    <div>
      <b >{params.id}</b>
      <Link to={"./add"}>
        Add
      <PlusCircleDotted/>
      </Link>
    </div>
    <div className='bookDiv'>

    {params_coll.collections.map((book,index)=><>
    <div className='book' >
        <Link to={`./${index}`}>
        <b>{index}</b>
        </Link>
      {/* <img className='img' src={book.url}/>

      <div className='progress' style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${60}%, rgb(15, 34, 60) ${60}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{60}% completed</span> </div> */}
       
    </div>
    </>)}
    </div>

  <div>

  </div>
  </div> );
}

export default ViewCollection;