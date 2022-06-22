import { useState } from 'react';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import './style.css';

import shoes from '../../data.js';

function Main() {
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);

  function handleCardClick(e) {
    const indexShoe = e.target.id - 1;
    console.log(indexShoe);
    setShowModal(!showModal);
    setIndex(indexShoe);
  }

  return (
    <div className="container">
      {showModal && <Modal
        shoe={shoes}
        setShowModal={setShowModal}
        showModal={showModal}
        index={index}
      />}
      <Header />
      <div className='container__card'>
        {shoes.map(shoe => {
          return (
            <Card
              key={shoe.id}
              shoe={shoe}
              handleCardClick={handleCardClick}
              showModal={showModal}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Main;
