export default function Board() {
  return (
    <div className="flex flex-1 flex-col gap-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      {/* Filter and Search Section */}
      <div className="mb-4">
        {/* Activity Type and Period Filters as a distinct card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4 mb-4">
          {/* Activity Type Filters */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">활동분야</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">시설봉사</span>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">재가봉사</span>
              <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">전문봉사</span>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">지역사회봉사</span>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">해외봉사</span>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">기타봉사</span>
            </div>
          </div>
          {/* Activity Period Filters */}
          <div>
            <h3 className="text-lg font-semibold mb-2">활동주기</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">정기</span>
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">비정기</span>
            </div>
          </div>
        </div>

        {/* Other Filters and Search as another distinct card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="activity-region" className="block text-sm font-medium text-gray-700">활동지역</label>
              <select id="activity-region" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>- 선택 -</option>
              </select>
            </div>
            <div>
              <label htmlFor="activity-type" className="block text-sm font-medium text-gray-700">활동유형</label>
              <select id="activity-type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>- 선택 -</option>
              </select>
            </div>
            <div>
              <label htmlFor="recruitment-status" className="block text-sm font-medium text-gray-700">모집현황</label>
              <select id="recruitment-status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>- 선택 -</option>
              </select>
            </div>
            <div className="flex items-center">
              <input id="youth-participation" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="youth-participation" className="ml-2 block text-sm text-gray-900">청소년도 참여 가능해요.</label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="volunteer-period-start" className="block text-sm font-medium text-gray-700">봉사기간</label>
              <input type="date" id="volunteer-period-start" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue="2026-02-10" />
            </div>
            <div>
              <label htmlFor="volunteer-period-end" className="block text-sm font-medium text-gray-700">~</label>
              <input type="date" id="volunteer-period-end" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue="2026-03-12" />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-grow">
              <label htmlFor="search-condition" className="block text-sm font-medium text-gray-700">검색조건</label>
              <select id="search-condition" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>봉사명</option>
              </select>
            </div>
            <div className="flex-grow">
              <label htmlFor="search-keyword" className="block text-sm font-medium text-gray-700">검색어 입력</label>
              <input type="text" id="search-keyword" placeholder="검색어 입력" className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" />
            </div>
            <button className="self-end px-4 py-2 bg-gray-200 text-gray-700 rounded-md">상세검색</button>
          </div>

          <div className="flex justify-center mt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              검색
            </button>
          </div>
        </div>
      </div>

      {/* Total Count Section */}
      <div className="mt-4">
        <p className="text-lg font-bold">총 3043 건</p>
      </div>

      {/* List Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Placeholder Card 1 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 mr-2">서울</span>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">대면</span>
          </div>
          <h4 className="text-md font-semibold mb-1">[강남노인] 배식봉사</h4>
          <p className="text-sm text-gray-600 mb-2">강남구립 강남노인종합복지관</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            봉사기간 2026-02-13 ~ 2026-02-13
          </p>
          <div className="flex justify-end mt-2">
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">0 / 5명 모집중</span>
          </div>
        </div>
        {/* Placeholder Card 2 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 mr-2">서울</span>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">대면</span>
          </div>
          <h4 className="text-md font-semibold mb-1">[강남노인] 배식봉사</h4>
          <p className="text-sm text-gray-600 mb-2">강남구립 강남노인종합복지관</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            봉사기간 2026-02-12 ~ 2026-02-12
          </p>
          <div className="flex justify-end mt-2">
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">0 / 5명 모집중</span>
          </div>
        </div>
        {/* Placeholder Card 3 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 mr-2">서울</span>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">대면</span>
          </div>
          <h4 className="text-md font-semibold mb-1">[강남노인] 배식봉사</h4>
          <p className="text-sm text-gray-600 mb-2">강남구립 강남노인종합복지관</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            봉사기간 2026-02-12 ~ 2026-02-12
          </p>
          <div className="flex justify-end mt-2">
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">0 / 5명 모집중</span>
          </div>
        </div>
        {/* Placeholder Card 4 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 mr-2">서울</span>
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">대면</span>
          </div>
          <h4 className="text-md font-semibold mb-1">[강남노인] 배식봉사</h4>
          <p className="text-sm text-gray-600 mb-2">강남구립 강남노인종합복지관</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            봉사기간 2026-02-12 ~ 2026-02-12
          </p>
          <div className="flex justify-end mt-2">
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">0 / 5명 모집중</span>
          </div>
        </div>
      </div>
    </div>
  );
}