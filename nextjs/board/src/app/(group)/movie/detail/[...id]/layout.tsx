import { roboto, oswald } from '@/styles/fonts'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@/styles/global.scss'

export default function MovieDetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className={`${roboto.variable} ${oswald.variable}`}>[MovieDetail] 레이아웃 페이지</h1>
            {children}
        </div>
    );
}