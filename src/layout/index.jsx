import { Outlet } from 'react-router-dom';

import { Header } from './components';

import { LayoutStyle } from './style';

function Layout(props) {
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