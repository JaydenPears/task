import * as React from 'react';
import { usePlatform } from '@vkontakte/vkui';
import { createRoot } from 'react-dom/client';
import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui';
import Assortment from './components/Assortment/Assortment';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

// import static:
import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
            <SplitCol autoSpaced>
                <View activePanel="main">
                    <Panel id="main">
                        <PanelHeader>Задание на стажировку</PanelHeader>
                        <Assortment />
                        <ShoppingCart />
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    </AppRoot>
  );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ConfigProvider appearance='light'>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
);