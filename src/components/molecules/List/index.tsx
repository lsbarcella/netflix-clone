import React, {useRef} from "react"
import Title from "../../atoms/Title"
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md"
import Button from "../../atoms/Button"
import { useNavigate } from "react-router-dom"
import { movieData } from "../../../pages/Catalog/Catalog"

interface ListInterface {
  movies: movieData[]
  title: string
  // movieId: number
}

function List({movies, title, 
  // movieId
}: ListInterface) {
  const navigate = useNavigate()
  const listaRef = useRef<HTMLDivElement>(null)

  function scroll(x: number) {
    listaRef.current && listaRef.current.scrollBy({
      left: x,
      behavior: 'smooth',
    })
  }

  function sendToMovie(id:number) {
    navigate('/filme/' + String(id))
  }

  return (
  <div className='categoria'>
    <Title>{title}</Title>
    <div
      className='categoria-lista'
      ref={listaRef}
    >
      <Button
        className='botao-lista categoria-esquerda'
        onClick={() => scroll(-300)}
      >
        <MdOutlineArrowBackIosNew className='icone' size={35} />
      </Button>
      {
        movies.map((movie, index) => {
          return <>
            <img src={movie.url} alt={`${index}`}
             onClick={() => sendToMovie(movie.id)}
             />
          </>
        })
      }
      <Button
        className='botao-lista categoria-direita'
        onClick={() => scroll(300)}
      >
        <MdOutlineArrowForwardIos className='icone' size={35} />
      </Button>
    </div>
  </div>
  )
}

export default List