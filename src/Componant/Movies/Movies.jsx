import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Pagination } from 'bootstrap/dist/css/bootstrap.min.css'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';


export default function Movies() {
  let imgurl = 'https://image.tmdb.org/t/p/w500'
  let [PoPMovie, SetPoPMovie] = useState([]);


  async function getTrindgMovies() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3288811d6d89d91906ba3ae44ecbc115&language=en-US`)
    SetPoPMovie(data.results)

  }

  // pagination
  function handlePageClick(data) {
    getpagination(data.selected + 1)

  }
  let pageCount = 500;
  async function getpagination(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3288811d6d89d91906ba3ae44ecbc115&language=en-US&page=${page}`)
    SetPoPMovie(data.results)

  }
  // pagination
  useEffect(() => {
    getTrindgMovies();

  }, [])
  //////Details
  let Navigate = useNavigate()
  function goDetiles(id) {
    // alert(id)
    Navigate({
      pathname: '/detiles',
      search: `?id=${id}`,
    })
  }
  //////
  // search
  async function SearchMovie(Word) {
    if (Word === "") {
      getTrindgMovies();
    }
    else {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3288811d6d89d91906ba3ae44ecbc115&query=${Word}&language=en-US`)
      SetPoPMovie(data.results)
    }


  }

  function onSearch(Word) {
    SearchMovie(Word)
  }
  // search

  return (
    <>
      <div className="container">
        <div className="row py-4 gy-4 ">
          <div className="col-md-4 mt-5 caption_page ">
            <h4>Trending Popular Movies To Watch Now.</h4>
            <p className='text-muted'>Most Watch Movies by day</p>
          </div>
          <div className='col-md-8 '>
            <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder='Search' className='form-control input_search w-100  mt-5' />
          </div>
          {PoPMovie.map((movie) => (
            <div onClick={() => goDetiles(movie.id)} key={movie.id} className="col-lg-3 col-md-4 col-sm-6 position-relative ">
              <div className="card">
                <img src={imgurl + movie.poster_path} className='w-100 img_movie' alt="" />

                <div className="card_hover">
                  <div className='text-center'>
                    <h2 className='h3 mb-3 text-primary name_movies'> "{movie.title}"</h2>
                    <p>release_date: <span className='text_hover'>{movie.release_date}</span> </p>
                    <p>vote count: <span className='text_hover'>{movie.vote_count}</span> </p>
                    <p>vote_average: <span className='text_hover'>{movie.vote_average}</span> </p>
                  </div>

                </div>
              </div>
              <p className='vote_num '>{movie.vote_average}</p>
            </div>
            
          ))}


        </div>

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
