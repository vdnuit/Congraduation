import { React, useEffect, useState } from "react";
import styled from 'styled-components';
import Leaf from './Leaf';

// 화면에 tree가 보인다.
// 작성된 롤링페이퍼 수만큼 요소가 보인다.
// 각각의 요소는 클릭 가능하다.
const ATree = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    width: 25%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50% );
`;

const Leaves = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(4,1fr);
    width: 100%;
    height : 80%;
`;

const Pillar = styled.div`
    width: 50%;
    height: 20%;
    background-color: brown;
`;

function Tree() {
    const [loading, setLoading] = useState(true);
    const [leaves, setLeaves] = useState([]);
    const getTree = async() => {
        const json = await(await fetch(
            `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
        )).json();
        setLeaves(json.data.movies);
        setLoading(false);
    };
    useEffect(()=> {
        getTree();
    },[]);

    return(
        <div>
            {loading ? (
                <h1>나무를 불러오고 있어요</h1>
            ) : (
                <div>
                    <ATree>
                        <Leaves>
                            {leaves.map((leaf)=> (
                                <Leaf
                                    key={leaf.id}
                                    id={leaf.id}
                                    CoverImg={leaf.medium_cover_image}
                                />
                            ))}
                        </Leaves>
                        <Pillar/>
                    </ATree>
                </div>
            )}
        </div>
    );
}


export default Tree;
