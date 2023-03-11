
import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
export default function DetilesPeople() {
    let imgurl = 'https://image.tmdb.org/t/p/w500'
    let [SearchParams, setSearchParams] = useSearchParams();
    let [detiles, setdetiles] = useState({})
    let currentId = SearchParams.get('id')
    // alert(currentId)
    async function getTrendingDetiles(people) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${people}/${currentId}?api_key=3288811d6d89d91906ba3ae44ecbc115`)
        setdetiles(data);
        
       console.log(data)
    }
    useEffect(() => {
      
        getTrendingDetiles('person')

    }, [])

    return (
        <>
            <div className="row py-5 ">
                <div className="col-md-5 ">
                    <img className='w-100 detls_img' src={imgurl+detiles.profile_path} alt="" />
                </div>
                <div className="col-md-7">
                    <h2 >{detiles.name}</h2>
                    <div>
                        <div className='bg-info me-3 mb-2 dtls-all'>{detiles.gender}</div>
                        <div className='bg-info me-3 mb-2 dtls-all'>{detiles.id}</div>
                        <div className='bg-info me-3 dtls-all'>{detiles.known_for_department}</div>
                        <div className="clr"></div>
                    </div>


                    <h6 className='mb-3 mt-3'>imdb_id:<span className='bg-detiles-p '>{detiles.imdb_id}</span></h6>
                    <h6 className='mb-3'>popularity:<span className='bg-detiles-p '>{detiles.popularity}</span></h6>
                    <h6 className='mb-3'>place_of_birth:<span className='bg-detiles-p'>{detiles.place_of_birth}</span></h6>
                    <h6 className='mb-3 mt-3'>also_known_as :  <span>{detiles.also_known_as}</span> </h6>
                   
                   

                </div>
                <div className="all_wtc_movie">
                    <div>
                        <h5 className=' mb-3' > "" Read more "" </h5>
                        <a className=' wtc_movie ms-4' href={detiles.homepage}>Read more</a>
                    </div>

                </div>
            </div>
        </>
        
    )
}
