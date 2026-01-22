# 오류 해결 기록

이 문서는 Notion 클론 프로젝트 개발 중에 발생한 오류, 해결 시도 및 최종 해결책을 요약합니다.

---

## 1. 오류: `Can't resolve '@supabase/ssr'`

*   **설명**: `@supabase/ssr` 모듈 해결 오류로 인해 애플리케이션 시작에 실패했습니다.
*   **시도한 해결책**:
    1.  `package.json`을 확인하고 `@supabase/ssr`이 종속성으로 나열되어 있지 않음을 확인했습니다.
    2.  `@supabase/ssr` 설치를 제안하고 시도했습니다. (사용자가 초기 `npm install`을 취소했습니다).
    3.  `PLAN.md`를 업데이트하여 설치 목록에 `@supabase/ssr`을 명시적으로 포함했습니다.
    4.  `@supabase/ssr`을 성공적으로 설치했습니다.
*   **결과 및 해결책**: 누락된 `@supabase/ssr` 패키지를 설치한 후 오류가 해결되었습니다.

---

## 2. 오류: `Can't resolve 'next/font/google/target.css'`

*   **설명**: `Geist_Sans` 및 `Geist_Mono` 글꼴을 사용할 때 `next/font/google`과 관련된 CSS 파일을 해결할 수 없어 애플리케이션 시작에 실패했습니다.
*   **시도한 해결책**:
    1.  `Geist` 글꼴이 `next/font/google`의 빌드 시간 최적화 프로세스에 의해 공식적으로 지원되지 않음을 확인했습니다. (일부 `create-next-app`의 경우 기본값으로 제안되기도 함)
    2.  널리 지원되는 Google Font인 "Inter"로 전환할 것을 제안했습니다.
    3.  `notion-clone/src/app/layout.js`를 업데이트하여 "Inter" 글꼴을 가져와 사용했습니다. (사용자는 처음에 취소했지만 설명 후 승인했습니다).
*   **결과 및 해결책**: 지원되지 않는 `Geist` 글꼴을 호환되는 "Inter" 글꼴로 교체하여 오류가 해결되었습니다.

---

## 3. 오류: `cookieStore.get is not a function` in `src/lib/supabase/server.js`

*   **설명**: `server.js`의 `createClient` 함수 내에서 `cookieStore.get`이 함수가 아니라는 오류가 발생했습니다. 이로 인해 Supabase 서버 측 클라이언트가 쿠키에 올바르게 액세스하지 못했습니다.
*   **시도한 해결책**:
    1.  초기 진단은 `createClient`에 `cookieStore`를 인수로 잘못 전달하고 내부적으로 `cookies()`를 다시 호출하는 것으로 나타났습니다.
    2.  `server.js` 및 `page.js`, `Header.js`, `callback/route.js`의 `createClient`에 대한 모든 호출을 수정하여 `cookies()`가 `server.js`의 `createClient` 내에서 한 번만 호출되도록 했습니다.
    3.  `cookieStore` 객체를 검사하기 위해 `console.log`를 추가했으며, 처음에는 예상치 못한 "halted" 객체를 표시했고 나중에는 `get` 함수가 있는 `RequestCookies` 객체를 표시했습니다. 이는 이 특정 Next.js 16.1.4 환경에서 `next/headers`의 `cookies()`의 신뢰성 문제를 나타냅니다.
    4.  `cookies()`가 각 `get`, `set`, `remove` 메소드 내에서 호출되는 다른 `server.js` 구현을 제안했습니다 (사용자가 신뢰 부족으로 거부).
    5.  Next.js 16.1.4와의 잠재적 비호환성으로 인해 Next.js를 `14.2.3`으로, `eslint`를 `^8`로 다운그레이드할 것을 제안했습니다. 여기에는 `package.json` 수정 및 `npm install` 실행이 포함되었습니다.
    6.  `@supabase/ssr`의 `createMiddlewareClient`를 사용하여 `middleware.js` 파일을 구현하여 모든 요청에서 세션 쿠키가 일관되게 새로 고쳐지고 사용할 수 있도록 했습니다. 이는 Supabase와 함께 Next.js App Router에서 세션 관리를 위한 가장 강력한 권장 접근 방식입니다.
*   **결과 및 해결책**: Next.js를 안정적인 버전(`14.2.3`)으로 다운그레이드하고, 더 중요하게는 서버 구성 요소가 세션 쿠키에 안정적으로 액세스할 수 있도록 하는 강력한 세션 새로 고침 미들웨어(`middleware.js`)를 구현하여 오류가 해결되었습니다.

---

## 4. 문제: 로그인 상태 미반영 (로그인 후 메인 페이지에 "계속하려면 로그인하세요." 및 "로그인" 버튼 표시)

*   **설명**: 성공적인 로그인 후에도 메인 페이지(`/`) 및 헤더(`Header.js`) 구성 요소가 로그인한 사용자 상태를 올바르게 반영하지 않고 "계속하려면 로그인하세요." 및 "로그인" 버튼을 계속 표시했습니다.
*   **시도한 해결책**:
    1.  동적 렌더링을 강제하고 캐싱을 방지하기 위해 `page.js`에 `export const dynamic = 'force-dynamic'`을 추가했습니다.
    2.  더 직접적인 사용자 확인을 위해 `page.js` 및 `Header.js`에서 `supabase.auth.getSession()`을 `supabase.auth.getUser()`로 전환했습니다.
    3.  `exchangeCodeForSession` 직후 사용자 객체를 확인하기 위해 `/auth/callback/route.js` 내에 명시적인 로깅을 추가했습니다.
*   **결과 및 해결책**: Next.js 다운그레이드, 세션 관리를 위한 강력한 `middleware.js`, 그리고 리디렉션 전에 `callback/route.js`에서 `user`에 대한 명시적인 확인 조합으로 문제가 해결되었습니다. 미들웨어는 세션 쿠키가 올바르게 처리되고 서버 구성 요소에서 사용할 수 있도록 보장하여 `getUser()`가 인증된 사용자를 안정적으로 검색할 수 있도록 합니다.

---

## 5. 기능: 로그인 후 성공/실패 메시지 표시

*   **설명**: 사용자는 메인 페이지로 리디렉션하기 전에 로그인 시도(성공 또는 실패) 후 메시지를 표시하도록 요청했습니다.
*   **시도한 해결책**:
    1.  `status` 쿼리 매개변수(`?status=success` 또는 `?status=error`)와 함께 새로운 `/login-status` 페이지로 리디렉션하도록 `/auth/callback/route.js`를 수정했습니다.
    2.  `status` 매개변수를 읽고 적절한 메시지를 표시한 다음 짧은 지연 후 자동으로 홈페이지로 리디렉션하는 `notion-clone/src/app/login-status/page.js`에 새 클라이언트 구성 요소를 만들었습니다.
*   **결과 및 해결책**: 이 기능은 성공적으로 구현되어 로그인 프로세스 후 사용자에게 명확한 피드백을 제공합니다.

---
