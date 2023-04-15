import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import PostBox from './components/PostBox';
import EditPost from './components/EditPost';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<Blog />} />
              <Route path='/login' exact element={<Login />} />
              <Route path='/register' exact element={<Register />} />
              <Route path='/create-post' exact element={<PostBox />} />
              <Route path='/edit-post/:postId' exact element={<EditPost />} />
            </Routes>
          </Router>
        </div>
      </QueryClientProvider>
  );
}

export default App;
