import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 100px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 3.4em;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            isLoaded: false,
            genres: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:5050/api/m/movies/genres')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    genres: json,
                })
            });
    }

    onItemClick = (path) => {
        path = '/search' + path;
        this.setState({ activePath: path });
    }

    render() {
        const { activePath, items, isLoaded, genres } = this.state;
        if (!isLoaded) {
            return <div>Loading....</div>
        }

        else {
            const items = arrayToObjArray(genres);
            return(
                <StyledSideNav>
                    {
                        items.map((item) => {
                            return (
                                <NavItem 
                                    name={item.name}
                                    path={item.path}
                                    onItemClick={this.onItemClick}
                                    active={item.path === activePath}
                                />
                            );
                        })
                    }
                </StyledSideNav>
            );
        }
    }
}

function arrayToObjArray(array) {
    var finArr = [];
	var len = array.length;
	for (var i = 0; i < len; i++) {
        var obj = {};
		var curVal = array[i];
        obj['name'] = curVal;
        obj['path'] = '/search/'+curVal;
        finArr.push(obj);
    }
	return finArr;
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 75px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    a {
        font-size: 2.7em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return(
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.name} onClick={this.handleClick}>
                    <p style={{ fontSize : '30%' }}>{this.props.name}</p>
                </Link>
            </StyledNavItem>
        );
    }
}

const NavIcon = styled.div`

`;

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}