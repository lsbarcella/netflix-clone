import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as ApiTmbService from '../../services/apiTmdb'
import Title from '../../components/atoms/Title'
import List from '../../components/molecules/List'

export interface movieData {
  url: string
  id: number
}

function Catalog() {
  const navigate = useNavigate()
  const [popularMovies, setPopularMovies] = useState<movieData[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<movieData[]>([])



  const imgUrl = 'https://image.tmdb.org/t/p/w300'

  function sendToMovie(id:number) {
    navigate('/filme/' + id)
  }

  useEffect(() => {
    function searchPopular() {
      ApiTmbService.getPolular()
        .then((response) => {
          const novaResposta = response.results
  
          const novoObjeto = {
            poster_path: 'Leandro',
            id: 1
          }
  
          novaResposta.push(novoObjeto)
  
          const movieImgs = response.results.map((result) => {
            return {
              url: imgUrl + result.poster_path,
              id: result.id
            }
          })
          setPopularMovies(movieImgs)
        })
    }

    function searchTopRated() {
      ApiTmbService.getTopRated()
        .then((response) => {
          console.log(response);
          
          const novaResposta = response.results
  
          const novoObjeto = {
            poster_path: 'Leandro',
            id: 1
          }
  
          novaResposta.push(novoObjeto)
  
          const movieImgs = response.results.map((result) => {
            return {
              url: imgUrl + result.poster_path,
              id: result.id
            }
          })
          setTopRatedMovies(movieImgs)
        })
    }

    searchPopular()
    searchTopRated()
  }, [])

  // React.useEffect(() => {
  //   console.log(popularMovies)
  //   console.log(topRatedMovies)
  // }, [popularMovies, topRatedMovies])

  return <>
    <Title>Catalogo</Title>
    <List title='Populares' movies={popularMovies} />
    <List title='Top Assistidos' movies={topRatedMovies} />
    <button type='button' onClick={() => sendToMovie(438148)}>Redirect</button>
  </>
}

export default Catalog