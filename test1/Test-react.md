# React Documents

## Redux.md

### * 요약
 : store 를 통한 전역 state 사용 + reducer 함수에 action 을 전달하여 상태 수정

###### 과정
```text
Thunk -> dispatch -> action 생성 함수 -> action -> reducer -> store -> state 수정

* Thunk : dispatch 로 호출될 함수
```
###### useSelector(=조회)
```typescript
const param = useSelector((state: RootState) => state.reducer.param);
const { param, ... } = useSelector(
	(state: RootState) => ({ param: state.reducer.param, ... }),
	shallowEqual
);
```
```text
1. store(rootReducer = combineReducers) 에 등록된 명칭 사용
2. 객체 형태로 useSelector 를 가져오지 말 것(가져온다면 shallowEqual 사용)
```
###### useDispatch(=사용)

```typescript
const dispatch = useDispatch<AppDispatch>();
dispatch(thunk(param));
```
```text
1. Thunk 함수 호출(react-thunk 에서 dispatch 자동 제공)
2. dispatch(=action 생성 함수) 함수 호출 -> reducer 실행
3. reducer 를 통해 해당 action 에 맞춰 state 수정(...spread 를 통해 기존 불변성 유지)
```
###### useReducer(=개별)
```typescript
const initialState = { ...초기값 };
const [state, dispatch] = useReducer(reducer, initialState);
dispatch(actionCreator(param));
```
```text
1. store 없이 reducer 사용 및 state 조회 가능
2. ContextAPI 에서 함수형으로 주로 사용
```

---
### * Source
###### index.tsx
```typescript
/* index.tsx */
<Provider store={store}>
	<App />
</Provider>
```
###### store.ts
```typescript
/* store.ts */
const middlewares = [thunk.withExtraArgument({ history: history })];
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}
const composeEnhancers = 
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ ... })
		: compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export default createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
###### module.ts
```typescript
/* module.ts */
export const history = createBrowserHistory();
const rootReducer = combineReducers({ ...reducer, router: connectRouter(history) });
export default rootReducer;
```
###### actions.ts
```typescript
/* actions.ts */
export const ACTION1 = 'deps/ACTION1';
export const ACTION2 = 'deps/ACTION2';
export const ACTION3 = 'deps/ACTION3';

export const actionCreator1 = () => ({ type: ACTION1 });
export const actionCreator2 = () => ({ type: ACTION1, payload: { ... } });
export const actionCreator3 = param => ({ type: ACTION1, payload: param });
```
###### reducers.ts
```typescript
/* reducers.ts */
const initialState:  = { ...초기값 };
const reducer = (state = initialState: ResponseType, action) => {
	switch (action.type) {
        case ACTION1:
	        return { ...state };
		default:
            throw new Error();
}
export default reducer;
```
###### types.ts
```typescript
/* types.ts */
export type ResponseType = {
	response: {
		loading: string,
		error: Error | null;
		data: ApiResponse | null;
		...
	},
	...
}
```
###### thunks.ts
```typescript
/* thunks.ts */
export const thunk: ThunkAction<void, RootState, null, Action<string>> = 
	(param: any) => async dispatch => {
    dispatch({ type: ACTION1 })
    try {
        const payload = await api(param);
        // dispatch({ type: ACTION2, test: payload });
        dispatch(actionCreator3(payload));
    } catch (e) {
        dispatch({ type: ACTION3, test: e, error: true });
    }
}

export const callbackThunk = (type, callback) => {  // 커링 함수
	return param => async dispatch => {
        try {
			const payload = await callback(param);
            dispatch({ type, payload });
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true });
        }
    }
}
```
###### api.ts
```typescript
/* api.ts */
export const api = async (param: any) => {
	const response = await axios<ApiResponse>('url', param);
    return response.data;
}

export interface ApiResponse {
	id: number;
	namd: string;
	...
}
```
###### Containers.tsx
```typescript
/* Containers.tsx */
export default function Containers() {
	const { data } = useSelector((state: RootState) => ({ data: state.data }))
	const dispatch = useDispatch<AppDispatch>();
	const onEvent = (param: any) => {
		dispatch(thunk(param));
	}
	return (
        <>
            <Component onEvent={onEvent} />
            {param && <Component data={state.data} />}
        </>
    );
}
```

## RHF.md

- useForm
```TypeScript
const methods = useForm({
	resolver: zodResolver(schema),
	defaultValues,
});

1. register
2. formState
3. watch
4. subscribe
5. reset : defaultValues 로 초기화
6. setValue(name, value) : 특정 input 의 값 변경
7. setFocus(name) : 특정 input 에 focus
8. getValues() : form 의 모든 값 반환
9. getValues(name) : form 의 특정 input 값 반환
10. getValues([name...]) : form 의 여러 input 값 반환
11. trigger : 유효성 검증만 실행

// 필수: handleSubmit
```
- Controller
```TypeScript
// 필수: name, control, render
const {control} = useForm();
<Controller name={name} control={control} render={({ field, fieldState })} />

// name 은 useForm 에서 지정한 Type 의 명칭 및 타입으로만 가능
1. useForm 에 미설정 시, any 로 type 적용
2. type 지정 -> useForm<Type>();
3. type 생성 후 지정 -> type Type = zod.infer<typeof schema>; useForm<Type>();
4. 자동 지정 -> useForm({ resolver: zodResolver(schema) });

// render.field: ControllerRenderProps<FieldValues, TName>
export type ControllerRenderProps<
	TFieldValues extends FieldValues = FieldValues, 
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    value: FieldPathValue<TFieldValues, TName>;
    disabled?: boolean;
    name: TName;
    ref: RefCallBack;
};

// render.fieldState
export type ControllerFieldState = {
    invalid: boolean;  // 정합성 통과 여부
    isTouched: boolean;  // 필드 blur 여부
    isDirty: boolean;  // 필드 기존값 비교 여부(defaultValue 기준)
    isValidating: boolean;
    error?: FieldError;  // 정합성 통과 실패 시, error 정보
};

// render.formState
export type FormState<TFieldValues extends FieldValues> = {
    isDirty: boolean;  // form blur 여부
    isSubmitted: boolean;  // submit 시도 여부
    isSubmitSuccessful: boolean;  // submit 성공 여부
    isValid: boolean;  // 정합성 통과 여부(=trigger)
    disabled: boolean;  // form 사용 여부
    submitCount: number;  // submit 시도 횟수
    defaultValues?: undefined | Readonly<DeepPartial<TFieldValues>>;
    dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    validatingFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>;
    errors: FieldErrors<TFieldValues>;  // form 의 정합성 통과 실패 필드 배열 error 정보
	...
};
```
- useController
```TypeScript
// 필수: name, control
const { field, fieldState, formState } = useController({ name, control });

export declare function useController<
	TFieldValues extends FieldValues = FieldValues, 
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName>): UseControllerReturn<TFieldValues, TName>;

export type UseControllerReturn<
	TFieldValues extends FieldValues = FieldValues, 
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    field: ControllerRenderProps<TFieldValues, TName>;
    formState: UseFormStateReturn<TFieldValues>;
    fieldState: ControllerFieldState;
};
```
- UseControllerProps
```TypeScript
// 필수: name, control
// control 은 컴파일에선 에러 미발생, 런타임에서 에러 발생
export type UseControllerProps<
	TFieldValues extends FieldValues = FieldValues, 
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, 
	TTransformedValues = TFieldValues
> = {
    name: TName;
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 
	    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    shouldUnregister?: boolean;
    defaultValue?: FieldPathValue<TFieldValues, TName>;
    control?: Control<TFieldValues, any, TTransformedValues>;
    disabled?: boolean;
};
```
- ControllerProps
```TypeScript
// 필수: name, control, render
export type ControllerProps<
	TFieldValues extends FieldValues = FieldValues, 
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
	TTransformedValues = TFieldValues
> = {
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<TFieldValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<TFieldValues>;
    }) => React.ReactElement;
} & UseControllerProps<TFieldValues, TName, TTransformedValues>;
```

#### Tip
```
- form 관련 : useForm, FormProvider, useFormContext
- children 관련 : register, Controller, useController, useFieldArray
- 기타 : useFieldArray(form 의 input 값이 배열일 때(ex: select))
- 기타2: useWatch(아이디/패스워드 체크 등 실시간 체크 필요 시 -> Watch 는 지양)
	useWatch 와 달리 Watch 는 값이 변경될 때마다 리렌더링 발생(useRef <-> useState 유사)

1. `Controller` 컴포넌트 활용하기  
2. `useController` 훅 활용하기  
가독성이나 선호도 차이에 따라 위의 2가지 방법 중 선택해서 사용
```

## RTK.md

### * 요약
 : 기존 복잡한 redux 구조의 단순화 및 라이브러리 통합 패키지
 
###### 변화 과정
```text
1. redux : 모두 직접 생성
   => action, action 생성 함수, reducer, Action, ThunkAction
2. 라이브러리 사용
   => redux-actions, redux-thunk, immer, history
3. typesafe-actions 도입
   => ActionType, PayloadAction, AsyncActionCreator, 
   createAction, createReducer
4. RTK 도입
   => configureStore, createSlice, createAsyncThunk, 
   createEntityAdapter,createSelector
```
###### 주 기능
```text
** RTK
0. saga 를 제외한 모든 redux 라이브러리 기능 자동 탑재
   => redux-thunk(dispatch), immer(...state), history(Router v6 되며 Hook 으로 변경)
   => 각종 type 자동 지원(Action, Payload, Thunk, Async 등...)
1. configureStore : createStore 단순화
2. createAction : action(type) + action 생성 함수 자동 생성
3. createReducer : 만들어진 action 생성 함수(=thunk)의 reducer 자동 생성
4. createSlice : action + reducer 자동 생성 및 thunk 함수의 reducer 자동 생성
5. createAsyncThunk : 비동기 thunk 자동 생성
6. createEntityAdapter : thunk 의 CRUD 기능 단순화
7. createSelector : reselect 역할 수행(캐싱)
```

---
### * Source
###### index.tsx
```typescript
/* index.tsx */
<Provider store={store}>
	<App />
</Provider>
```
###### store.ts
```typescript
/* store.ts */
export default configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
```
###### module.ts
```typescript
/* module.ts */
const rootReducer = combineReducers({ ...reducer });
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
export const useAppSelector: TypedUseSelectorHook<RootState> = 
	(selector) => useSelector(selector, shallowEqual);
export const useAppDispatch: () => AppDispatch = useDispatch;
export default rootReducer;
```
###### services.ts
```typescript
/* services.ts */
// const initialState: ResponseType = { ... }
const slice = createSlice({
	name: '액션 type 접두사',
	initialState: { ...초기값 },
	reducers: { '리듀서명': { ... } },
	extraReducers: (builder) => {
        builder
            .addCase('참조할 thunk', (state, action) => { state = ... })
            .addCase(thunk.pending, (state) => { state = ... })
            .addCase(thunk.fulfilled, (state, action) => { state = ... })
            .addCase(thunk.rejected, (state) => { state = ... })
	}
});
export default slice;
```
###### types.ts
```typescript
/* types.ts */
export type ResponseType = {
	response: {
		loading: string,
		error: Error | null;
		data: null;
		...
	},
	...
}
```
###### thunks.ts
```typescript
/* thunks.ts */
export const thunk = createAsyncThunk(
	'액션 type 접두사',
	async(param: any, { rejectWithValue }) => {
		try {
            const payload = await api(param);
            return payload;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
```
###### api.ts
```typescript
/* api.ts */
export const api = async (param: any) => {
	const response = await axios('url', param);
    return response.data;
}
```
###### Containers.tsx
```typescript
/* Containers.tsx */
export default function Containers() {
	const { data } = useAppSelector((state) => ({ data: state.data }))
	const dispatch = useAppDispatch();
	const onEvent = (param: any) => {
		dispatch(thunk(param));
	}
	return (
        <>
            <Component onEvent={onEvent} />
            {param && <Component data={state.data} />}
        </>
    );
}
```

## RTK-query.md

### * 요약
 : Redux(RTK) 사용 시 React-query 와 거의 동일한 기능 수행
 
### RTK Query 장점

> 개인적으로 느낀 가장 큰 장점은 **state 변경에 따라 자동으로 다시 데이터를 불러오는 점이다!**

---
### * Source
###### index.tsx
```typescript
/* index.tsx */
// <ApiProvider api={api}>  // store 없이 api 사용 가능
<Provider store={store}>
	<App />
</Provider>
```
###### store.ts
```typescript
/* store.ts */
export default configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
	    getDefaultMiddleware().concat(apiMiddleware),
});
```
###### module.ts
```typescript
/* module.ts */
const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
});

export const apiMiddleware = [
    apiSlice.middleware,
];

export default rootReducer;
```
###### apiSlice.ts
```typescript
/* apiSlice.ts */
const baseUrl = 'url';

export const apiSlice = createApi({
	// reducerPath: 'apiSlice',  // 생략 시 변수명과 동일
    baseQuery: fetchBaseQuery({ baseUrl }),
	headers: { 'Accept': 'application/json' },
	/*prepareHeaders: (headers, { getState, endpoint, type, forced }) => {
		headers.set('Accept', `application/${getState}/${endpoint}`);
		return headers;
	}}),*/
    tagTypes: ApiSliceType,
    endpoints: builder => ({}),
});
```
###### types.ts
```typescript
/* ApiSliceType.ts */
export type ResponseType = {
	response: {
		loading: string,
		error: Error | null;
		data: null;
		...
	},
	...
}

export const ApiSliceType: string[] = [
    'string',
    ...
});
```
###### api.ts
```typescript
/* api.ts */
export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		get리듀서: builder.query<ResponseType, paramType>({
			query: (param) => ({ url: '/url' }),
			providesTags: ['태그명'],
			keepUnusedDataFor: 60,
		}),
		findAll리듀서: builder.query({ ... }),
		CRD리듀서: builder.mutation({
			query: (param: any) => ({
				method: 'POST',
				url: '/url',
				body: param,
			}),
			invalidatesTags: ['태그명'],
			// invalidatesTags: (result) => (result ? ['태그명'] : []),
		}),
		refetchErroredQueries: builder.mutation<null, void>({
            queryFn: () => ({ data: null }),
            invalidatesTags: ['UNKNOWN_ERROR'],
        }),
        refetchOnFocus: false,  // React-query 와 동일한 옵션
        ...
	})
});

// 자동으로 'use' + endpoints + 'Query' 로 thunk 생성
export const { useGet리듀서Query, useCRD리듀서Query } = api;
```
###### Containers.tsx
```typescript
/* Containers.tsx */
export default function Containers({ param=default }: { param: paramType }) {
	const [state, setState] = useState(param);
	
	/*const { data, ... } = useApiQuery(state, {
		selectFromResult: ({ data }) => ({ data: data?.filter(...) }),
		pollingInterval: 0,
		skip: false,
	});*/
	// const { data, ... } = useApiQuery(undefined);
	const { data, ... } = useApiQuery(state);

	const onEvent = (param: any) => {
		dispatch(api.endpoints.리듀서.initiate( 
			param, 
			{ subscribe: false, forceRefetch: true }
		));
	}
	
	return (
        <>
            <Component onEvent={onEvent} />
            {param && <Component data={data} />}
        </>
    );
}
```

## React.md

### * 요약
 : 
 
```Link
https://ykss.netlify.app/translation/react_libraries_for_2024/
```

<h2>React-router-dom.md</h2>

### * 주 변경점

###### 기존
```text
1. BrowserRouter
2. <Switch>
	   <Route path="/" component={Home} exact={true} />
	</Switch>
3-1. export default function Component({location, search, match, history}) => { ... }
3-2. usehistory, useRouteMatch
4. <NavLink style={{ css }} activeStyle={{ css }}>
   <NavLink className="nav-link" activeClassName="activated">
5. <Redirect to="/" />
```
###### 변경
```text
0. bundle 사이즈 감소 -> 약 70% 감소
1. BrowserRouter
2. <Routes>
	   <Route path="/*" element={<Home />} />
	</Routes>
3. useParams, useLocation, useSearchParams, useNavigate, useMatch
4. <NavLink style={({ isActive }) => ({ isActive ? css : css })}>
   <NavLink className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
5. <Navigate replace to="/" />
```

---
###### 참조
[React-router-dom 공식문서 정리 (1)](https://velog.io/@saiani1/React-router-dom)
[React-router-dom 공식문서 정리 (2)](https://velog.io/@saiani1/React-router-dom-공식문서-정리-2)
[React-router-dom 공식문서 정리 (3)](https://velog.io/@saiani1/React-router-dom-공식문서-정리-3)
[React-router-dom 공식문서 정리 (4)](https://velog.io/@saiani1/React-router-dom-공식문서-정리-4)
```text
그 외 변경사항이 너무 많으므로 링크 참조

(1) Routes
1. createBrowserRouter
2. createHashRouter
3. createMemoryRouter
4. MemoryRouter
5. NativeRouter
6. RouterProvider
7. Route
8. action
9. errorElement
10. hydrateFallbackElement
11. lazy
12. Multiple Routes in a single file (단일 파일에 여러 경로 포함)
13. loader
14. shouldRevalidate

(2) Components
1. Await
2. Form
3. Link
4. NavLink
5. Navigate
6. Outlet

(3) Hooks
1. useActionData
2. useAsyncError
3. useAsyncValue
4. useBeforeUnload
5. useFetcher
6. useFetchers
7. useFormAction
8. useHref
9. useInRouterContext
10. useLinkClickHandler
11. useLoaderData
12. useLocation
13. useMatch
14. useMatches
15. useNavigate
16. useNavigation
17. useNavigationType
18. useOutlet
19. useOutletContext

(4) Hooks + Fetch Utilities
20. useParams
21. useBlocker
22. useResolvedPath
23. useRevalidator
24. useRouteError
25. useRouteLoaderData
26. useRoutes
27. useSearchParams
28. useSubmit

1. json
2. redirect
3. redirectDocument
```

## React-query(v5).md

### * 요약
 : 캐싱, CRUD 등 서버 상태 관리에 용이한 비동기 작업 라이브러리

[참조](https://www.heropy.dev/p/HZaKIE)

```Link
https://www.heropy.dev/p/HZaKIE
https://kyung-a.tistory.com/40

- 캐싱이란? → 자주 사용하는 데이터의 복사본을 저장한다 (앱 처리 속도를 높여줌)
- 리패칭이란? → 데이터를 다시 가져옴

* Refetching 이 일어나는 경우
1. 런타임에 stale인 특정 쿼리 인스턴스(객체)가 다시 만들어졌을때
2. 페이지를 이동했다가 왔을때
3. window가 다시 포커스가 되었을때 (옵션 설정 가능)
4. 네트워크가 다시 연결되었을 때 (옵션 설정 가능)
5. refetch interval(리패칭 간격)이 있을때
    - 요청 실패한 쿼리는 기본으로 3번 더 백그라운드단에서 요청하며,
    - retry, retryDelay 옵션으로 간격과 횟수를 커스텀 가능하다

https://github.com/ssi02014/react-query-tutorial
https://beomy.github.io/tech/react/tanstack-query-v5-api-reference
https://velog.io/@eunbinn/introducing-tanstack-router
```

## React-query(v3 → v4).md


[참조](https://github.com/ssi02014/react-query-tutorial/blob/main/document/v4.md)
# 💻 Migrating to TanStack Query(React) v4

![스크린샷 2022-08-17 오후 2 20 01](https://user-images.githubusercontent.com/64779472/185040681-2352e8c8-b2d7-40f7-893d-3ee2270904c9.png)

- TanStack Query(React Query v4)가 정식 릴리즈되면서 v3와 비교해서 주요 변경사항 정리 문서입니다.
- [TanStack Query(React Query v4) 공식 문서](https://tanstack.com/query/v4)
- [TanStack Query(React Query v4) migration 공식 문서](https://tanstack.com/query/v4/docs/framework/react/guides/migrating-to-react-query-4)

<br />

## 📃 주요 변경 사항

### @tanstack/react-query

- v4부터 react-query에서 `@tanstack/react-query`로 패키지가 변경되었습니다. 따라서 설치와 import 할 때 주의해야 합니다.

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
# or
$ yarn add @tanstack/react-query
```

- 또한, Devtools는 별도의 패키지 설치가 필요합니다.

```bash
$ npm i @tanstack/react-query-devtools
# or
$ pnpm add @tanstack/react-query-devtools
# or
$ yarn add @tanstack/react-query-devtools
```

- import 시, 다음과 같이 패키지명을 수정하면 됩니다.

```diff
// v3
- import { useQuery } from "react-query";
- import { ReactQueryDevtools } from "react-query/devtools";

// v4
+ import { useQuery } from "@tanstack/react-query";
+ import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

<br />

### 쿼리 키는 배열로 통일

- v3에서는 queryKey를 문자열 또는 배열로 지정할 수 있었습니다. 문자열과 배열 모두 사용할 수 있었는데, 사실 React Query는 내부적으로는 항상 Array Keys로만 작동했습니다. 그리고 이를 v4에서는 배열로 통일하였습니다.

```diff
// v3
- useQuery("todos", fetchTodos);

// v4
+ useQuery(["todos"], fetchTodos);
```

<br />

### status idle 상태 제거

- v4부터 더 나은 오프라인 지원을 위한 `fetchStatus`가 도입되면서 기존의 `idle`이 무의미해졌습니다.

```diff
// v3
- status: "idle";

// v4
+ status: "loading";
+ fetchStatus: "idle";
```

<br />

### fetchStatus가 추가

- [FetchStatus](https://tanstack.com/query/v4/docs/guides/queries#why-two-different-states)
- TanStack Query(v4) 새로운 상태값인 `fetchStatus`가 추가되었습니다.
- fetchStatus
  - fetching: 쿼리가 현재 실행 중입니다.
  - paused: 쿼리를 요청했지만, 잠시 중단된 상태입니다.
  - idle: 쿼리가 현재 아무 작업도 수행하지 않고 있습니다.

<br />

### 왜 status, fetchStatus 나눠서 다루는 걸까?

- fetchStatus는 HTTP 네트워크 연결 상태와 좀 더 관련된 상태 데이터입니다.
  - 예를 들어, status가 `success` 상태라면 주로 fetchStatus는 `idle` 상태지만, 백그라운드에서 re-fetch가 발생할 때 `fetching` 상태일 수 있습니다.
  - status가 보통 `loading` 상태일 때 fetchStatus는 주로 `fetching`를 갖지만, 네트워크 연결이 되어 있지 않은 경우 `paused` 상태를 가질 수 있습니다.
- 정리하자면 아래와 같다.

  - status는 `data`가 있는지 없는지에 대한 상태입니다.
  - fetchStatus는 쿼리 즉, `queryFn 요청`이 진행중인지 아닌지에 대한 상태입니다.

- [why-two-different-states](https://tanstack.com/query/v4/docs/react/guides/queries#why-two-different-states)

<br />

### useQueries

- v4부터 `useQueries`는 인자로 `queries` 프로퍼티를 가진 객체를 넘겨줄 수 있습니다.
- `queries`의 값은 쿼리 배열인데, 이는 v3에서 useQueries에게 넘겨주던 쿼리 배열과 동일합니다.

```js
// v3
useQueries([
  { queryKey1, queryFn1, options1 },
  { queryKey2, queryFn2, options2 },
]);

// v4
useQueries({
  queries: [
    { queryKey1, queryFn1, options1 },
    { queryKey2, queryFn2, options2 },
  ],
});
```

<br />

### networkMode

- 기본적으로 react-query는 promise를 반환하는 모든 것에 사용할 수 있는 비동기 상태 관리 라이브러리이며, 이는 axios와 같은 data fetching 라이브러리와 가장 많이 사용됩니다.
- 그렇기 때문에 네트워크 연결이 없는 경우 기본적으로 query와 mutation이 일시중지 됩니다. 이때, 이전 동작을 실행하려면 `networkMode`를 설정해주면 됩니다.

```js
new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst", // (+)
    },
    mutations: {
      networkMode: "offlineFirst", // (+),
    },
  },
});
```

- networkMode의 설정값은 3가지가 있습니다.
  - online: 오프라인 상태에서 network 연결이 있기 전까지 fetch를 하지 않고, 이때 쿼리의 상태를 `fetchStatus:paused`로 표시합니다.
  - always: 오프라인 상태에서도 온라인처럼 fetch를 시도합니다. 오프라인 상태에서 요청을 보내는 것이니 `status:error` 상태가 됩니다.
  - offlineFirst: `v3`에서의 동작과 같습니다. queryFn 최초 호출 후 retry를 멈춥니다.

<br />

### Query Filters

- query filter는 query와 일치하는 특정 조건을 가진 객체입니다.
- 지금까지 필터 옵션은 대부분 boolean flag 조합이었습니다. 하지만 이러한 flag를 조합하면 `불가능한 상태`가 발생할 수 있습니다.

```
active?: boolean
  - When set to true it will match active queries.
  - When set to false it will match inactive queries.
inactive?: boolean
  - When set to true it will match inactive queries.
  - When set to false it will match active queries.
```

- 예를 들어 위와 같은 `active`, `inactive` 두 옵션은 서로 `상호 배타적`입니다. 이 둘 모두를 false으로 설정한다면? 이는 말이 되지 않습니다.
- v4부터는 이를 type이라는 속성으로 통일시켜서 의도를 더 잘 보여줄 수 있게 되었습니다.

```diff
// v3
- active?: boolean
- inactive?: boolean

// v4
+ type?: 'active' | 'inactive' | 'all'
```

- type 속성은 기본적으로 `all`로 설정되며, active 또는 inactive 쿼리만 일치하도록 선택할 수 있습니다.

```js
// Cancel all queries
await queryClient.cancelQueries()
​
// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })
​
// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })
​
// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

<br />

### React18 지원

- v4는 `React18`에대한 최고 수준의 지원과 함께 새로운 기능을 제공합니다.

<br />

### 타입스크립트

- [v4는 TypeScript `v4.1` 이상을 요구합니다.](https://tanstack.com/query/v4/docs/react/guides/migrating-to-react-query-4#typescript)

<br />

## React-query(v4 → v5).md


[참조](https://github.com/ssi02014/react-query-tutorial/blob/main/document/v5.md)
# 💻 Migrating to TanStack Query(React) v5

## 📄 주요 변동 사항 (⭐️ 중요)

### 1. ⭐️ Supports a single signature, one object

- `useQuery`, `useInfiniteQuery`, `useMutation`이 이제는 객체 형식만 지원하도록 변경되었습니다.
- v4에서는 `useQuery(key, fn, options)`, `useQuery({ queryKey, queryFn, ...options })` 두 형태를 모두 지원했는데 이는 유지보수가 힘들고, 매개 변수 타입을 확인하기 위한 런타임 검사도 필요했기 때문에 오로지 `객체` 형식만 지원하도록 v5에서 변경되었습니다.

```diff
- useQuery(key, fn, options)
+ useQuery({ queryKey, queryFn, ...options })
- useInfiniteQuery(key, fn, options)
+ useInfiniteQuery({ queryKey, queryFn, ...options })
- useMutation(fn, options)
+ useMutation({ mutationFn, ...options })
- useIsFetching(key, filters)
+ useIsFetching({ queryKey, ...filters })
- useIsMutating(key, filters)
+ useIsMutating({ mutationKey, ...filters })
```

```diff
- queryClient.isFetching(key, filters)
+ queryClient.isFetching({ queryKey, ...filters })
- queryClient.ensureQueryData(key, filters)
+ queryClient.ensureQueryData({ queryKey, ...filters })
- queryClient.getQueriesData(key, filters)
+ queryClient.getQueriesData({ queryKey, ...filters })
- queryClient.setQueriesData(key, updater, filters, options)
+ queryClient.setQueriesData({ queryKey, ...filters }, updater, options)
- queryClient.removeQueries(key, filters)
+ queryClient.removeQueries({ queryKey, ...filters })
- queryClient.resetQueries(key, filters, options)
+ queryClient.resetQueries({ queryKey, ...filters }, options)
- queryClient.cancelQueries(key, filters, options)
+ queryClient.cancelQueries({ queryKey, ...filters }, options)
- queryClient.invalidateQueries(key, filters, options)
+ queryClient.invalidateQueries({ queryKey, ...filters }, options)
- queryClient.refetchQueries(key, filters, options)
+ queryClient.refetchQueries({ queryKey, ...filters }, options)
- queryClient.fetchQuery(key, fn, options)
+ queryClient.fetchQuery({ queryKey, queryFn, ...options })
- queryClient.prefetchQuery(key, fn, options)
+ queryClient.prefetchQuery({ queryKey, queryFn, ...options })
- queryClient.fetchInfiniteQuery(key, fn, options)
+ queryClient.fetchInfiniteQuery({ queryKey, queryFn, ...options })
- queryClient.prefetchInfiniteQuery(key, fn, options)
+ queryClient.prefetchInfiniteQuery({ queryKey, queryFn, ...options })
```

```diff
- queryCache.find(key, filters)
+ queryCache.find({ queryKey, ...filters })
- queryCache.findAll(key, filters)
+ queryCache.findAll({ queryKey, ...filters })
```

<br />

### 2. ⭐️ 'queryClient.getQueryData', 'queryClient.getQueryState' now accepts queryKey only as an Argument

- `queryClient.getQueryData`의 인수가 `queryKey`만 받도록 v5에서 수정되었습니다.

```diff
- queryClient.getQueryData(queryKey, filters)
+ queryClient.getQueryData(queryKey)
```

- 마찬가지로 `queryClient.getQueryState`도 인수가 `queryKey`만 받도록 v5에서 수정되었습니다.

```diff
- queryClient.getQueryState(queryKey, filters)
+ queryClient.getQueryState(queryKey)
```

<br />

### 3. ⭐️ Callbacks on useQuery (and QueryObserver) have been removed

- useQuery의 옵션인 `onSuccess`, `onError`, `onSettled`가 제거되었습니다.
  - 해당 콜백 함수들은 간단하고, 직관적이라 굉장히 유용하지만 버그를 유발 할 수 있습니다.
- 자세한 내용은 Tanstack Query maintainer인 [tkdodo 블로그 포스팅](https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose)을 참고해주시기 바랍니다.

<br />

### 4. The 'remove' method has been removed from useQuery

- useQuery의 `remove` 메서드가 제거되었습니다. 이전에는 `remove` 메서드는 observer에게 알리지 않고 쿼리를 queryCache에서 제거하는데 사용했습니다.
  - 예를 들어, 사용자를 로그아웃 할 때와 같이 더 이상 필요하지 않은 데이터를 제거할 때와 같은 경우에 활용 할 수 있는 메서였습니다.
- 하지만, query가 아직 활성화된 상태에서 이 `remove` 메서드를 호출하는 것은 다음 번 리렌더링 할 때 `hard loading 상태`를 트리거하기 때문에 합리적이지 못합니다.

  - 여기서, `hard loading 상태`란? 데이터가 없는 즉, 초기 데이터를 불러올 때 로딩 상태를 말합니다.
  - useQuery에서 자주 사용하는 `isLoading`이 이런 `hard loading 상태`인 경우에만 `참(true)`입니다.
  - [When we refetch a query, it doesn't set isLoading true.](https://github.com/TanStack/query/issues/2559#issuecomment-896622341)

- 하지만!! 그럼에도 불구하고 쿼리를 제거해야 된다면 `queryClient.removeQueries`를 사용하면 됩니다.

```diff
const queryClient = useQueryClient();
const query = useQuery({ queryKey, queryFn });
- query.remove()
+ queryClient.removeQueries({ queryKey })
```

<br />

### 5. The 'isDataEqual' option has been removed from useQuery

- `isDataEqual` 함수는 query에서 resolved된 데이터로서 이전 데이터를 사용할지 아니면 새 데이터를 사용할지 확인하는데 사용했습니다.
- 이제는 `isDataEqual`을 사용하지 않고, 동일한 기능으로서 `structuralSharing`으로 활용할 수 있습니다.

```diff
import { replaceEqualDeep } from '@tanstack/react-query'

- isDataEqual: (oldData, newData) => customCheck(oldData, newData)
+ structuralSharing: (oldData, newData) => customCheck(oldData, newData) ? oldData : replaceEqualDeep(oldData, newData)
```

<br />

### 6. ⭐️ Rename 'cacheTime' to 'gcTime'

- `cacheTime`이 `gcTime`으로 변경되었습니다.
  - 네이밍이 변경된 이유는 많은 사람들이 `cacheTime`을 마치 "데이터가 캐시되는 시간"으로 착각하기 때문입니다.
  - 하지만, 실제로 query가 계속 사용되는 한`cacheTime`은 아무 일도 하지 않고, query가 더이상 사용되지 않는 시점에 시작됩니다. 그리고 `cacheTime` 시간이 지나면 캐시가 더이상 커지는 것을 방지하기 위해 데이터는 `garbage collected`됩니다.
- 따라서, 의미상의 혼동을 줄이기 위해 `cacheTime`에서 `gcTime`으로 변경되었습니다.

```diff
const MINUTE = 1000 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
-      cacheTime: 10 * MINUTE,
+      gcTime: 10 * MINUTE,
    },
  },
})
```

<br />

### 7. ⭐️ The 'useErrorBoundary' option has been renamed to 'throwOnError'

- 기존에 `ErrorBoundary`에 에러를 던지기 위해 사용했던 옵션인 `useErrorBoundary`를 특정 프레임워크에 종속되지 않으면서, 리액트 커스텀 훅의 접미사인 `use`와 `ErrorBoundary` 컴포넌트명과 혼동을 피하기 위해, `throwOnError`로 변경됐습니다.

```diff
const todos = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
-  useErrorBoundary: true,
+  throwOnError: true,
})
```

<br />

### 8. ⭐️ TypeScript: 'Error' is now the default type for errors instead of 'unknown'

- v5 부터는 error의 기본 타입이 `Error` 입니다. 변경된 이유는 많은 사용자들이 기대하는 결과이기 때문입니다.

```tsx
// const error: Error
const { error } = useQuery({
  queryKey: ["groups"],
  queryFn: fetchGroups,
});
```

- 만약 `커스텀 에러`를 활용하거나 `Error`가 아닌 것을 활용하고 싶다면, 아래 예제처럼 타입을 구체화할 수 있습니다.

```tsx
// const error: string | null
const { error } = useQuery<Group[], string>({
  queryKey: ["groups"],
  queryFn: fetchGroups,
});
```

<br />

### 9. ⭐️ Removed 'keepPreviousData' in favor of 'placeholderData' identity function

- ​`keepPreviousData` 옵션과 `isPreviousData` 플래그가 제거되었습니다.
  - 왜냐하면 이들은 각각 `placeholderData`와 `isPlaceholderData 플래그와 거의 유사하게 동작하기 때문입니다.
- 아래 예제는 `placeholderData`를 활용하면서 이전에 `keepPreviousData` 옵션을 `true`로 줬을때와 동일한 기능을 수행하기 위해 `identity function`을 허용하는 `placeholderData`에 Tanstack Query에 포함된 `keepPreviousData` 함수를 추가하였습니다.

```diff
import {
   useQuery,
+  keepPreviousData
} from "@tanstack/react-query";

const {
   data,
-  isPreviousData,
+  isPlaceholderData,
} = useQuery({
  queryKey,
  queryFn,
- keepPreviousData: true,
+ placeholderData: keepPreviousData
});
```

- 또는, 직접 `identity function`을 제공하는 방법도 있습니다.

```tsx
useQuery({
  queryKey,
  queryFn,
  placeholderData: (previousData, previousQuery) => previousData,
  // identity function with the same behaviour as `keepPreviousData`
});
```

- 여기서 위 변경사항에는 몇 가지 주의사항이 있습니다.

  - `placeholderData`는 항상 `success` 상태를 유지하며, keepPreviousData는 이전 쿼리 상태를 알려줍니다. 데이터를 성공적으로 가져온 후 `background refetch error`가 발생하면 `placeholderData`의 `success` 상태는 오류라고 느낄 수 있습니다. 하지만 에러 자체가 공유되지 않기 때문에 `placeholderData의` 동작은 그대로 유지하기로 결정됐습니다.

  - `keepPreviousData`를 사용할 때는 이전 데이터의 `dateUpdatedAt` 타임 스탬프가 제공되었는데, `placeholderData`를 사용하면 `dateUpdatedAt`은 `0`으로 유지됩니다.

  - 만약, 타임스탬프를 화면에 계속 보여주고 싶다면 이런 동작이 불만족스러울 수 있습니다. 이러한 문제는 아래와 같이 `useEffect`를 활용하면 해결할 수 있습니다.

```tsx
const [updatedAt, setUpdatedAt] = useState(0);

const { data, dataUpdatedAt } = useQuery({
  queryKey: ["projects", page],
  queryFn: () => fetchProjects(page),
});

useEffect(() => {
  if (dataUpdatedAt > updatedAt) {
    setUpdatedAt(dataUpdatedAt);
  }
}, [dataUpdatedAt]);
```

<br />

### 10. ⭐️ Window focus refetching no longer listens to the 'focus' event

- Tanstack Query는 `visibilitychange` 이벤트를 지원하는 브라우저만 지원하도록 결정됐습니다. 따라서, 이제 `visibilitychange` 이벤트만 독점적으로 사용됩니다.
- 이를 통해 다음 [focus 관련 문제](https://github.com/TanStack/query/pull/4805)가 해결되었습니다.

<br />

### 11. Removed custom 'context' prop in favor of custom 'queryClient' instance

- 커스텀 queryClient 인스턴스를 위해 커스텀 `context` prop이 제거되었습니다.
- 기존 v4에서는 `context`를 모든 react query hooks에 전달할 수 있는 방법을 제공했습니다. 이는 `MicroFrontends`를 사용할 때 적절하게 격리할 수 있게 했습니다.
- 하지만, 다들 알다싶이 `context`는 리액트에서만 사용 가능한 기능입니다. `context`는 que`ryClient에 대한 접근 권한을 주는 역할을 할 뿐입니다.
- v5에서는 위와 동일한 기능을 아래 예제처럼 커스텀 queyClient를 `직접` 전달함으로써 해결했습니다. 이제는 어떤 다른 프레임워크에 구애받지 않고 동일한 기능을 사용할 수 있습니다.

```diff
import { queryClient } from './my-client'

const { data } = useQuery(
  {
    queryKey: ['users', id],
    queryFn: () => fetch(...),
-   context: customContext
  },
+  queryClient,
)
```

<br />

### 12. ⭐️ Removed 'refetchPage' in favor of 'maxPages'

- `maxPages`를 위해 `refetchpage`를 제거하였습니다.
- v4에서는 `refetchPage` 함수를 사용하여 infinite queries에 대해 refresh 할 페이지를 정의할 수 있는 기능을 제공했습니다.
- 그러나 모든 페이지를 refresh 하면 UI 불일치가 발생할 수 있습니다. 또한 이 옵션은 `queryClient.refetchQueries`에서 사용할 수 있지만 `nomal queries`가 아닌 `infinite queries`에대해서만 동작합니다.
- v5에서는 `query data`를 저장하고, 다시 가져올 수 있는 페이지 수를 제한하는 `infinite queries`를 위한 새로운 `maxPages` 옵션이 포함되어 있습니다.

```tsx
useInfiniteQuery({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  maxPages: 3,
});
```

- `infinite queries`는 많은 페이지를 가져올수록 더 많은 메모리를 사용하게 되며, 모든 페이지를 순차적으로 다시 가져오기 때문에 `query refetching` 프로세스도 느려집니다.
- `maxPages`를 활용하면 페이지 수를 제한하고 이후에 다시 가져올 수 있기 때문에 이런 단점을 보완할 수 있습니다. 참고로 `infinite list`는 `양방향`이여야 하기 때문에 위 예제처럼 `getNextPageParam`과 `getPreviousPageParam`을 모두 정의해야 한다는 점을 주의해야 합니다.

<br />

### 13. ⭐️ infinite queries now need a 'initialPageParam'

- 이전에는 `undefined` 값을 가진 `pageParam`을 `queryFn`에 전달했고, `queryFn`에서 `pageParam`에 대한 기본 값을 정의했습니다. 하지만 이런 경우 직렬화 할 수 없는 쿼리 캐시에 `undefined`인 상태로 저장된다는 단점이 있습니다.
- v5부터는 아래 예제처럼 `infinite Query` 옵션에 명시적인 `initialPageParam`을 전달해야 합니다.

```diff
useInfiniteQuery({
   queryKey,
-  queryFn: ({ pageParam = 0 }) => fetchSomething(pageParam),
+  queryFn: ({ pageParam }) => fetchSomething(pageParam),
+  initialPageParam: 0,
   getNextPageParam: (lastPage) => lastPage.next,
})
```

<br />

### 14. Manual mode for infinite queries has been removed

- 이전에는 아래 예제처럼 `pageParams` 값을 수동적으로 `fetchNextPage` 또는 `fetchPreviousPage`에 직접 전달하여 `getNextPageParam` 또는 `getPreviousPageParam`에서 반환되는 `pageParam`를 덮어쓰는 것이 허용되었습니다.

```tsx
// v4
function Projects() {
  const fetchProjects = ({ pageParam = 0 }) =>
    fetch("/api/projects?cursor=" + pageParam);

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  // Pass your own page param
  const skipToCursor50 = () => fetchNextPage({ pageParam: 50 });
}
```

- 하지만 이 `pageParam`을 덮어쓰는 기능은 `refetch`에서는 전혀 작동하지 않았고, 많은 사람들이 사용하는 기능이 아니였습니다. 즉, `infinite queries`에서 `getNextPageParam`이 필수적임을 의미합니다.

<br />

### 15. ⭐️ Returning 'null' from 'getNextPageParam' or 'getPreviousPageParam' now indicates that there is no further page available

- v4에서는 더 이상 페이지 없음을 나타내기 위해 명시적으로 `undefined`를 반환해야 했습니다. v5부터는 `undefined` 뿐만 아니라 `null`까지 포함하도록 확장됐습니다.

```tsx
getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
  TPageParam | undefined | null;

getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
  TPageParam | undefined | null;
```

<br />

### 16. No retries on the server

- 서버에서 retry의 기본 값은 `3`이 아닌 `0`입니다.
- `prefetching`의 경우 항상 기본값이 0이였지만, `suspense`가 활성화된 쿼리는 이제 서버에서도 직접 실행할 수 있기 때문에(React v18 이후) 서버에서 재시도를 전혀 하지 않도록 해야합니다.

<br />

### 17. ⭐️ 'status: loading' has been changed to 'status: pending' and 'isLoading' has been changed to 'isPending' and 'isInitialLoading' has now been renamed to 'isLoading'

- `loading` 옵션이 `pending`으로 변경되었으며, 마찬가지로 `isLoading` 플래그가 `isPending`으로 변경되었습니다.

```tsx
isPending: boolean;
// A derived boolean from the status variable above, provided for convenience.
isSuccess: boolean;
// A derived boolean from the status variable above, provided for convenience.
isError: boolean;
// A derived boolean from the status variable above, provided for convenience.
```

- `mutation`의 경우에도 `isLoading` 플래그가 `isPending`으로 변경되었습니다.

```tsx
status: string;
/*
  Will be:
    - 'idle' initial status prior to the mutation function executing.
    - 'pending' if the mutation is currently executing.
    - 'error' if the last mutation attempt resulted in an error.
    - 'success' if the last mutation attempt was successful.
  'isIdle', 'isPending', 'isSuccess', 'isError': boolean variables derived from 'status'
 */
```

- 그리고 `isPending && isFetching`으로 구현되는 새로운 `isLoading` 플래그가 추가되었습니다.
- 이는 기존의 `isInitialLoading`과 동일한 기능을 하는데, `isInitialLoading`은 더 이상 사용되지 않으며 다음 메이저 버전 업데이트에서 제거될 예정입니다.

<br />

### 18. Simplified optimistic updates

- v5부터는 낙관적 업데이트를 수행하는 단순한 방법을 제공합니다.

```tsx
const queryInfo = useTodos();
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post("/api/data", { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
});

if (queryInfo.data) {
  return (
    <ul>
      {queryInfo.data.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
      {addTodoMutation.isPending && (
        <li key={String(addTodoMutation.submittedAt)} style={{ opacity: 0.5 }}>
          {addTodoMutation.variables}
        </li>
      )}
    </ul>
  );
}
```

- 위 예제에서는 데이터를 캐시에 직접 쓰는 대신에 `mutation`이 실행중일 때 UI가 표시되는 방식만 변경합니다. 해당 방법은 `낙관적 업데이트`를 표시해야 하는 위치가 한 곳만 있는 경우에 효과적입니다.
- `낙관적 업데이트`와 관련된 자세한 내용은 [optimistic-updates](https://tanstack.com/query/v5/docs/react/guides/optimistic-updates)를 참고해주시길 바랍니다.

<br />

### 19. Infinite Queries can prefetch multiple Pages

- 이제 `infinite queries`도 `normal queries`처럼 `prefetch` 할 수 있습니다.
- 기본적으로 `query`의 첫 번째 페이지만 `prefetch`되며 지정된 `queryKey` 아래에 저장됩니다. 두 개 이상의 페이지를 미리 가져오려면 `pages` 옵션을 사용하면 됩니다.
- `prefetch`와 관련된 자세한 내용은 [prefetching](https://tanstack.com/query/v5/docs/react/guides/prefetching)를 참고해주시길 바랍니다.

```tsx
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3, // prefetch the first 3 pages
  });
};
```

<br />

### 20. new 'combine' option for 'useQueries'

- `useQueries` 결과 데이터를 단일 값으로 결합하려면 `combine` 옵션을 사용할 수 있습니다.

```tsx
const ids = [1,2,3]
const combinedQueries = useQueries({
  queries: ids.map(id => (
    { queryKey: ['post', id], queryFn: () => fetchPost(id) },
  )),
  combine: (results) => {
    return ({
      data: results.map(result => result.data),
      pending: results.some(result => result.isPending),
    })
  }
})
```

- 위 예제에서는 `combinedQueries`는 `data`와 `pending` 속성이 있는 객체가 됩니다. 쿼리 결과의 다른 모든 속성은 손실된다는 점을 주의해야 됩니다.

<br />

### ​21. ⭐️ new hooks for suspense

- v5에서는 `data fetching`에 대한 `suspense`가 마침내 안정화되었습니다.
- `useSuspenseQuery`, `useSuspenseInfiniteQuery`, `useSuspenseQueries` 3가지 훅이 추가되었습니다.
- 위 3가지 훅을 사용하게 되면 타입 레벨에서 `data`가 `undefined` 상태가 되지 않습니다.

```tsx
import { useSuspenseQuery } from "@tanstack/react-query";

const { data } = useSuspenseQuery({ queryKey, queryFn });
```

- suspense와 관련된 자세한 내용은 [suspense](https://tanstack.com/query/v5/docs/react/guides/suspense)를 참고해주시길 바랍니다.

<br />

### 22. ⭐️ The minimum required TypeScript version is now 4.7

- Tanstack Query v5는 필요한 TypeScript 최소 버전이 `v4.7`입니다.

<br />

### 23. ⭐️ The minimum required React version is now 18.0

- Tanstack Query v5는 필요한 React 최소 버전이 `v18.0`입니다. 이는 React v18 이상에서만 사용할 수 있는 `useSyncExternalStore` 훅을 사용하고 있기 때문입니다.

<br />

### 24. ⭐️ Supported Browsers

```
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
opera >= 77
```

## React-hook-form(RHF).md

### * 요약
 : <Form> 태그 관련 특화 라이브러리

```Link
https://mycodings.fly.dev/blog/2023-09-10-all-in-one-about-react-hook-form
https://mycodings.fly.dev/blog/2023-09-11-enhanced-tutorial-of-react-hook-form

(유효성 검증) https://jjang-j.tistory.com/59
(FormProvider) https://jjang-j.tistory.com/61
(useForm Props) https://2mojurmoyang.tistory.com/221
	https://beomy.github.io/tech/react/react-hook-form-api-reference
	https://beomy.github.io/tech/react/react-hook-form
(디테일 - 완성도) https://tech.osci.kr/react-hook-form-series-3
	https://tech.osci.kr/react-깊이-파고들기

https://tech.inflab.com/202207-rallit-form-refactoring/react-hook-form/
https://react-hook-form.com/get-started
https://react-hook-form.com/docs/useform
https://velog.io/@yesoryeseul/react-hook-formController-yup을-활용하여-유효성-검사하기

- 2025.06.04
https://velog.io/@s_sangs/React-Hook-Form-이용해서-MUI-컴포넌트-제어하기
https://vpvm96.tistory.com/79
https://ttaerrim.tistory.com/68

(Zod) https://jforj.tistory.com/380
https://jjang-j.tistory.com/category/💜 리액트?page=1
```

```
https://beomy.github.io/tech/react/react-hook-form

* React Hook Form(=RHF)
 : 기본적으로 Uncontrolled 방식(=비제어 컴포넌트)
 
* useForm -> ...register
 : Uncontrolled 방식의 직접적인 방식으로 간단한 규모의 form 에서만 사용
  => input, textarea, select 등 이미 존재하는 HTML 객체는 가능하지만 
	  컴포넌트(커스텀 객체)는 적용 안됨
	  해당 경우에는 직접 props 로 전달하거나
	  forwardRef 를 사용해 <input /> 의 ref 를 부모 컴포넌트로 전달
	  
* useFormState
 : 애초에 control 이 인자로 필요하고 useForm 에서 구조할당으로 작업할 수 있어
	 실무에서 사용 없음

* Controller
 : Controlled 방식의 일반적인 방식으로 RHF 의 기본 방식과는 다르지만
	 MUI 와 같은 많은 외부 UI 라이브러리 사용 시 함께 사용이 가능
  => name, control, render 3개의 props 는 필수
  
* SubmitHandler
 : any 를 제외하고 handleSubmit 을 통한 이벤트를 줄때 type 설정

* FormProvider
 : useForm 의 반환 값을 자식(하위) 컴포넌트에 전달 시 사용
  => input, textarea, select 등 이미 완성된 객체는 가능하지만 
	  컴포넌트(커스텀 객체)는 적용 안됨
	  
* useFormContext
 : FormProvider 하위에서만 사용 가능, useForm 객체를 호출

* useWatch
 : 반드시 getValues, setValue 전에 먼저 작성

* useController
 : Controller

* useFieldArray
 :
  => fields.map((field, index) => { ... } 진행 시
	  key 값에 index 금지(X), field.id 사용(O)
  => 추가 + 삭제 기능 시
	(지양)
	onClick={() => {
		  append({ test: 'test' });
		  remove(0);
	}}
	
	(지향)
	useEffect(() => {
		remove(0);
	}, [remove])

	onClick={() => {
		append({ test: 'test' });
	}}
  => name 은 반드시 unique 해야함(필요 시 as const 또는 as 'alias' 사용)

```
