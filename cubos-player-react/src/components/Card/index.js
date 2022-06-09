import './style.css'

export default function Card({ obj, handle }) {
    return (
        <div
            className='card'
            onClick={() => handle(obj)}
        >
            <img className='card__cover' src={obj.cover} alt='song-cover' />
            <strong className='card__title'>{obj.title}</strong>
            <p className='card__description'>{obj.description}</p>
        </div>
    )
}