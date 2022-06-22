import './style.css';

export default function Card({ shoe, handleCardClick }) {
    return (
        <div className='card' onClick={(e) => handleCardClick(e)}>
            <img className='card__img' src={shoe.image} alt='sapato' id={shoe.id} />
            <span className='card__description'>{shoe.name}</span>
            <div className='card__price'>
                <span>{`R$ ${shoe.oldPrice.toFixed(0) - 1},90`}</span>
                <strong>{`R$ ${shoe.currentPrice.toFixed(2)}`}</strong>
            </div>
            <div className='card__payment'>
                <strong>{`6x  R$ ${(shoe.currentPrice / 6).toFixed(2)}`}</strong>
                <span>Sem juros</span>
            </div>
        </div>
    )
}