/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { PropTypes } from 'prop-types';

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
                <input {...register('color')} type="radio" name="color" value="0" />
                <input {...register('color')} type="radio" name="color" value="1" />
                <input {...register('color')} type="radio" name="color" value="2" />
                <input {...register('color')} type="radio" name="color" value="3" />
                <input {...register('color')} type="radio" name="color" value="4" />
                {/* <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="5"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="6"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="7"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="8"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="9"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="10"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="11"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="12"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="13"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="14"
                    onChange={onChange}
                /> */}
            </form>
        </div>
    );
}
ColorSelect.propTypes = {
    IconChecked: PropTypes.func.isRequired
};
export default ColorSelect;
