function BookCollection() {
    return (     <div className='container'>
    <div>
      <span>My Books</span>
      <Link to={"/add"}>
        Add
      <PlusCircleDotted/>
      </Link>
    </div>
    <div className='bookDiv'>

    {testdata.map((book)=><>
    <div className='book' >
      <img className='img' src={book.url}/>

      <div className='progress' style={{ background: `linear-gradient(to right, rgb(25, 30, 43) ${60}%, rgb(15, 34, 60) ${60}%, rgb(136 93 218) 0%, rgb(110 62 201 / 72%) 100%)` }} > <span>{60}% completed</span> </div>
       
    </div>
    </>)}
    </div>

  <div>

  </div>
  </div> );
}

export default BookCollection;