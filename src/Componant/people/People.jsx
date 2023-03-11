import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function People() {
  let imgurl = 'https://image.tmdb.org/t/p/w500'
  let [trendingPeople, SettrendingPeople] = useState([]);
  async function getTrindgPeople(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=3288811d6d89d91906ba3ae44ecbc115`)
    SettrendingPeople(data.results)
    console.log(data.results);
  }

  useEffect(() => {
    getTrindgPeople('person');

  }, [])

  // pagination
  function handlePageClick(data) {
    getpagination(data.selected+1)
    
  }
  let pageCount =500;
  async function getpagination(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=3288811d6d89d91906ba3ae44ecbc115&page=${page}`)
    SettrendingPeople  (data.results)

  }
  // pagination

  let Navigate = useNavigate()
  function goDetiles(id) {
    // alert(id)
    Navigate({
      pathname: '/detilesPeople',
      search: `?id=${id}`,
    })
  }
  //
  async function SearchMovie(Word) {
    if (Word === "") {
      getTrindgPeople('person');
    }
    else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=3288811d6d89d91906ba3ae44ecbc115&query=${Word}&language=en-US`)
      SettrendingPeople(data.results)
    }


  }
  function onSearch(Word) {
    SearchMovie(Word)
  }

  return (
    <>
      <div className="row py-3 gy-4">
      <div className="col-md-4 mt-5 caption_page ">
        <h4>Trending Person To Watch Now.</h4>
        <p className='text-muted'>Most Watch Person by day</p>
        </div>
      <div className='col-md-8 '>
        <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder='Search' className='form-control input_search w-100  mt-5' />
      </div>
        
        {trendingPeople.map((movie) => (<div onClick={() => goDetiles(movie.id)} key={movie.id} className="col-lg-3 col-md-4 col-sm-6">
          <div className="card">
            <div className='img_people'>
              <img className='w-100 img_hover' src={imgurl + movie.profile_path} alt="" />
              <div className="card_hover">
                <div className='text-center'>
                <h2 className='h3 mb-3 text-primary name_movies'> "{movie.name}"</h2>
                  <h6>popularity : <span className='text_hover'>{movie.popularity}</span></h6>
                  <h6>known_for_department: <span className='text_hover'>{movie.known_for_department}</span></h6>
                  <h6>original_name: <span className='text_hover'>{movie.original_name}</span></h6>
                </div>

              </div>
             
            </div>



          </div>
        </div>)



        )}


         {/* pagination */}
         <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="previous"
        containerClassName={"pagination justify-content-center p-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      {/* pagination */}
      </div>
    </>
  )
}
