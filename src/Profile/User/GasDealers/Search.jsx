import styled from 'styled-components';
import axios from 'axios';
import { useState, useCallback, useEffect, useContext } from 'react';
import { AppContext } from '../../../Contexts/ApplicationContext';
import { decrypt } from '../../../functions/encryption';

const DIV = styled.div`
    .search {
        border-radius: 20px;
        padding: 9px 15px 7px 15px;
        border: 1px solid transparent;
        box-shadow: 0px 1px 2px 1px #b8bef2;
        transition: 0.3s;
        border-radius: 50px;
        box-shadow: 0px 2px 3px 0px lightgrey;
        -webkit-appearance: none;
    }
    .search:focus {
        outline: none !important;
        background-color: #f7f6f6;
    }
`;

const Search = ({ setLoading, SetGas_dealers, setError }) => {
    const { state } = useContext(AppContext);
    const [key_word, setKey_word] = useState(null);

    const change = (e) => {
        setKey_word(e.target.value);
    };
    const search = useCallback(
        async (signal) => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_ORDERS}dealer_search/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: import.meta.env.VITE_APP_API_KEY,
                        },
                        params: { state: state, search: key_word },
                        signal: signal,
                    },
                );
                const decrypted_response = JSON.parse(decrypt(response.data));
                if (decrypted_response.status === 200) {
                    SetGas_dealers(decrypted_response.data);
                    setLoading(false);
                } else {
                    setError(true);
                }
            } catch {
                if (axios.isCancel) {
                    return null;
                }
            }
        },
        [state, key_word, setLoading, SetGas_dealers, setError],
    );

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (key_word !== null && key_word !== '') {
            search(signal);
        }
        if (key_word === null || key_word === '') {
            SetGas_dealers(null);
        }

        return () => {
            controller.abort();
        };
    }, [search, key_word, SetGas_dealers]);

    return (
        <DIV>
            <input
                className="search"
                name="key_word"
                placeholder="search for gas dealers"
                onChange={change}
            />
        </DIV>
    );
};

export default Search;
