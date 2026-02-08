import { User, Post, Comment } from '@/types/server'
import Button from './Button'
import { revalidatePath } from 'next/cache'

export default async function ServerPage() {
	const res = await fetchUsers()
	// const res = await fetchUsers('age=22')
	// const res =  await fetchUsers('_start=0&_limit=2&_sort=-age,name')
	
	// const data = await fetchUsersPage('_page=2&_per_page=2')
	// const data = await fetchComments()
	// const data = await fetchComments('_embed=post')
	const data = await fetchComments('_embed=post&_embed=user')
	console.log('data', data)

	return (
		<>
			<div className="mt-2 mb-8 w-full">
				<section>
					<h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">List</h2>
					{res.length === 0 ? (
						<p className="text-zinc-600 dark:text-zinc-400">No Data!</p>
					) : (
						<ul className="space-y-2">
							{res.map((t) => (
								<li
									key={t.id}
									className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:border-blue-500"
								>
									<h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">age: {t.age}</h3>
									{/* {t.age && <p className="text-zinc-700 dark:text-zinc-300 text-sm">{t.content}</p>} */}
									<p className="text-xs text-gray-500 dark:text-gray-400">age: {t.name}</p>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
			{/* Server Action 을 form action={} 로 쓰는 경우는 Next가 내부적으로 await */}
			<form action={funUu}>
				<input
      		className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent mx-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-50 min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      		name="name"
					placeholder='name' />
				<input
      		className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent mx-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-50 min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      		name="age"
					placeholder='age' />
				<button
					className="rounded bg-gray-800 px-2 py-1 text-sm text-white transition-colors hover:bg-gray-700"
					// onClick={funCu}	// server 에선 onClick 불가
					type="submit">
					Create
				</button>
			</form>
		</>
	)
}

/**
 * 데이터 가져오기
 * @param query 
 * 
 * @alias _lt 미만(<)
 * @alias _lte 이하(<=)
 * @alias _gt 초과(>)
 * @alias _gte 이상(>=)
 * @alias _ne 같지 않음(!=)
 * 
 * @alias _start 시작 인덱스(0부터)
 * @alias _end 종료 인덱스
 * @alias _limit 가져올 개수
 * @alias _sort 정렬할 필드(asc: default, desc: -)
 * 
 * @returns 
 */
async function fetchUsers(query = ''): Promise<User[]> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/?${query}`, {
		method: 'GET',
  })
  // const users = await res.json()
  return await res.json()
}

/**
 * 데이터 가져오기(페이징)
 * @param query 
 * 
 * @example
 * ```ts
 * type Data = {
 *   first: "첫 페이지 번호",
 *   prev: "이전 페이지 번호",
 *   next: "다음 페이지 번호",
 *   last: "마지막 페이지 번호",
 *   pages: "전체 페이지 수",
 *   items: "전체 아이템 수",
 *   data: "응답 데이터"
 * }
 * ```
 * @returns 
 */
async function fetchUsersPage(query = '') {
	const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/?${query}`, {
		method: 'GET',
  })
	// const text = await res.text()
  // console.log(text)
	// return JSON.parse(text)
	return await res.json()
}

/**
 * 데이터 가져오기
 * @param query 
 * 
 * @alias _embed 연관관계(fetch join)
 */ 
async function fetchComments(query = ''): Promise<Comment[]> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/comments/?${query}`)
  return await res.json()
}

/**
 * 데이터 추가하기
 * @param user Omit 유틸리티 타입은 특정 속성을 제외한 새로운 타입을 반환
 * @see id JSON Server를 통해 자동으로 생성되므로, id 필드를 제외
 * @returns 
 */
async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user)
  })
  const createdUser = await res.json()
  return createdUser
}
async function funCu(formData: FormData) {
	'use server'
  // const res = await createUser({
	// 	name: 'John',
	// 	age: 30
	// })
	const params: Omit<User, 'id'> = {
		name: formData.get('name') as string,
		age: parseInt(formData.get('age') as string),
  }
	const res = await createUser(params)
	console.log('create', res)
	revalidatePath('/jsonserver')
}

/**
 * 데이터 수정하기
 * @param user 
 * @see PUT 데이터 전체를 수정하도록 요청, 따라서 수정하지 않는 필드도 함께 전달
 * @returns 
 */
export async function mergeUser(user: User): Promise<User> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user)
  })
  const updatedUser = await res.json()
  return updatedUser
}
async function funMu(formData: FormData) {
	'use server'
	const formParams = Object.fromEntries(formData)
	// const params = formParams as User
	const params: User = {
		id: '4e6a',
		// id: formParams.id as string,
		name: formParams.name as string,
		age: Number(formParams.age)
	}
	console.log('params', params)
	const res = await mergeUser(params)
	console.log('merge', res)
	revalidatePath('/jsonserver')
}

/**
 * 데이터 수정하기
 * @param user 
 * @see PATCH 데이터 일부를 수정하도록 요청, 따라서 수정하지 않는 필드는 전달하지 않아도 됨
 * @returns 
 */
export async function updateUser(user: Partial<User> & Pick<User, 'id'>): Promise<User> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user)
  })
  const updatedUser = await res.json()
  return updatedUser
}
async function funUu(formData: FormData) {
	'use server'
	const formParams = Object.fromEntries(formData)
	// id 속성은 필수로 하고 나머지 속성은 모두 선택적으로 만든 타입
	const params: Partial<User> & Pick<User, 'id'> = {
		id: '4e6a',
		// name: formParams.name as string,
		age: Number(formParams.age)
	}
	console.log('params', params)
	const res = await updateUser(params)
	console.log('update', res)
	revalidatePath('/jsonserver')
}

/**
 * 데이터 삭제하기
 * @param userId 
 * @see DELETE 특정 데이터를 삭제, 요청 주소에 ID를 포함
 * @returns 
 */
export async function deleteUser(userId: string): Promise<User> {
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/${userId}`, {
    method: 'DELETE',
  })
  const deletedUser = await res.json()
  return deletedUser
}

/**
 * 데이터 삭제하기(일괄)
 * @param userIds
 * @see DELETE 여러 데이터를 삭제
 * @returns 
 */
export async function deleteUsers(userIds: string[] = []): Promise<User[]> {
	return Promise.all(userIds.map(async userId => {
    const res = await fetch(`${process.env.JSON_SERVER_API_URL}/users/${userId}`, {
      method: 'DELETE'
    })
    const deletedUser = await res.json()
    return deletedUser
  }))
}

/**
 * 데이터 삭제하기(참조)
 * @param userIds
 * @see DELETE 해당 데이터를 참조하는 다른 데이터가 있다면 함께 삭제
 * @description 게시글(POST) 삭제 시, 연관 댓글(Comments) 도 함께 삭제 가능(false 시 참조 ID 가 null 로 변경)
 * @returns 
 */
export async function deletePost(postId: string, isDeleteRefs = true): Promise<Post> {
	const query = isDeleteRefs ? '_dependent=comments' : ''
  const res = await fetch(`${process.env.JSON_SERVER_API_URL}/posts/${postId}?${query}`, {
    method: 'DELETE'
  })
  const deletedPost = await res.json()
  return deletedPost
}