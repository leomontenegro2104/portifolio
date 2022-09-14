import './styles.css';

export default function ColoredCard({ cardName, cardImg, cardValue, cardColor }) {
    return (
        <div className={`${cardColor} coloredCard`}>
            <img className='coloredCard__icon' src={cardImg} alt={cardName} />
            <div className='coloredCard__info-container montserrat fw700'>
                <h3 className='fs18 lh23 coloredCard__title'> {cardName} </h3>
                <strong className='fs24 lh30'> {cardValue} </strong>
            </div>
        </div>
    )
}