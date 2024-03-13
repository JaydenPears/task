// import libs:
import React, { useState, useEffect } from 'react';
import {
    Title,
    FixedLayout
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
        console.log(newPrice);
        setPrice(newPrice);
    }, [items]);

    return (
        <div style={{width: "25%"}}>
            <FixedLayout>
                <Title level="2" style={{ marginLeft: "16px", marginTop: "24px" }}>
                    Итоговая цена: {price} $.
                </Title>
            </FixedLayout>
        </div>
    );
};

export default ShoppingCart;