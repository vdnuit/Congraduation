/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Colors = styled.div`
    display: flex;
    justify-content: space-between;

    [type='radio'] {
        vertical-align: middle;
        appearance: none;
        border-radius: 50%;
        /* stroke */

        border: 1px solid #c8c8c8;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        width: 12vw;
        max-width: 50px;
        height: 12vw;
        max-height: 50px;
    }
    [type='radio']:checked {
        border: 1px solid #535353;
    }
`;
function ColorSelect({ IconChecked }) {
    const [value, setValue] = useState({ color: undefined });
    const { register, watch } = useForm();
    useEffect(() => {
        console.log(value);
        IconChecked(value.color);
    }, [value]);
    const onChange = () => {
        setValue(watch);
    };
    return (
        <div>
            <form onChange={onChange}>
                <Colors>
                    <input
                        style={{
                            backgroundColor: '#FFFFFF'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="0"
                    />
                    <input
                        style={{
                            backgroundColor: '#FFDEDE'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="1"
                    />
                    <input
                        style={{
                            backgroundColor: '#DEF6FF'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="2"
                    />
                    <input
                        style={{
                            backgroundColor: '#D5EDC5'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="3"
                    />
                    <input
                        style={{
                            backgroundColor: '#FFFBCF'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="4"
                    />
                </Colors>
                {/* <Colors>
                    <input
                        style={{
                            backgroundColor: '#707070'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="5"
                    />
                    <input
                        style={{
                            backgroundColor: '#E2B0B0'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="6"
                    />
                    <input
                        style={{
                            backgroundColor: '#AFCCDB'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="7"
                    />
                    <input
                        style={{
                            backgroundColor: '#B2D3B4'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="8"
                    />
                    <input
                        style={{
                            backgroundColor: '#E5DC9'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="9"
                    />
                </Colors>
                <Colors>
                    <input
                        style={{
                            backgroundColor: '#072A60'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="10"
                    />
                    <input
                        style={{
                            backgroundColor: '#FF6C0F'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="11"
                    />
                    <input
                        style={{
                            backgroundColor: '#8DC63F'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="12"
                    />
                    <input
                        style={{
                            backgroundColor: '#2B6652'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="13"
                    />
                    <input
                        style={{
                            backgroundColor: '#C8C8C8'
                        }}
                        {...register('color')}
                        type="radio"
                        name="color"
                        value="14"
                    />
                </Colors> */}
            </form>
        </div>
    );
}
ColorSelect.propTypes = {
    IconChecked: PropTypes.func.isRequired
};
export default ColorSelect;
