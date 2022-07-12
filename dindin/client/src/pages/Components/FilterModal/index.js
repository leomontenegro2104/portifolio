import './styles.css'
import closeIcon from '../../../assets/close-icon-white.svg';
import addIcon from '../../../assets/add-icon.svg';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { getItem } from '../../utils/storage';

export default function FilterModal(
    {
        transactions,
        setFilteredTransactions,
        filteredCategoriesId,
        setFilterCategoriesId
    }
) {
    const token = getItem('token');
    const [categories, setCategories] = useState([]);

    async function loadCategories() {
        try {
            const response = await api.get('categoria/',
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            setCategories(response.data);
        } catch (error) {
            // setErrorMessage(error.response.data);
        }
    }

    function handleClickCategories(e) {
        const targetId = e.target.id;
        const localFilteredCategoriesId = [...filteredCategoriesId];
        const isFiltered = localFilteredCategoriesId.some(item => item === targetId);
        const filteredIds = localFilteredCategoriesId.filter(localFilteredCategoryId => localFilteredCategoryId !== targetId);
        if (!isFiltered) {
            filteredIds.push(targetId);
        }
        setFilterCategoriesId(filteredIds)
    }

    function hanleClearFilter() {
        setFilterCategoriesId([]);
        setFilteredTransactions(null);
    }

    function handleApplyFilter() {
        const localTransactions = [...transactions];
        const filteredTransactions = [];
        const localFilteredCategoriesId = [...filteredCategoriesId];
        localFilteredCategoriesId.forEach(item => {
            const filter = localTransactions.filter(transaction => item === transaction.nome_categoria)
            if (filter.length > 0) {
                filteredTransactions.push(filter[0]);
            }
        })
        if (filteredTransactions.length > 0) {
            setFilteredTransactions(filteredTransactions);
        } else {
            setFilteredTransactions([]);
        }

    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <div className='container'>
            <h3 className='title font-rubik'>Categoria</h3>
            <div className='container-categories font-rubik'>
                {categories.map(category => (
                    <button
                        key={category.id}
                        id={category.descricao}
                        className={`filter-btns categories-btns ${filteredCategoriesId.some(item => item === category.descricao) ? 'bg-purple' : 'bg-gray'} `}
                        onClick={handleClickCategories}
                    >
                        {category.descricao}
                        <img
                            src={filteredCategoriesId.some(item => item === category.descricao) ? closeIcon : addIcon}
                            alt='fechar'
                        />
                    </button>
                ))}
            </div>
            <div>
                <button
                    className='main-btns clear-filter-btn font-lato'
                    onClick={hanleClearFilter}
                >
                    Limpar Filtros
                </button>
                <button
                    className='main-btns apply-filter-btn font-lato'
                    onClick={handleApplyFilter}
                >
                    Aplicar Filtros
                </button>
            </div>
        </div>
    )
}