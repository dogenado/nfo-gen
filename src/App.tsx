import { useEffect } from 'react';
import { Badge, Col, Container, Row, Stack, Tab, Tabs } from 'react-bootstrap';
import packageJson from '../package.json';
import About from './components/About';
import './scss/App.scss';
import store from './app/store';
import CopyNfo from './components/CopyNfo';
import CopyNfoText from './components/CopyNfoText';
import { setIsRightNfo, updateDarkMode } from './features/app/appSlice';
import Nfo from './components/Nfo';
import NfoForm from './components/NfoForm';
import OptionsJson from './components/OptionsJson';
import ReturnToTop from './components/ReturnToTop';


function updateDarkColorScheme() {
    const mode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    store.dispatch(updateDarkMode({ mode }));
}

const tabsId = "tabs";
const leftNfoId = "content0";
export const rightNfoId = "content1";

function updateCurrentTab() {
    const isRightNfo = window.matchMedia && window.matchMedia("(min-width: 1200px)").matches;
    store.dispatch(setIsRightNfo({ isRightNfo }));

    const tabIsNfo = document.getElementById(tabsId + '-tab-nfo')!.classList.contains('active');
    if (tabIsNfo) {
        document.getElementById(tabsId + '-tab-form')!.click();
    }
}

function App() {
    useEffect(() => {
        updateDarkColorScheme();
        updateCurrentTab();
        if (window.matchMedia) {
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateDarkColorScheme);
            window.matchMedia("(min-width: 1200px)").addEventListener("change", updateCurrentTab);
        }
    });
    return <Container fluid>
        <CopyNfoText />
        <Row>
            <Col sm="12" xl="6" style={{ height: "100vh", overflowY: "scroll" }}>
                <div id="leftCol" className="px-3 py-3">
                    <Row className="mb-3">
                        <Col>
                            <Stack direction="horizontal" style={{ alignItems: 'baseline' }} gap={3}>
                                <h1>AWCY? Readme Generator</h1>
                                <Badge bg="light" text="dark">v{packageJson.version}</Badge>
                            </Stack>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="form" id={tabsId} className="mb-3">
                                <Tab eventKey="form" title="Form">
                                    <NfoForm />
                                    <ReturnToTop id="leftCol" />
                                </Tab>
                                <Tab eventKey="json" title="Save/Load">
                                    <OptionsJson />
                                </Tab>
                                <Tab eventKey="nfo" title="NFO" tabClassName="d-xl-none">
                                    <div className="d-xl-none mx-auto" style={{ width: "fit-content" }}>
                                        <CopyNfo />
                                        <Nfo id={leftNfoId} />
                                        <ReturnToTop id="leftCol" />
                                    </div>
                                </Tab>
                                <Tab eventKey="about" title="About">
                                    <About />
                                    <ReturnToTop id="leftCol" />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col sm="12" xl="6" className="d-none d-xl-block" style={{ height: "100vh", overflowY: "scroll" }}>
                <div id="rightCol" className="mx-auto pt-3" style={{ width: "fit-content" }}>
                    <CopyNfo />
                    <Nfo id={rightNfoId} />
                    <ReturnToTop id="rightCol" />
                </div>
            </Col>
        </Row>
    </Container>
}

export default App;
