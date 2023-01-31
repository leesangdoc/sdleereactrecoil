import Head from 'next/head';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nameState, charState, myQuery } from '@/components/states';
import React from 'react';
/*
    컴파일과 번들링이 자동으로 된다.
    코드를 수정하면 화면에 바로 반영된다. (자동 refresh 기능)
    server-side rendering이 지원된다.
    static file을 지원한다. static file은 public 폴더에 둬야 한다.
*/
function Home() {
    
    const [name, setNameState] = useRecoilState(nameState);
    const charNumber = useRecoilValue(charState);
    const updateName = (e: { target: { value: string | ((currVal: string) => string); }; }) => {
        setNameState(e.target.value);
    };
    const queryResults = useRecoilValue(myQuery);
    // const setText = useSetRecoilValue(textState);
    // console.log('s;;;;', queryResults);
    
    return (
        <div>
            <Head>
                <title>setting-practice</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
            <h1>Profile</h1>
            <p>Hello, {name}</p>
            <p>name letter length is {charNumber} </p>
            
            <input
                type="text"
                name="name"
                id="input_name"
                onChange={updateName}
                placeholder="Enter your name"
            />
            <br/>
            <br/><br/><br/>
            <h1>영화 리스트 목록(리코일 방식 데이터 뿌리기)</h1>
            <br/>
            
            {
                queryResults.map((val)=>{
                    // console.log('val;;;', val);
                    return <div>{val.rank}, {val.movieNm}, {val.openDt}, {val.showCnt}</div>
                        
                })
            }

            
            
            
            </div>
        </div>
    );
}

export default Home;