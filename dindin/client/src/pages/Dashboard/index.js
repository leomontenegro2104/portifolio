import Logo from '../Components/Logo';
import avatar from '../../assets/avatar.svg';
import filterImg from '../../assets/filter.svg'
import './styles.css';
import { getItem, clearAll } from '../utils/storage'
import logOutImg from '../../assets/logout-btn.svg'
import { useNavigate } from 'react-router-dom'
import TableRow from '../Components/TableRow';
import { useEffect, useState } from 'react';
import api from '../../services/api'
import RegisterModal from '../Components/RegisterModal';
import EditUserModal from '../Components/EditUserModal'
import FilterModal from '../Components/FilterModal';
import ascIcon from '../../assets/asc-icon.png'
import descIcon from '../../assets/desc-icon.png'

function Dashboard() {
  const [showNewRegister, setShowNewRegister] = useState(false);
  const [showEditRegister, setShowEditRegister] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const [transactionsExtract, setTransactionsExtract] = useState([]);
  const [filteredCategoriesId, setFilterCategoriesId] = useState([]);
  const [asc, setAsc] = useState(true)
  const token = getItem('token');
  const totalInputs = (transactionsExtract.entrada / 100).toFixed(2);
  const totalOutputs = (transactionsExtract.saida / 100).toFixed(2);
  const balance = (totalInputs - totalOutputs).toFixed(2);


  const navigate = useNavigate();

  async function loadTransactions() {
    try {
      const response = await api.get('transacao/',
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function loadTransactionsExtract() {
    try {
      const response = await api.get('transacao/extrato',
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      setTransactionsExtract(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    loadTransactions();
    loadTransactionsExtract();
  }, [showNewRegister, showEditRegister, transactions, transactionToEdit]);

  function handleLogout() {
    clearAll();
    navigate('/sign-in');
  }

  function handleShowModal() {
    if (showNewRegister) {
      return (
        <RegisterModal
          showModal={showNewRegister}
          setShowModal={setShowNewRegister}
          modalTitle='Adicionar Registro'
        />
      )
    }

    if (showEditRegister) {
      return (
        <RegisterModal
          showModal={showEditRegister}
          setShowModal={setShowEditRegister}
          modalTitle='Editar Registro'
          transactionToEdit={transactionToEdit}
        />
      )
    }

    if (showEditUser) {
      return (
        <EditUserModal
          showModal={showEditUser}
          setShowModal={setShowEditUser}
          modalTitle='Editar Perfil'
        />
      )
    }
  }

  function handleDateClick() {
    const localTransactions = [...transactions];
    setAsc(!asc);

    function orderDesc(a, b) {
      return new Date(a.data) - new Date(b.data);
    }

    function orderAsc(a, b) {
      return new Date(b.data) - new Date(a.data);
    }

    asc ? localTransactions.sort(orderAsc) : localTransactions.sort(orderDesc);
    setTransactions(localTransactions);

    if (filteredTransactions) {
      const localFilteredTransactions = [...filteredTransactions];
      asc ? localFilteredTransactions.sort(orderAsc) : localFilteredTransactions.sort(orderDesc);
      setFilteredTransactions(localFilteredTransactions);
    }
  }

  return (
    <div className="container__dashboard">
      {handleShowModal()}
      <header className='dashboard__header'>
        <Logo />
        <div className='dashboard__navbar'>
          <div
            className='navbar__avatar margin-right8 '
            onClick={() => setShowEditUser(!showEditUser)}
          >
            <img src={avatar} alt='avatar' />
          </div>
          <span className='navbar__user-name color-white font-rubik weight700 margin-right16'>{getItem('userName')}</span>
          <img
            className='navbar__logout'
            src={logOutImg}
            alt='logout'
            onClick={handleLogout}
          />
        </div>
      </header>
      <main className='container-table-filter-resume'>
        <div className='container-table-filter'>
          <button
            className='table__filter-btn font-lato weight700 margin-bottom25'
            onClick={() => setShowFilter(!showFilter)}
          >
            <img className='margin-right4' src={filterImg} alt='filtro' />
            Filtrar
          </button>
          {showFilter &&
            <FilterModal
              transactions={transactions}
              setFilteredTransactions={setFilteredTransactions}
              filteredCategoriesId={filteredCategoriesId}
              setFilterCategoriesId={setFilterCategoriesId}
            />}
          <div className='container__table'>
            <table className='table-transactions font-lato'>
              <tbody>
                <tr className='table__header '>
                  <th
                    className='header__date'
                    onClick={handleDateClick}
                  >
                    Data
                    <img src={asc ? ascIcon : descIcon} />
                  </th>
                  <th>Dia da semana</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th></th>
                  <th></th>
                </tr>
                {(filteredTransactions ? filteredTransactions : transactions).map(transaction => (
                  <TableRow
                    key={transaction.id}
                    setShowEditRegister={setShowEditRegister}
                    setTransactionToEdit={setTransactionToEdit}
                    transaction={transaction}
                    loadTransactions={loadTransactions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='dashboard-resume'>
          <div className='resume font-rubik color-black margin-bottom16'>
            <h2 className='resume__title weight700 margin-bottom25'>Resumo</h2>
            <div className='resume__infos weight500 margin-bottom12'>
              <strong>Entradas</strong>
              <span className='color-input'>{`R$ ${(transactionsExtract.entrada / 100).toFixed(2).replace('.', ',')}`}</span>
            </div>
            <div className='resume__infos weight500 margin-bottom19'>
              <strong>Saídas</strong>
              <span className='color-output'>{`R$ ${(transactionsExtract.saida / 100).toFixed(2).replace('.', ',')}`}</span>
            </div>
            <div className='resume__infos infos__balance  weight500'>
              <strong>Saldo</strong>
              <span className='color-balance'>{`R$ ${balance}`}</span>
            </div>
          </div>
          <button
            className='add-register-btn btn-purple'
            onClick={() => setShowNewRegister(!showNewRegister)}
          >
            Adicionar Registro
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
