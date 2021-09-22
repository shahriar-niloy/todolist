import React from 'react';
import UserMenuContainer from '../../containers/app/user-menu.container';
import Popover from '../lib/popover';

export default function Navbar({ onInitialsClick, initials }) {
    return (
        <nav class="navbar navbar-expand-lg dashboard_navbar">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="#">
                        ToDoList
                    </a>
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn navbar-search-button" type="submit">
                            Search
                        </button>
                    </form>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Popover component={UserMenuContainer} >
                                <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                                >
                                    {initials}
                                </a>
                            </Popover>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

