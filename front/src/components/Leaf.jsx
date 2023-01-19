import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Box = styled.div`
    width: 98px;
    height: 98px;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    background: #ffffff;
    /* stroke */
    border: 1px solid #c8c8c8;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Img = styled.img`
    width: 64px;
    height: 64px;
    margin-top: 16px;
`;

function Leaf({ id, icon }) {
    const params = useParams()
    return (
        <Box>
            <Link to={`/content/${params.id}/${id}`}>
                <Img src={icon} alt={id} />
            </Link>
        </Box>
    );
}

Leaf.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Leaf;
