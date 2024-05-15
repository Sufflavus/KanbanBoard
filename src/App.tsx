import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { localeSetup } from './utils/locale.helper';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import './App.less';

const App = () => {
    localeSetup();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
