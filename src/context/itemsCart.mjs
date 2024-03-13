import { createSlice, configureStore } from '@reduxjs/toolkit';

const itemsCart = createSlice({
    name: 'counter',
    initialState: {},
    reducers: {
        add: (state, data) => {
            let [item_id, currentState, cost] = data["payload"];
            if (!Object.keys(currentState).includes(item_id.toString())){
                currentState[item_id] = {"price": cost, "count": 1};
                return {...currentState};
            }
            else {
                currentState[item_id] = {...currentState[item_id], "count": currentState[item_id]["count"] + 1};
                return {...currentState};
            }
        },
        remove: (state, data) => {
            let [item_id, currentState, cost] = data["payload"];
            currentState[item_id] = {...currentState[item_id], "count": currentState[item_id]["count"] - 1};
            return {...currentState};
        }
    }
});

export const { add, remove } = itemsCart.actions;

export const store = configureStore({
    reducer: itemsCart.reducer
});

