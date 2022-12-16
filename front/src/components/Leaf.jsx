import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Box = styled.div`
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;

    background: #FFFFFF;
    /* stroke */

    border: 1px solid #C8C8C8;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`

const Img = styled.img`
    width: 80px;
    height: 80px;
    margin-top: 20px;
`;

function Leaf({id, icon}) {
    return(
        <Box>
            <Link to={'/content/*'}><Img src={icon} alt={id} /></Link>
        </Box>
    );
}

Leaf.propTypes = {
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
};


export default Leaf;