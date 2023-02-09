
import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
export default function DetilesTv() {
    let imgurl = 'https://image.tmdb.org/t/p/w500'
    let [SearchParams, setSearchParams] = useSearchParams();
    let [detiles, setdetiles] = useState({})
    let currentId = SearchParams.get('id')
    // alert(currentId)
    async function getTrendingDetiles(TvshowType) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${TvshowType}/${currentId}?api_key=3288811d6d89d91906ba3ae44ecbc115`)
        setdetiles(data);
        
       
    }
    useEffect(() => {
      
        getTrendingDetiles('tv')

    }, [])

    return (
        <>
            <div className="row py-5 ">
                <div className="col-md-5 ">
                    <img className='w-100 detls_img' src={imgurl+detiles.backdrop_path} alt="" />
                </div>
                <div className="col-md-7">
                    <h2 >{detiles.name}</h2>
                    <div>
                        <div className='bg-info me-3 mb-2 dtls-all'>{detiles.original_name}</div>
                        <div className='bg-info me-3 mb-2 dtls-all'>{detiles.id}</div>
                        <div className='bg-info me-3 dtls-all'>{detiles.original_language}</div>
                        <div className="clr"></div>
                    </div>

                    <h6 className='mb-3'>vote:<span className='text-muted ms-1'>{detiles.vote_average}</span> </h6>
                    <h6 className='mb-3'>vote_count:<span className='text-muted ms-1 '>{detiles.vote_count}</span></h6>
                    <h6 className='mb-3'>popularity:<span className='text-muted ms-1 '>{detiles.popularity}</span></h6>
                    <h6 className='mb-3'>release_date:<span className='text-muted ms-1'>{detiles.first_air_date}</span></h6>
                    <p className='text-muted py-5'>{detiles.overview}</p>

                </div>
                <div className="all_wtc_movie">
                    <div>
                        <h5 className=' mb-3' > "" Go watch the TVShow "" </h5>
                        <a className=' wtc_movie ms-4' href={detiles.homepage}>watching the TVShow</a>
                    </div>

                </div>
            </div>
        </>
        
    )
}
