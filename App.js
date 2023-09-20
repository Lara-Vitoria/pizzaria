import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import CadastroProduto from './src/components/CadastroProduto';
import Venda from './src/components/Venda';
import ListaVendas from './src/components/ListaVendas';

const Routes = createAppContainer(
  createSwitchNavigator({
    CadastroProduto,
    ListaVendas,
    Venda,
  })
);
export default function App() {
  return (
    <Routes />
  );
}


