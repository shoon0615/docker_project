<database url="{{https://www.notion.so/f2f0cb0ebef24133a20e3c2c633aa047}}" inline="false">
The title of this Database is: 테스트 정리
<ancestor-path></ancestor-path>
Here are the Database's Data Sources:
You can use the "view" tool on the URL of any Data Source to see its full schema configuration.
<data-sources>
<data-source url="{{collection://437f2936-87bb-4eea-896c-6dd934ddf5f2}}">
The title of this Data Source is: 테스트 정리

Here is the database's configurable state:
<data-source-state>
{"name":"테스트 정리","schema":{"'링크'":{"description":"","name":"'링크'","type":"url"},"'상태'":{"description":"","name":"'상태'","options":[{"color":"green","description":"","name":"완료","url":"collectionPropertyOption://437f2936-87bb-4eea-896c-6dd934ddf5f2/P3RTQg/MDBlOWFhMGYtNGVjZC00YWMxLTk5NTgtYTZmY2Y3MDg5ZjU0"}],"type":"select"},"'요약'":{"description":"","name":"'요약'","type":"text"},"'제목'":{"description":"","name":"'제목'","type":"title"},"'페이지 ID'":{"description":"","name":"'페이지 ID'","type":"text"}},"url":"collection://437f2936-87bb-4eea-896c-6dd934ddf5f2"}
</data-source-state>

Here is the SQLite table definition for this data source.
<sqlite-table>
CREATE TABLE IF NOT EXISTS "collection://437f2936-87bb-4eea-896c-6dd934ddf5f2" (
	url TEXT UNIQUE,
	createdTime TEXT, -- ISO-8601 datetime string, automatically set. This is the canonical time for when the page was created.
	"'상태'" TEXT, -- one of ["완료"]
	"'링크'" TEXT,
	"'요약'" TEXT,
	"'제목'" TEXT,
	"'페이지 ID'" TEXT
)
</sqlite-table>
</data-source>
</data-sources>
Here are the Database's Views:
You can use the "view" tool on the URL of any View to see its full configuration.
<views>
<view url="{{view://684dd93e-4ba5-4ace-9d56-960e49517090}}">
{"cardLayoutMode":"default","dataSourceUrl":"{{collection://437f2936-87bb-4eea-896c-6dd934ddf5f2}}","displayProperties":["'제목'"],"fullWidthProperties":[],"groupBy":{"hideEmptyGroups":false,"property":"'상태'","propertyType":"select","sort":{"type":"manual"}},"name":"Default view","type":"board"}
</view>
</views>
</database>