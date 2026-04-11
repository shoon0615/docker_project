import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

{/* Placeholder Card 1 to 4 */}
export default function BoardCard() {
  return (
    <Card>
      <CardContent className="p-2">
        <div className="flex items-center mb-2">
          <Badge variant="secondary">서울</Badge>
          <Badge variant="secondary" className="ml-2">
            대면
          </Badge>
        </div>
        <h4 className="text-md font-semibold mb-1">[강남노인] 배식봉사</h4>
        <p className="text-sm text-gray-600 mb-2">
          강남구립 강남노인종합복지관
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          봉사기간 2026-02-13 ~ 2026-02-13
        </p>
        <div className="flex justify-end mt-2">
          <Badge variant="outline">0 / 5명 모집중</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
