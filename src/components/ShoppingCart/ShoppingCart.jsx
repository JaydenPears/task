// import libs:
import React, { useState, useEffect } from 'react';
import {
    FixedLayout,
} from '@vkontakte/vkui';
import { store } from '../../context/itemsCart.mjs'; 

// import static:
import '@vkontakte/vkui/dist/vkui.css';

const ShoppingCart = () => {
    const [items, setItems] = useState(store.getState());
    const [price, setPrice] = useState(0);
    store.subscribe(() => setItems(store.getState()));

    useEffect(() => {
        let newPrice = 0;
        for (let key in items){
            newPrice += items[key]["price"] * items[key]["count"];
        };
        setPrice(newPrice);
    }, [items]);

    return (
        <div style={{width: "25%", marginLeft: "16px"}}>
            <FixedLayout>
                <p style={{ fontSize: "20px", width: "24%", marginTop: "24px", fontWeight: "500", whiteSpace: "balance"}}>
                    Итог: {price}$
                </p>
            </FixedLayout>
        </div>
    );
};

export default ShoppingCart;