// import libs:
import React, { useState, useEffect } from 'react';
import { 
    Group,
    CardGrid,
    Title,
    ContentCard,
    Text,
 } from '@vkontakte/vkui';

// import static:
import '@vkontakte/vkui/dist/vkui.css';

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

const Assortment = () => {
    const [items, setItems] = useState([]);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        fetch(`https://dummyjson.com/carts/1`)
        .then(response => response.json())
        .then((data) => {
          setItems(data['products']);
        })
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Group header={<Title level="2" style={{ marginBottom: 16 }}>Ассортимент</Title>}>
            <CardGrid size={windowSize["innerWidth"] < 600
                ? "l"
                : "s"
            }>
                {items.map((elem) => 
                    <ContentCard
                        key={elem["id"]}
                        subtitle="VKUI"
                        header={elem["title"]}
                        src={elem["thumbnail"]}
                        caption={
                            <button>
                                Buy me
                            </button>
                        }
                        maxHeight={400}
                        text={
                            <Text>
                                Стоимость товара без скидки: {elem["price"]} $
                                <br/>
                                <b>Если заберёте все {elem["quantity"]} шт. - это обойдётся вам всего в {elem["discountedPrice"]}$ по текущему предложению!</b>
                            </Text>
                        }
                    >
                    </ContentCard>
                )}
            </CardGrid>
        </Group>
    );
};

export default Assortment;