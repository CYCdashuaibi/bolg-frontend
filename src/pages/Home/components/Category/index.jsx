import { useState } from "react";
import { CategoryStyle } from "./style";

const categorys = [
    {
        name: '全部',
        icon: 'icon-xingzhuang'
    },
    {
        name: '前端',
        icon: 'icon-qianduan',
    },
    {
        name: '后端',
        icon: 'icon-houduan',
    },
    {
        name: 'Android',
        icon: 'icon-anzhuo',
    },
    {
        name: 'Flutter',
        icon: 'icon-flutter-line',
    }
]

function Category({ onChange }) {
    const [active, setActive] = useState('全部');

    return (
        <CategoryStyle>
            <div className="nav-item-list cyc_card">
                {categorys.map((item) => (
                    <a className={`nav-item-wrap ${active === item.name && 'active'}`} key={item.name} onClick={() => { setActive(item.name); onChange?.(item.name) }}>
                        <i className={`iconfont ${item.icon}`} />
                        <span className="nav-item-text">{item.name}</span>
                    </a>
                ))}
            </div>
        </CategoryStyle>
    );
}

export default Category;