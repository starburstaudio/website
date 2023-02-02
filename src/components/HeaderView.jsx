import React from "react";


class HeaderView extends React.Component {
    render() {
        return (
            <header className='flex justify-center fixed top-0 bg-base-200 header z-10'>
                <div className="navbar px-0 all-width">
                    <div className="flex-1">
                    <a className="btn normal-case text-2xl">SBA</a>
                    </div>
                    <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Free Stuff</a></li>
                        <li><a>Plugins</a></li>
                        <li><a>Sample Packs</a></li>
                        <li><a>Blog</a></li>
                    </ul>
                    <div className="form-control">
                        <input
                        type="text"
                        placeholder="Search..."
                        className="input input-ghost input-sm mx-2"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.unsplash.com/photo-1619379180294-3e714910e031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        </label>
                        <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                        >
                        <li>
                            <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </header>
        );
    }
}

export default HeaderView;