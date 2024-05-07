import { useEffect, createRef } from "react";
import { useTranslation } from "react-i18next";
import { Board, LanguageSelector } from '../../components';
import './Home.less';

const Home = () => {
    const {t} = useTranslation("common");

    const rootRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    const boardRef = createRef<HTMLDivElement>();

    const onWindowResize = () => {
        console.log("onWindowResize")
        updateBoardHeight();
    };

    const updateBoardHeight = () => {
        if(!rootRef || !headerRef || !boardRef) {
            return;
        }

        const rootElement = rootRef!.current as HTMLDivElement;
        const headerElement = headerRef!.current as HTMLDivElement;
        const boardElement = boardRef!.current as HTMLDivElement;

        const headerHeight = headerElement.clientHeight;
        const rootHeight = rootElement.clientHeight;

        const rootStyle = window.getComputedStyle(rootElement);
        const rootPaddings = parseInt(rootStyle.getPropertyValue('padding-top')) + 
            parseInt(rootStyle.getPropertyValue('padding-bottom'));

        boardElement.style.height = `${rootHeight - headerHeight - rootPaddings}px`;
    };

    // componentDidMount
    useEffect(() => {
        onWindowResize();
        window.addEventListener("resize", onWindowResize);
    }, []);
  
    // componentWillUnmount
    useEffect(() => {
        return () => {
        document.removeEventListener("resize", onWindowResize);
        }
    }, []);
console.log("home")
    return (
        <div ref={rootRef} className="home">
            <div ref={headerRef} className="header">
                <div className="header__right-panel">
                    <LanguageSelector/>
                </div>
                <div className="header__title">
                    {t('app.title')}
                </div>
            </div>
            <div ref={boardRef} className="board-wrapper">
                <Board/>
            </div>
        </div>
    );
};

export default Home;
