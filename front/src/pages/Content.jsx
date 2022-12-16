import { React } from 'react';
import { useRecoilValue } from 'recoil';
import { ownerNameAtom, temporaryTreeAtom } from '../Atom';

function Content(){
    const ownerName=useRecoilValue(ownerNameAtom);
    const leaves = useRecoilValue(temporaryTreeAtom)
    
    return(
        <div>
            <div>{leaves[0].question}</div>
            <span>To.{ownerName}</span><span>삭제</span>
            <div>{leaves[0].message}</div>
            <div>{leaves[0].writer}</div>

            <div>스토리 공유하기</div>
            <div>이미지 다운로드</div>
        </div>
    )
}

export default Content;