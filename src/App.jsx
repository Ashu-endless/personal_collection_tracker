import logo from './logo.svg';
import './App.css';

import { PlusCircleDotted} from "react-bootstrap-icons"
import { Route, Routes,Link } from 'react-router-dom';
import AddNew from './components/AddNew';
import ViewElement from './components/ViewElement';
import NewCollection from './components/NewCollection';
import ViewCollection from './components/ViewCollection.';
import AddToCollection from './components/AddToCollection';
import { useEffect, useState } from 'react';

const testdata = [
  {"name":"book1",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book2",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book3",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book4",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book5",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
]

const MyCollections__ = [
]



function App() {

  const [MyCollections, setMyCollections] = useState([])

  useEffect(() => {
    setMyCollections(JSON.parse(localStorage.getItem("Collections_Detail")) || [])
  }, [])
  
  // useEffect(() => {
  //   console.log(MyCollections)
  // }, [MyCollections])
  

  return (<>
    <nav className="App">
      <Link to={"/"}>
      personal collections
      </Link>
      <Link to={"/Add_NewCollection"}>New
      </Link>
    </nav>



    {/* <div className='container'>
    <div>
      <b >My Books</b>
      <Link to={"./add"}>
        Add
      <PlusCircleDotted/>
      </Link>
    </div>
    <div className="bookDiv">
    {testdata.map((book,index)=><>
    <div className='book' >

       <img className='img' src={book.url}/> 

      <div className='progress' style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${60}%, rgb(15, 34, 60) ${60}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{60}% completed</span> </div> 
       
    </div>
    </>)}
    </div>
    </div> */}

    <Routes>
      <Route path='/collection/:id' element={<ViewCollection testData={MyCollections}/>}   />
      <Route path='/collection/:id/add' element={<AddToCollection testData={MyCollections}/>}/>
      <Route path='/collection/:id/:index' element={<ViewElement testData={MyCollections}/>}/>
      <Route path='/add' element={<AddNew testData={MyCollections}/>}/>
      <Route path='/veiw' element={<ViewElement/>}/>
      <Route path='/Add_NewCollection' element={<NewCollection testData={MyCollections} settestdata={setMyCollections}/>}/>
      <Route path='/' element={    <div style={{border:"5px solid blue",color:"white",padding:"5px"}}>

<div>My Collections</div>
{Object.keys(MyCollections).map((coll_name)=><Link to={`collection/${coll_name}`} style={{"color":"white"}} > <div> {coll_name}</div></Link>)}
</div>}/>
    </Routes>
  </>
  );
}

export default App;
