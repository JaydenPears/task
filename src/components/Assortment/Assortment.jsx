// import libs:
import React, { useState, useEffect } from 'react';
import { 
    Group,
    CardGrid,
    Title,
    ContentCard,
    Text,
    ButtonGroup,
    Button,
 } from '@vkontakte/vkui';
 import { store, add, remove } from '../../context/itemsCart.mjs';

// import static:
import '@vkontakte/vkui/dist/vkui.css';

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

const Assortment = () => {
    const [items, setItems] = useState([]);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [currentState, setCurrentState] = useState(store.getState());

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

    const addItem = (id) => {
        let countItems = items[id]["quantity"];
        let item_id = items[id]["id"];
        let cost = items[id]["price"];
        if (!Object.keys(currentState).includes(item_id.toString())){
           store.dispatch(add([item_id, {...currentState}, cost]));
        }
        else if (Object.keys(currentState).includes(item_id.toString()) && currentState[item_id]["count"] + 1 <= countItems){
            store.dispatch(add([item_id, {...currentState}, cost]));
        }
        setCurrentState(store.getState());
    }

    const removeItem = (id) => {
        console.log(1)
    }

    return (
        <Group
            style={{width: "75%"}}
            header={<Title level="2" style={{marginTop: "16px", marginBottom: "16px", marginLeft: "16px"}}>
                        Ассортимент
                    </Title>}>
            <CardGrid size={windowSize["innerWidth"] < 600
                ? "l"
                : "s"
            }>
                {items.map((elem, index) => 
                    <ContentCard
                        key={elem["id"]}
                        header={elem["title"]}
                        src={elem["thumbnail"]}
                        caption={
                            <ButtonGroup>
                                <Button id={elem["id"]} size="l" onClick={(e) => addItem(index, elem["id"])}>
                                    Buy me
                                </Button>
                                <Button id={elem["id"]} size="l" onClick={(e) => removeItem(index, elem["id"])}>
                                    Delete me
                                </Button>
                            </ButtonGroup>
                        }
                        width={400}
                        height={200}
                        text={
                            <Text>
                                <b>Стоимость товара: {elem["price"]}$</b>
                            </Text>
                        }
                    />
                )}
            </CardGrid>
        </Group>
    );
};

export default Assortment;