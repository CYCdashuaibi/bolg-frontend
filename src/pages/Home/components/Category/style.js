import styled from 'styled-components';

export const CategoryStyle = styled.nav`
    width: 180px;
    
    .nav-item-list {
        padding: 8px;

        .nav-item-wrap {
            display: inline-block;
            width: 100%;
            padding: 10px 17px;
            font-size: 16px;
            line-height: 24px;
            border-radius: 4px;

            &:hover {
                background: #f7f8fa;
                color: #1e80ff;
            }

            &.active {
                font-weight: 500;
                color: #1e80ff;
                background-color: #eaf2ff;
            }

            .iconfont {
                margin-right: 12px;
            }
        }
    }
`;
