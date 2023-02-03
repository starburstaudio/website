import './App.css';
import HeaderView from './components/HeaderView';
import { FiChevronRight } from "react-icons/fi";

function App() {
  return (
    <div className="App justify-center">
      <HeaderView />
      <main className='flex-col justify-center '>
        <div className='w-full flex justify-center start-banner pt-16' /*style={{"background-image": "url(https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)"}}*/>
          <div className='all-width py-32 flex items-center justify-between'>
            <div className='h-min content-width'>
              <h1 className='text-5xl z-5 pb-4 w-full'>The last Lo-Fi samples you'll ever need</h1>
              <div className='content-width'>
                <p className='pb-4 pt-4'>
                  With over 450 individual samples, this huge sample pack has
                  something for all flavors of lo-fi - From thumping, driven kick
                  drums to meticulously textured percussion and synth loops with
                  that signature vintage warmth. Embrace the past sound and get
                  your hands on this sample pack today!
                </p>
                <div>
                  <a className='btn btn-primary text-base mr-2' href='/'>
                    <span>Check it out!</span>
                    <FiChevronRight className='ml-2'/>
                  </a>
                  <a className='btn btn-ghost' href='/'>Other Sample Packs </a>
                </div>
              </div>
            </div>
            <img alt="" src='https://cdn.shopify.com/s/files/1/0559/0941/7058/products/TY-ARCHIVEVOL.1.png?v=1662698174' className='w-96 h-96 rounded'/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
