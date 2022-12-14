/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { PropTypes } from 'prop-types';

function ColorSelect(setIcon) {
    const [value, setValue] = useState();
    const { register, watch } = useForm();
    console.log(watch());
    const onChange = () => {
        setValue(watch);
        console.log(value);
    };
    return (
        <div>
            <form>
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="0"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="1"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="2"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="3"
                    onChange={onChange}
                />
                <input
                    {...register('color')}
                    type="radio"
                    name="color"
                    value="4"
                    onChange={onChange}
                />
                <input
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
                />
                <button
                    type="button"
                    onClick={() => {
                        const dict = watch;
                        console.log(dict.color);
                        setIcon('a');
                    }}
                >
                    작성 완료
                </button>
            </form>
        </div>
    );
}
ColorSelect.propTypes = {
    setIcon: PropTypes.func.isRequired
};
export default ColorSelect;
