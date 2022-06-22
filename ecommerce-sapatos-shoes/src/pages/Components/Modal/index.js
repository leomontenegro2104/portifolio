import './style.css';
import closeButton from '../../../assets/close-icon.svg';

export default function Modal({ shoe, setShowModal, showModal, index }) {
    return (
        <div className='modal' onClick={() => setShowModal(!showModal)}>
            <div className='modal__card'>
                <div className='card__close-btn'>
                    <img src={closeButton} alt='botão de fechar' />
                </div>
                <img src={shoe[index].image} alt='Sapato' />
                <strong>Sapato masculino - derby - Tabaco</strong>
                <p>
                    Sofisticado e cheio de elegância, este sapato estilo Derby deixará o seu look impecável. Feito de couro, conta com design moderno, solado flexível e palmilha extra macia. Com muito bom gosto e charme, é o tipo de sapato masculino que se adapta a qualquer ocasião, desde as formais as mais casuais. Fica incrível se combinado com camisa social manga longa e calça de linho.
                </p>
                <div className='card__buy'>
                    <button>Comprar</button>
                    <div className='card__price-payment' >
                        <div className='card__price'>
                            <span>{`R$ ${shoe[index].oldPrice.toFixed(0)},00`}</span>
                            <strong>{`R$ ${shoe[index].currentPrice.toFixed(2)}`}</strong>
                        </div>
                        <div className='card__payment'>
                            <strong>{`6x  R$ ${(shoe[index].currentPrice / 6).toFixed(2)}`}</strong>
                            <span>Sem juros</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}