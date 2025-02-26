import { Tabs, Tab, Card, CardBody } from "@heroui/react";

interface TabContent {
    title: string;
    content: React.ReactNode;
}

type props = {
    content: TabContent[];
}

const MainTab: React.FC<props> = ({ content }) => {
    return (
        <div className="flex w-full flex-col">
            <Tabs>
                {content.map((tab, index) => (
                    <Tab key={index} title={tab.title}>
                        <Card>
                            <CardBody>
                                {tab.content}
                            </CardBody>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
}

export default MainTab;