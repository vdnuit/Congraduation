import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const GLink = styled(Link)`
    position: relative;
    width: 100%;
    max-width: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    /* stroke */
    border: 1px solid #c8c8c8;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &::before {
        display: block;
        content: '';
        padding-bottom: 6.05%;
    }

    &::after {
        display: block;
        content: '';
        padding-bottom: 6.05%;
    }
`;

const Img = styled.img`
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 3px;
    width: 55.31%;
    // height: 70.31%;
    max-width: 85px;
`;

function Leaf({ id, icon, visit }) {
    const params = useParams();
    return (
        <GLink to={`/content/${params.id}/${id}`} color={visit}>
            <Img src={icon} alt={id} key={id} />
        </GLink>
    );
}

Leaf.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    visit: PropTypes.bool.isRequired
};

export default Leaf;
