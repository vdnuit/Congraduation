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
    background: #ffffff;
    /* stroke */
    border: 1px solid #c8c8c8;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &::before {
        display: block;
        content: "";
        padding-bottom: 6.05%;
      }

      &::after {
        display: block;
        content: "";
        padding-bottom: 6.05%;
      }
`

const Img = styled.img`
    width: 65.31%;
    height: 65.31%;
    max-width: 85px;
`;

function Leaf({ id, icon }) {
    const params = useParams()
    return (
        <GLink to={`/content/${params.id}/${id}`}>
            <Img src={icon} alt={id} key={id} />
        </GLink>
    );
}

Leaf.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Leaf;
