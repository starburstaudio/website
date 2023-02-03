import './App.css';
import HeaderView from './components/HeaderView';
import { FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { IconContext } from "react-icons";

function App() {
  return (
    <div className="App justify-center">
      <HeaderView />
      <main className='flex-col justify-center '>
        <div className='w-full flex justify-center start-banner pt-16' style={{"background-image": "url(https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}>
          <div className='all-width py-24 flex items-center justify-between'>
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
                  <a className='btn shadow-xl btn-primary btn-lg text-base mr-2' href='/'>
                    <span>Check it out!</span>
                    <FiChevronRight className='ml-2'/>
                  </a>
                  <a className='btn btn-ghost btn-lg' href='/'>Other Sample Packs </a>
                </div>
              </div>
            </div>
            <div className="card w-[24rem] bg-base-100 shadow-xl image-full bannercover">
              <figure><img
                src="https://cdn.shopify.com/s/files/1/0559/0941/7058/products/TY-ARCHIVEVOL.1.png?v=1662698174"
                alt="Cover image of the Lofi Sample Pack"
              /></figure>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center flex-col'>
          <div className='all-width my-16'>
            <h2 className='text-4xl mb-4'>Top Sample Packs</h2>
            <p className='content-width mb-2'>
              With over 450 individual samples, this huge sample pack has
              something for all flavors of lo-fi - From thumping, driven kick
              drums to meticulously textured percussion and synth loops with
              that signature vintage warmth. Embrace the past sound and get
              your hands on this sample pack today!
            </p>
            <IconContext.Provider value={{ size: "2em" }}>
            <div
              className="carousel carousel-end p-8 -ml-8 space-x-8 rounded-box masked-overflow-y"
              style={{ "width": "calc(100% + 8rem);"}}
            >
              <div class="carousel-item">
                <div className="card w-80 bg-base-100 shadow-lg indicator">
                  <figure><img src="https://cdn.shopify.com/s/files/1/0559/0941/7058/products/TY-ARCHIVEVOL.1.png?v=1662698174" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Lo-Fi Memories
                      <div className="badge badge-accent">NEW</div>
                    </h2>
                    <p className="pb-4">
                      With over 450 individual samples, this huge sample pack has
                      something for all flavors of lo-fi.
                    </p>
                    <div className="card-actions justify-end">
                      <div className="btn btn-ghost">Show More</div>
                      <div className="btn btn-primary">
                        <span className="mr-2 text-base">7,99€</span>
                        <FiPlusCircle/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div class="carousel-item">
                  <div className="card w-80 bg-base-100 shadow-lg indicator">
                    <figure><img src="https://t2.genius.com/unsafe/903x0/https%3A%2F%2Fimages.genius.com%2F5085bb85a1459e2edde86cdc3da324b3.1000x1000x1.jpg" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        Icedancerr
                        <div className="badge badge-secondary">50% OFF</div>
                      </h2>
                      <p className="pb-4">
                        The cover was created by Bladee himself. It features
                        castles, a common theme in DG art and euros because he's
                        from Sweden.
                      </p>
                      <div className="card-actions justify-end">
                        <div className="btn btn-ghost">Show More</div>
                        <div className="btn btn-primary">
                          <span className="mr-2 text-base">3,99€</span>
                          <FiPlusCircle/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div className="card w-80 bg-base-100 shadow-lg indicator">
                    <figure><img src="https://i.kym-cdn.com/photos/images/newsfeed/002/450/520/b00.jpg" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        Quieres Spiderr
                        <div className="badge badge">FREE</div>
                      </h2>
                      <p className="pb-4">
                        Girl, can't you see im messed uppp D-30 boys really next
                        up in this life I'm a extra king nothyng
                      </p>
                      <div className="card-actions justify-end">
                        <div className="btn btn-ghost">Show More</div>
                        <div className="btn btn-primary">
                          <span className="mr-2 text-base">FREE</span>
                          <FiPlusCircle/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div className="card w-80 bg-base-100 shadow-lg indicator">
                    <figure><img src="https://t2.genius.com/unsafe/903x0/https%3A%2F%2Fimages.genius.com%2Fb81222e5d6dfc81874e7a120daefc163.1000x1000x1.jpg" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        Nike Just Do It
                      </h2>
                      <p className="pb-4">
                        With over 450 individual samples, this huge sample pack has
                        something for all flavors of lo-fi.
                      </p>
                      <div className="card-actions justify-end">
                        <div className="btn btn-ghost">Show More</div>
                        <div className="btn btn-primary">
                          <span className="mr-2 text-base">7,99€</span>
                          <FiPlusCircle/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <div className="card w-80 bg-base-100 shadow-lg indicator">
                    <div className="card-body flex flex-col justify-center">
                      <div>
                        <h2 className='text-4xl text-center pb-4'>
                          Want some more?
                        </h2>
                        <p className="pb-4">
                          There's a lot more where that came from. We've got a
                          ton of amazing paid sample packs and even some free
                          ones!
                        </p>
                        <a class="btn btn-primary">Show all Sample Packs</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            </IconContext.Provider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
