export interface ChildProps {
	children: React.ReactNode
}
export type SearchParams = { [key: string]: string | string[] | undefined }

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}

export type Params = { booktId: string }

export interface ReturnActionType {
	user: IUser
	users: IUser[]
	failure: string
	status: number	
	error?: any
	phone: IPhone
	phones: IPhone[]
	sales: ISale[]
	sale: ISale
	capacities: ICapacity[]
	brends: IBrend[]
	colors: IColor[]
	conditions: ICondition[]

}
export interface IUser {
	email: string
	fullname: string
	password: string
	_id: string
	role: string
	phone: string
}



export interface ISale{
	_id: string
	phone: IPhone
	price: number
	benifit: number
	createdAt: Date
	updatedAt: Date
}

export interface ICapacity{
	name: string
	_id: string
}

export interface IBrend{
	name: string
	_id: string
}

export interface IColor{
	name: string
	_id: string
}

export interface ICondition{
	name: string
	_id: string
}

export interface IStatus{
	name: string
	_id: string
}
export interface IPhone{
	_id: string
	name: string
	capacity: ICapacity
	brend: IBrend
	color: IColor
	condition: ICondition
	status: string
	price: number
	new_price: number
	sud_price: number
	benifit: number
	date: Date
	createdAt: Date
	updatedAt: Date
}




export interface IClass{
	_id: string
	name: string
}

export interface ISubject{
	_id: string
	name: string
}
export interface IHomework{
	_id: string
	class: IClass
	subject: ISubject
	teacher: IUser
	toDate: Date
	status: string
	title: string
	isAnswered: boolean
}

export interface IHomeworkAnswer{
	_id: string
	homework: IHomework
	student: IUser
	file: string
	ball: string
	status: string
}
export interface IMaterial{
	_id: string
	title: string
	class: IClass
	teacher: IUser
	file: string
	createdAt: Date
}

export interface IClassTeacher{
	_id: string
	class: IClass
	teacher: IUser
	subject: ISubject
}