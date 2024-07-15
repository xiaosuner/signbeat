import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import { ContentComponent } from './ContentComponent';
import { HeaderComponent } from './HeaderComponent';
import { FooterComponent } from './FooterComponent';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout>
    <HeaderComponent />
    <Content style={{ padding: '0 50px' }}>
      <ContentComponent />
    </Content>
    <FooterComponent />
  </Layout>
);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React 22
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
