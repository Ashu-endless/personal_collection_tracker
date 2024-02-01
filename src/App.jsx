import logo from './logo.svg';
import './App.css';

import { PlusCircleDotted} from "react-bootstrap-icons"
import { Route, Routes,Link } from 'react-router-dom';
import AddNew from './components/AddNew';
import ViewElement from './components/ViewElement';
import NewCollection from './components/NewCollection';
import ViewCollection from './components/ViewCollection.';
import AddToCollection from './components/AddToCollection';
import { useState } from 'react';

const testdata = [
  {"name":"book1",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book2",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book3",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book4",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
  {"name":"book5",total_pages:200,pages_read:100,url:"https://i.pinimg.com/originals/26/7a/56/267a56a08dad6124d458fa67da140666.jpg"},
]

const MyCollections__ = [
  {name:"Anime",
  fields:[
    {name:"name",type:"text"},
    {name:"number of episodes",type:"number"},
    {name:"personal_review",type:"text"},
  ],
  collections:[
    {name:"random1",number_of_episodes:43,personal_review:"some review"},
    {name:"random2",number_of_episodes:43,personal_review:"some review"},
    {name:"random3",number_of_episodes:43,personal_review:"some review"},
  ]}
]



function App() {

  const [MyCollections, setMyCollections] = useState(MyCollections__)

  return (<>
    <nav className="App">
      <Link to={"/"}>
      personal collections
      </Link>
      <Link to={"/Add_NewCollection"}>New
      </Link>
    </nav>
    <div style={{border:"5px solid red"}}>

    <div>My Collections</div>
    {MyCollections.map((coll)=><Link to={`collection/${coll.name}`}> <div> {coll.name}</div></Link>)}
    </div>


    <div className='container'>
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
        {/* <Link to={`./${index}`}>
        <b>{index}</b>
        </Link> */}
       <img className='img' src={book.url}/> 

      <div className='progress' style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${60}%, rgb(15, 34, 60) ${60}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{60}% completed</span> </div> 
       
    </div>
    </>)}
    </div>
    </div>

    <Routes>
      <Route path='/collection/:id' element={<ViewCollection testData={MyCollections}/>}   />
      <Route path='/collection/:id/add' element={<AddToCollection testData={MyCollections}/>}/>
      <Route path='/collection/:id/:index' element={<ViewElement testData={MyCollections}/>}/>
      <Route path='/add' element={<AddNew testData={MyCollections}/>}/>
      <Route path='/veiw' element={<ViewElement/>}/>
      <Route path='/Add_NewCollection' element={<NewCollection testData={MyCollections} settestdata={setMyCollections}/>}/>
    </Routes>
  </>
  );
}

export default App;
