import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom';

import { fetchProfile } from '@/store/modules/user';

import { getToken } from '@/utils';

import { Header } from './components';

import { LayoutStyle } from './style';

function Layout(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        if (getToken()) {
            dispatch(fetchProfile());
        }
    }, [dispatch]);

    return (
        <LayoutStyle>
            <Header />
            <div className="layout-container">
                <Outlet />
            </div>
        </LayoutStyle>
    );
}

export default Layout;