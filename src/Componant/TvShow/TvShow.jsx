import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function TvShow() {
  let imgurl = 'https://image.tmdb.org/t/p/w500'
  let [trendingTvshose, SettrendingTvshose] = useState([]);
  async function getTrindgTvshose(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=3288811d6d89d91906ba3ae44ecbc115`)
    SettrendingTvshose(data.results)

  }


  useEffect(() => {
    getTrindgTvshose('tv');

  }, [])

   // pagination
   function handlePageClick(data) {
    getpagination(data.selected+1)
    
  }
  let pageCount =500;
  async function getpagination(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=3288811d6d89d91906ba3ae44ecbc115&page=${page}`)
    SettrendingTvshose  (data.results)

  }
  // pagination

  let Navigate = useNavigate()
  function goDetiles(id) {
    // alert(id)
    Navigate({
      pathname: '/detilesTv',
      search: `?id=${id}`,
    })
  }
  async function SearchMovie(Word) {
    if (Word === "") {
      getTrindgTvshose('tv');
    }
    else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=3288811d6d89d91906ba3ae44ecbc115&query=${Word}&language=en-US`)
      SettrendingTvshose(data.results)
    }


  }
  function onSearch(Word) {
    SearchMovie(Word)
  }

  return (
    <>
      <div className="row py-3 gy-4">
      <div className="col-md-4 mt-5 caption_page ">
        <h4>Trending TV To Watch Now.</h4>
        <p className='text-muted'>Most Watch TV by day</p>
        </div>
      <div className='col-md-8 '>
        <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder='Search' className='form-control input_search w-100  mt-5' />
      </div>
        {trendingTvshose.map((movie) => (<div onClick={() => goDetiles(movie.id)} key={movie.id} className=" col-lg-3 col-md-4 position-relative">
          <div className="card">
            <div className='img_people'>
              <img className='w-100 img_movie' src={imgurl + movie.poster_path} alt="" />
            
              <div className="card_hover">
                <div className='text-center'>
                <h2 className='h3 mb-3 text-primary name_movies'> "{movie.name}"</h2>
                  <p>release date: <span className='text_hover'>{movie.first_air_date}</span></p>
                  <p>vote count: <span className='text_hover'>{movie.vote_count}</span></p>
                  <p>vote average: <span className='text_hover'>{movie.vote_average}</span></p>
                </div>

              </div>
              
            </div>

            
          </div>
          <p className='vote_num '>{movie.vote_average}</p>
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
