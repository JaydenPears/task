// import libs:
import React, { useState, useEffect } from 'react';

// import static:
import classess from './../../styles/Assortment.module.scss';

const Assortment = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/carts/1`)
        .then(response => response.json())
        .then((data) => {
          setItems(data['products']);
        })
        .catch(error => console.error(error));
    }, []);
    console.log(items);

    return (
        <div className={classess.container}>
            <h1>Ассортимент товаров:</h1>
            <div className={classess.container__itemsLayout}>
                <div className={classess.container__items}>
                    {items.map((elem) => 
                        <div className={classess.container__items__card} key={elem["id"]}>
                            <h1>
                                { elem["title"] }
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assortment;