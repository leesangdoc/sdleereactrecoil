import { atom, Loadable, RecoilValue, selector, useRecoilValue, WrappedValue } from 'recoil';
/**
 * 리코일 관련 문서: https://velog.io/@juno7803/Recoil-Recoil-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0
 * atom이 정확히 뭐임???
 * atom은 모든 구성 요소에서 설정하거나 쓸 수 있는 Recoil의 상태 조각을 나타냅니다. 
 * atoms (공유 상태)
 * atom 은 기존의 상태관리 라이브러리에서 쓰이는 store 와 유사한 개념, 상태단위 라고도 함.
 * atom이 업데이트 되면, 해당 atom을 구독하고 있던 모든 컴포넌트들의 state가 새로운 값으로 리렌더됨.
 * unique 한 id인 key로 구분되는 각 atom은, 여러 컴포넌트에서 atom을 구독하고 있다면 그 컴포넌트들도 똑같은 상태를 공유.
 * 아톰 공식문서 표현: An atom represents state in Recoil. The atom() function returns a writeable RecoilState object.
 * 
 * selectors (순수 함수)
 * selector는 '파생 상태'의 일부를 나타냅니다. 이름에서 알 수 있듯이 '파생 상태'는 다른 상태에서 파생된 상태입니다. 
 * 선택자는 읽을 수만 있고 직접 쓸 수는 없습니다. 파생된 상태의 값은 파생된 상태에만 의존합니다.
 * selector 는 derived state, 즉 파생된 state를 나타냄.
 * state를 그냥 가져오는 것이 아닌, get 프로퍼티를 통해 state를 가공하여 반환할 수 있습니다!
 * useRecoilCallback()
 * 셀렉터 공식문서 표현: A selector represents a piece of derived state
 * */
/**
 * export const githubRepo = selectorFamily({
  key: "github/get",
  get: (githubId) => async () => {
    if (!githubId) return "";

    const { data } = await axios.get(
      `https://api.github.com/repos/${githubId}`
    );
    return data;
  },
});
key : selector를 구분할 수 있는 유일한 id, 즉 key 값을 의미합니다.
get : 에는 derived state 를 return 하는 곳 입니다. 예시 코드에서는 api call을 통해 받아온 data를 return 하게 됩니다. (해당 selector가 갖고 있습니다.)

const cookie = useRecoilValue(selector)
다음과 같이 값을 조회할 수 있습니다.
set : writeable 한 state 값을 변경할 수 있는 함수를 return 하는 곳 입니다. 여기서 주의하실 점은, 자기 자신 selector를 set 하려고 하면, 스스로를 해당 set function에서 set 하는 것이므로 무한루프가 돌게 되니 반드시 다른 selector와 atom을 set 하는 로직을 구성하여야 합니다. 또한 애초에 selector는 read-only 한 return 값(RecoilValue)만 가지기 때문에 set으로는 writeable 한 atom 의 RecoilState 만 설정할 수 있습니다.

set: ({set}, newValue) =>{ set(getCookieSelector, newValue) } // incorrect : cannot allign itself
set: ({set}, newValue) =>{ set(cookieState, newValue) } // co
 */
const nameState = atom({
  key: 'nameState',
  default: '' as any,
});

const charState = selector({
  key: 'charState'
  , get: async ({get}) =>{
    try{
      const name = get(nameState);
      return name.length;
    } catch(err){
      throw err;
    }
  }
  , set: ({set}, newValue)=> {
    set(nameState, newValue)
  }
});

// 비동기 처리를 하는 recoil selector
// https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230129

const myQuery = selector({
  key: 'myQuery',
  get: async () => {
    let _a: string | any[] | RecoilValue<any[]> | Loadable<any[]> | WrappedValue<any[]> | PromiseLike<any[] | RecoilValue<any[]> | Loadable<any[]> | WrappedValue<any[]>> = [];
    const _address = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230129';
    await fetch(_address)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      _a = JSON.parse(JSON.stringify(myJson)).boxOfficeResult.dailyBoxOfficeList;
      return _a;
    });
    let result = _a;
    return result;
  },
});
/**
 * function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})  
 */
export { nameState, charState, myQuery };