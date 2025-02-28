import styled from 'styled-components';

export const LayoutStyle = styled.div`
	height: 100%;
    display: flex;
    flex-direction: column;
    background: #f2f3f5;

    .layout-container {
        flex: 1;
        max-width: 1200px;
        width: 1200px;
        margin: 18px auto;
        overflow: auto;
    }
`;
