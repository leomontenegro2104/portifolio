import { createContext, useCallback, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showUserSuccessMessage, setShowUserSuccessMessage] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState(
        {
            show: false,
            success: false,
            message: '',
        }
    );
    const [errorMessageUserModal, setErrorMessageUserModal] = useState(
        {
            nome: '',
            email: '',
            senha: '',
            repitaSenha: ''
        }
    );
    const [showChargeModal, setShowChargeModal] = useState(false);
    const [showChargeDetails, setShowChargeDetails] = useState(false);
    const [clientData, setClientData] = useState({});
    const [clientEditMode, setClientEditMode] = useState(false);
    const [chargeRows, setChargeRows] = useState([]);
    const [clientRows, setClientRows] = useState([]);
    const [chargeData, setChargeData] = useState({});
    const [chargeEditMode, setChargeEditMode] = useState(false);
    const [chargeDeleteMode, setChargeDeleteMode] = useState(false);
    const [notFoundedModal, setNotFoundedModal] = useState(false);
    const [filteredCharges, setFilteredCharges] = useState(false);
    const [filteredClients, setFilteredClients] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerState => !oldDrawerState)
    }, [])

    function handleEditCharge(event, params) {
        event.ignore = true;
        setShowChargeModal(true);
        setChargeEditMode(true);
        setChargeData({ ...params.row });
    }

    function handleDeleteCharge(event, params) {
        event.ignore = true;
        setShowChargeModal(true);
        setChargeDeleteMode(true);
        setChargeData({ ...params.row });
    }

    function handleChargeDetails(params, event) {
        if (!event.ignore) {
            setShowChargeDetails(true);
            setChargeData(params.row);
        }
    }

    function handleCloseChargeModal() {
        setShowChargeModal(false);
        setChargeEditMode(false);
        setChargeDeleteMode(false);
    }

    return (
        <DrawerContext.Provider value={{
            isDrawerOpen,
            toggleDrawerOpen,
            showUserModal,
            setShowUserModal,
            showClientModal,
            setShowClientModal,
            showUserSuccessMessage,
            setShowUserSuccessMessage,
            feedbackModal,
            setFeedbackModal,
            errorMessageUserModal,
            setErrorMessageUserModal,
            showChargeDetails,
            setShowChargeDetails,
            clientData,
            setClientData,
            showChargeModal,
            setShowChargeModal,
            clientEditMode,
            setClientEditMode,
            chargeRows,
            setChargeRows,
            chargeData,
            setChargeData,
            handleEditCharge,
            handleDeleteCharge,
            handleChargeDetails,
            chargeEditMode,
            setChargeEditMode,
            chargeDeleteMode,
            setChargeDeleteMode,
            handleCloseChargeModal,
            clientRows,
            setClientRows,
            notFoundedModal,
            setNotFoundedModal,
            filteredCharges,
            setFilteredCharges,
            filteredClients,
            setFilteredClients
        }}>
            {children}
        </DrawerContext.Provider>
    )
} 