import './App.css';
import Sidebar, { SidebarItem } from './components/Sidebar';
import { Home as HomeIcon, LayoutDashboard, Flag } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';



function App() {
 

  return (
    <Router>
      <div className="flex">
        {/* <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" alert />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
        <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
        <SidebarItem icon={<Calendar size={20} />} text="Marketplace" />
        <SidebarItem icon={<Layers size={20} />} text="Tasks" />
        <SidebarItem icon={<Flag size={20} />} text="Reporting" />
        <hr className='my-3' />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        <SidebarItem icon={<Layers size={20} />} text="Guidance & Guidelines" />
      </Sidebar> */}
        <Sidebar>
          <Link to="/"><SidebarItem icon={<HomeIcon size={20} />} text="Home" /></Link>
          <Link to="/dashboard"><SidebarItem icon={<LayoutDashboard size={20} />} text="Chat" /></Link>
       
        </Sidebar>

        <main className="flex-1 relative overflow-hidden text-[white]">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
        
             
          </Routes>
        </main>
      </div>
    </Router>

  );
}

export default App;