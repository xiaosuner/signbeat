import "./App.css";
import { Layout } from "antd";
import { ContentComponent } from "./components/layout/ContentComponent";
import { HeaderComponent } from "./components/layout/HeaderComponent";
import { FooterComponent } from "./components/layout/FooterComponent";

const { Content } = Layout;

const App = () => (
  <Layout style={{ height: "100%" }}>
    <HeaderComponent />
    <Content style={{ padding: "0 50px", overflow: "overlay" }}>
      <ContentComponent />
    </Content>
    <FooterComponent />
  </Layout>
);

export default App;
