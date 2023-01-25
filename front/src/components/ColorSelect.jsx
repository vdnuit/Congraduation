/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import CloseImg from '../assets/closeImg.png';

const Background = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 120%;
    max-width: 500px;
    background-color: rgba(0, 0, 0, 0.7);
`;
const Container = styled.div`
    z-index: 999;
    position: absolute;
    top: 15%;
    left: 10%;
    padding: 5%;
    width: 70%;
    max-width: 350px;
    background: #ffffff;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    h4 {
        margin: 5px;
        font-family: 'Jua';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #252525;
    }
    div {
        text-align: center;
    }
`;
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
        width: 10vw;
        max-width: 50px;
        height: 10vw;
        max-height: 50px;
        margin: 5px;
    }
    [type='radio']:checked {
        border: 1px solid #ffa1a1;
    }
`;
const Close = styled.img`
    float: right;
`;
const Note = styled.div`
    border: 1px solid #c8c8c8;
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    width: 160px;
    height: 147px;
    img {
        margin-left: 10px;
        width: 96px;
        height: 130px;
        margin-top: 12px;
    }
`;
function ColorSelect({ IconChecked, setSelectOpen }) {
    const [value, setValue] = useState({ color: 0 });
    const { register, watch } = useForm();
    useEffect(() => {
        console.log(value);
        IconChecked(value.color);
    }, [value]);
    const onChange = () => {
        setValue(watch);
    };
    const closeSelect = () => {
        setSelectOpen(false);
    };
    return (
        <Background>
            <Container>
                <Close onClick={closeSelect} src={CloseImg} alt="닫기 버튼" />

                <h4>쪽지 색 선택</h4>
                <form onChange={onChange}>
                    <Colors>
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select0.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="0"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select1.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="1"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select2.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="2"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select3.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="3"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select4.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="4"
                        />
                    </Colors>
                    <Colors>
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select5.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="5"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select6.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="6"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select7.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="7"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select8.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="8"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select9.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
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
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select10.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="10"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select11.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="11"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select12.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="12"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select13.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="13"
                        />
                        <input
                            style={{
                                backgroundImage: `url("https://github.com/vdnuit/Congraduation/blob/vdnuit/front/src/assets/icons/select14.png?raw=true")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            {...register('color')}
                            type="radio"
                            name="color"
                            value="14"
                        />
                    </Colors>
                </form>
                <Note>
                    <img
                        alt="선택한 쪽지 이미지"
                        src={require(`../assets/icons/icon${value.color}.png`)}
                    />
                </Note>
            </Container>
        </Background>
    );
}
ColorSelect.propTypes = {
    IconChecked: PropTypes.func.isRequired,

    setSelectOpen: PropTypes.func.isRequired
};
export default ColorSelect;
/* eslint-disable global-require */
