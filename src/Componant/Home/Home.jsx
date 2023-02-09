import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export default function Home() {
  let imgurl = 'https://image.tmdb.org/t/p/w500'
  let [trendingMovie, SettrendingMovie] = useState([]);
  async function getTrindgMovies(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=3288811d6d89d91906ba3ae44ecbc115`)
    SettrendingMovie(data.results)

  }
  let Navigate = useNavigate()
  function goDetiles(id) {
    // alert(id)
    Navigate({
      pathname: '/detiles',
      search: `?id=${id}`,
    })
  }
  // pagination
  function handlePageClick(data) {
    getpagination(data.selected + 1)

  }
  let pageCount = 500;
  async function getpagination(page) {
    let { data } = await axios.get(` https://api.themoviedb.org/3/trending/movie/day?api_key=3288811d6d89d91906ba3ae44ecbc115&page=${page}`)
    SettrendingMovie(data.results)
   
  }
  // pagination
  useEffect(() => {
    getTrindgMovies('movie');

  }, [])
  async function SearchMovie(Word) {
    if (Word === "") {
      getTrindgMovies('movie');
    }
    else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3288811d6d89d91906ba3ae44ecbc115&query=${Word}&language=en-US`)
      SettrendingMovie(data.results)
    }


  }
  function onSearch(Word) {
    SearchMovie(Word)
  }
  return (
    <>
     
      <div className="row py-3 gy-4">
      <div className="col-md-4 mt-5 caption_page ">
        <h4>Trending Movies To Watch Now.</h4>
        <p className='text-muted'>Most Watch Movies by day</p>
        </div>
      <div className='col-md-8 '>
        <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder='Search' className='form-control input_search w-100  mt-5' />
      </div>
      

        {trendingMovie.map((movie) => (
          <div onClick={() => goDetiles(movie.id)} key={movie.id} className=" col-md-3 col-sm-6">
            <div className="card">
              <div className='img_people'>
                <img className='w-100 img_movie ' src={imgurl + movie.poster_path} alt="" />
                <div className="card_hover">
                  <div>
                    <p>Name:<span className='text_hover'>{movie.title}</span> </p>
                    <p>release_date:<span className='text_hover'>{movie.release_date}</span> </p>
                    <p> vote count :<span className='text_hover'>{movie.vote_count}</span> </p>
                    <p>vote average:<span className='text_hover'>{movie.vote_average}</span> </p>
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
